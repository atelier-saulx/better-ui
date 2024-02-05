import { pascalCase } from 'pascal-case'
import fs from 'node:fs'
import path from 'node:path'
import { fetch, setGlobalDispatcher, Agent } from 'undici'

setGlobalDispatcher(new Agent({ connect: { timeout: 60_000 } }))

// usage: node pullIconsFromFigma.js <FIGMA_TOKEN>
;(async () => {
  const figmaToken = process.argv[2]

  const res = await fetch(
    'https://api.figma.com/v1/files/Mt9QoOjhJAmZIgAXstBzOT?ids=14:10432,25:27268',
    {
      headers: {
        'X-FIGMA-TOKEN': figmaToken,
      },
    },
  )

  const json = await res.json()

  const icons = {
    size20: [],
    size16: [],
  }

  console.log(json, '🏰')

  for (const frame of json.document.children.find((v) => v.name === 'Icons')
    .children) {
    const key = frame.id === '14:10432' ? 'size20' : 'size16'

    const ids = frame.children
      .reduce((acc, icon) => {
        return acc + ',' + icon.id
      }, '')
      .slice(1)

    const svgs = await fetch(
      `https://api.figma.com/v1/images/Mt9QoOjhJAmZIgAXstBzOT?ids=${ids}&format=svg`,
      {
        headers: {
          'X-FIGMA-TOKEN': figmaToken,
        },
      },
    ).then((r) => r.json())

    for (const icon of frame.children) {
      if (
        icon.children &&
        icon.children[0] &&
        icon.children[0].boundVariables
      ) {
        icons[key].push({
          name: icon.name,
          id: icon.id,
          src: svgs.images[icon.id],
          svg: '',
          boundVariables: icon.children[0].boundVariables,
          path: '',
          size: key === 'size16' ? 16 : 20,
        })
      } else {
        console.error('Illigal icon', icon.name)
      }
    }

    const readFileFromS3 = async (icon) => {
      icon.svg = await fetch(icon.src).then(async (t) => t.text())

      let componentName = pascalCase(icon.name.replace(/^\d{2}-/, ''))

      if (icon.size === 16) {
        componentName = 'Small' + componentName
      }

      const component = `export function Icon${componentName}({ style, size = ${icon.size} }: IconProps) {
        return (
          <svg
            width={size}
            height={size}
            style={style}
            viewBox="0 0 ${icon.size} ${icon.size}"
            fill="currentColor"
          >
            ${icon.svg
              .replace(/<svg[^>]*>([\s\S]*?)<\/svg>/, '$1')
              .replaceAll(/fill-rule="(.*?)"/g, 'fillRule="$1"')
              .replaceAll(/clip-rule="(.*?)"/g, 'clipRule="$1"')
              .replaceAll(/clip-path="(.*?)"/g, 'clipPath="$1"')
              .replaceAll(/fill=".+"/g, '')
              .replaceAll(/stroke=".+"/g, '')
              .trim()}
          </svg>
        )
};`

      Object.assign(icon, {
        path: icon.svg.match(/d="(.*?)"/)?.[1] ?? '',
        component,
        name: componentName,
      })
    }

    const q = []
    for (const key in icons) {
      for await (const icon of icons[key]) {
        console.log('fetching', icon.name)
        const data = await readFileFromS3(icon)
        q.push(data)
        console.log('fetched', icon.name)
      }
    }

    await Promise.all(q)

    let fileContent = `import * as React from "react";

export type IconProps = {
  style?: React.CSSProperties;
  size?: number;
};

`

    for (const key in icons) {
      for (const icon of icons[key]) {
        fileContent += icon.component + '\n'
      }
    }

    await fs.writeFileSync(
      path.join(
        new URL('.', import.meta.url).pathname,
        '..',
        'src',
        'components',
        'Icons',
        'index.tsx',
      ),
      fileContent,
    )
  }
})()
