import * as React from 'react'
import { Grid, GridItem } from './'
import type { Meta } from '@storybook/react'

const meta: Meta<typeof Grid> = {
  title: 'Components/(WIP) Grid',
  component: Grid,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const Default = () => {
  return (
    <div style={{ padding: 64 }}>
      <Grid>
        <GridItem
          title="Foldername"
          description="Description text that goes to multiple lines. Description text that goes to multiple lines. Description text that goes to multiple lines. Description text."
        />
        <GridItem
          title="Filename.pdf"
          description="Description text that goes to multiple lines."
        />
        <GridItem
          title="Foldername"
          description="Description text that goes to multiple lines."
        />
        <GridItem
          title="Filename.pdf"
          description="Description text that goes to multiple lines."
        />
        <GridItem title="Foldername" />
        <GridItem
          title="Filename.pdf"
          description="Description text that goes to multiple lines."
        />
        <GridItem title="Filename.pdf" />
      </Grid>
    </div>
  )
}

export const Row = () => {
  return (
    <div style={{ padding: 64 }}>
      <Grid variant="row">
        <GridItem
          title="Foldername"
          description="Description text that goes to multiple lines. Description text that goes to multiple lines. Description text that goes to multiple lines. Description text. Description text that goes to multiple lines. Description text that goes to multiple lines. Description text that goes to multiple lines. Description text."
        />
        <GridItem
          title="Filename.pdf"
          description="Description text that goes to multiple lines."
        />
        <GridItem
          title="Foldername"
          description="Description text that goes to multiple lines."
        />
        <GridItem
          title="Filename.pdf"
          description="Description text that goes to multiple lines."
        />
        <GridItem title="Foldername" />
        <GridItem
          title="Filename.pdf"
          description="Description text that goes to multiple lines."
        />
        <GridItem title="Filename.pdf" />
      </Grid>
    </div>
  )
}
