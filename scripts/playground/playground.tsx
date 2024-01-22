import { parsedStories } from './stories.js'
import React, { FC, useEffect, useState, ReactNode } from 'react'
import { render } from 'react-dom'
import {
  Text,
  Page,
  Layout,
  Sidebar,
  Button,
  Stack,
  Container,
  Code,
  formatCode,
  IconFullscreen,
  IconFullscreenExit,
} from '../../'

const genCode = (
  setCode: (str: string) => void,
  args: { [key: string]: any },
  component: FC,
  name: string,
) => {
  const componentName = component.name ?? name
  let str = `;<${componentName}`
  let children = ''
  for (const key in args) {
    const arg = args[key]
    if (key === 'children') {
      if (typeof arg === 'object' && typeof arg !== 'function') {
        if (Array.isArray(arg)) {
          children = `{[...children]}`
        } else if (arg.props) {
          children = `<Icon />`
        } else {
          children = JSON.stringify(arg)
        }
      } else {
        children = String(args[key])
      }
    } else {
      if (typeof arg === 'string') {
        str += ` ${key}="${String(args[key])}"`
      } else if (typeof arg === 'object' && typeof arg !== 'function') {
        if (arg._store && arg.props) {
          str += ` ${key}={icon}`
        } else {
          if (Array.isArray(arg) && arg.length > 10) {
            str += ` ${key}={${JSON.stringify(arg.slice(0, 10)).slice(0, -1)},...more]}`
          } else {
            str += ` ${key}={${JSON.stringify(arg)}}`
          }
        }
      } else {
        str += ` ${key}={${String(args[key])}}`
      }
    }
  }
  if (children) {
    str += `>${children}</${componentName}>`
  } else {
    str += '/>'
  }
  formatCode(str, true, 'typescript', (err) => {
    // setCode(err)
  }).then((v) => {
    setCode(v.slice(0))
  })
}

const Example = (p: {
  componentName: string
  file: string
  title: string
  story: any
  fullscreen?: string
  component?: FC
  decorators: ((s: (p: any) => ReactNode) => ReactNode)[]
}) => {
  let body: any

  const [code, setCode] = useState('')

  useEffect(() => {
    setCode('')
  }, [p.componentName, p.title])

  if (p.story.args) {
    if (!p.component) {
      return <Text>Cannot find component</Text>
    }

    if (p.decorators) {
      for (const d of p.decorators) {
        body = d((sProps) =>
          // @ts-ignore
          React.createElement(p.component, { ...p.story.args, ...sProps }),
        )
      }
    } else {
      body = React.createElement(p.component, p.story.args)
    }

    if (!code) {
      genCode(setCode, p.story.args, p.component, p.componentName)
    }
  } else {
    const re = new RegExp(`${p.title} =.+\\((.{0,100}\\{([^@]*?)\\)\\n\\})`)
    const x = p.file.match(re)
    if (!code && x && x[1]) {
      setCode(`(${x[1]}`)
    }
    if (p.decorators) {
      for (const d of p.decorators) {
        body = d((sProps) => React.createElement(p.story, sProps))
      }
    } else {
      body = React.createElement(p.story)
    }
  }

  return (
    <Stack direction="column" gap={12}>
      <Stack justify="start" gap={12}>
        <Button
          onClick={() => {
            const { storyId } = parseHref()
            goto({ storyId, fullscreen: p.title })
          }}
          variant="icon-only"
        >
          <IconFullscreen />
        </Button>
        <Text variant="body-bold">{p.title}</Text>
      </Stack>
      <Stack direction="column" align="center">
        <Container
          style={{
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <Stack style={{ padding: 24 }} direction="column" align="center">
            {body}
          </Stack>
        </Container>
        <Code
          style={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
          color="inverted"
          value={code}
        />
      </Stack>
    </Stack>
  )
}

const Story = (p: { story: any; fullscreen?: string }) => {
  const story = p.story.story
  const title = story.default.title.split('/')[1]
  const description = story.default.description ?? ''
  const keys = Object.keys(story).filter(
    (v) => v !== 'default' && v !== 'Default',
  )
  const defExample = story.Default
  return (
    <Page>
      <Stack direction="column" align="center">
        <Stack
          direction="column"
          gap={64}
          fitContent
          style={{
            marginBottom: 200,
            marginTop: 100,
            minWidth: 700,
          }}
        >
          <div style={{ marginBottom: -32 }}>
            <Text variant="title-page">{title}</Text>
            <Text variant="body-light" color="secondary">
              {description}
            </Text>
            <Button
              onClick={() => {
                window.open(`vscode://file${p.story.path}`)
              }}
              variant="neutral-link"
            >
              <Text variant="body-light">{p.story.path.split('/src/')[1]}</Text>
            </Button>
          </div>

          {defExample ? (
            <Example
              file={p.story.file}
              componentName={title}
              decorators={story.default.decorators}
              component={story.default.component}
              title="Default"
              fullscreen={p.fullscreen}
              story={defExample}
            />
          ) : null}
          {keys.map((v) => {
            return (
              <Example
                key={v}
                file={p.story.file}
                componentName={title}
                decorators={story.default.decorators}
                component={story.default.component}
                title={v}
                fullscreen={p.fullscreen}
                story={story[v]}
              />
            )
          })}
        </Stack>
      </Stack>
    </Page>
  )
}

type Location = { storyId?: string; fullscreen?: string }

const goto = (location: Location) => {
  const hash = location.fullscreen
    ? `${location.storyId}-${location.fullscreen}`
    : location.storyId

  const loc = window.location.href.split('#')[0] + '#' + hash

  window.location.href = loc
}

const parseHref = (): Location => {
  const x = window.location.href.split('#')[1] ?? ''
  const [storyId, fullscreen] = x.split('-')
  return { storyId, fullscreen }
}

const App = () => {
  const menuData = {}
  const [{ storyId, fullscreen }, setLocation] = useState<Location>(parseHref())

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setLocation(parseHref())
    })
  }, [])
  for (const story of parsedStories) {
    if (!story.story.default['title']) {
      continue
    }
    const [section, component] = story.story.default.title.split('/')
    if (!menuData[section]) {
      menuData[section] = []
    }
    menuData[section].push({
      value: story.story.default.title,
      label: component,
    })
    menuData[section].sort((a, b) => {
      return a.label > b.label ? 1 : -1
    })
  }
  const story = parsedStories.find((s) => s.story.default.title === storyId)
  return (
    <Layout>
      {fullscreen ? null : (
        <Sidebar
          data={menuData}
          value={storyId}
          onValueChange={(value) => {
            goto({ storyId: value })
          }}
          collapsable={false}
        />
      )}
      {story ? (
        <Story story={story} fullscreen={fullscreen} />
      ) : (
        <Page>
          <Text>BASED</Text>
        </Page>
      )}
    </Layout>
  )
}

render(<App />, document.body)
