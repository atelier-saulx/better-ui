import { dirname, join, relative } from 'path'
import { fileURLToPath } from 'url'
import { writeFileSync, readFileSync } from 'fs'
import { hash } from '@saulx/hash'
import klaw from 'klaw'
import fs from 'fs-extra'
import { build } from 'esbuild'

const isProduction = process.argv.at(-1) === '-p'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC_DIR = join(__dirname, '../../src')
const TOP_DIR = join(__dirname, '../..')

const getStories = () => {
  let items: string[] = []
  klaw(SRC_DIR)
    .on('data', (item) => items.push(item.path))
    .on('end', async () => {
      const files = items.filter((f) => /\.stories\.[a-z]{1,4}$/.test(f))
      const m: any[] = []
      const fileIds: string[] = []
      const filesParsed = await Promise.all(
        files.map(async (f) => {
          const id = 'f' + hash(f)
          m.push({ path: f, id, file: (await fs.readFile(f)).toString() })
          fileIds.push(id)
          return `import * as ${id} from "../../${relative(TOP_DIR, f.replace(/\.tsx$/, '.js'))}"`
        }),
      )
      let file = filesParsed.join('\n')
      file += `\nexport const stories = [${fileIds.join(',')}]`
      file += `\nexport const parsedStories = [${m
        .map((v) => {
          return `{ id: "${v.id}", story: ${v.id}, path: "${v.path}", file: \`${v.file.replace(/\$\{/g, '\\$').replace(/`/g, '\\`')}\`}`
        })
        .join(',')}]`
      writeFileSync(join(__dirname, 'stories.ts'), file)

      if (isProduction) {
        const result = await build({
          bundle: true,
          entryPoints: [join(__dirname, '/playground.tsx')],
          platform: 'browser',
          minify: true,
          outdir: join(TOP_DIR, './playground'),
        })

        const js = readFileSync(join(TOP_DIR, './playground/playground.js'))
        const css = readFileSync(join(TOP_DIR, './playground/playground.css'))

        writeFileSync(
          join(TOP_DIR, './playground/index.html'),
          `<html>
        <head>
          <script>window.global = window;</script>
          <style>${css}</style>
          <script type="module">${js}</script>
        </head>
        <body />
      </html>
      `,
        )

        console.log(result)
      }
    })
}

getStories()
