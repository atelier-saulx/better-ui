import { stories } from './stories.js'
import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import { Text, Page, Layout, Sidebar } from '../../'
import { serializeQuery } from '@saulx/utils'

const App = () => {
  const menuData = {}

  const [location, setLocation] = useState<string>(
    window.location.href.split('#')[1] ?? '',
  )

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setLocation(window.location.href.split('#')[1])
    })
  }, [])

  for (const story of stories) {
    if (!story.default['title']) {
      continue
    }

    const [section, component] = story.default.title.split('/')

    if (!menuData[section]) {
      menuData[section] = []
    }

    menuData[section].push({
      value: story.default.title,
      label: component,
    })
  }

  console.info(menuData, location)

  return (
    <Layout>
      <Sidebar
        data={menuData}
        value={location}
        onValueChange={(value) => {
          window.location.href =
            window.location.href.split('#')[0] + '#' + value
        }}
        collapsable={false}
      />
      <Page>STORIES</Page>
    </Layout>
  )
}

render(<App />, document.body)
