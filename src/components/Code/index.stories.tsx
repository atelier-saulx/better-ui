import { Code } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Code> = {
  title: 'Atoms/Code',
  component: Code,
}

export default meta

const json = JSON.stringify({ hello: 'bla', x: 1, y: 2, z: 4 }, null, 2)

const ts = `import * as React from 'react'

export function Svg({ style, width = 20, height = 20 }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      style={style}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="a b c"
      />
    </svg>
  )
}
`

export const Default: StoryObj<typeof Code> = {
  args: {
    value: ts,
    language: 'typescript',
    color: 'inverted',
  },
  argTypes: {
    color: { control: 'select' },
  },
}

export const CopyButton: StoryObj<typeof Code> = {
  args: {
    value: json,
    language: 'json',
    copy: true,
    color: 'muted',
    onChange: () => {},
  },
  argTypes: {
    color: { control: 'select' },
    language: { control: 'select' },
  },
}

export const Small: StoryObj<typeof Code> = {
  args: {
    value: ts,
    language: 'typescript',
    variant: 'small',
  },
  argTypes: {
    color: { control: 'select' },
  },
}
