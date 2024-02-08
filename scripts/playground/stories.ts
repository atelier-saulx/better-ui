import * as f2709786937207 from "../../src/components/Badge/index.stories.js"
import * as f12456265071631 from "../../src/components/BarGraph/index.stories.js"
import * as f1403935485412 from "../../src/components/Button/index.stories.js"
import * as f12539861850560 from "../../src/components/Calendar/index.stories.js"
import * as f13557855690583 from "../../src/components/CheckboxInput/index.stories.js"
import * as f14261403483167 from "../../src/components/Code/index.stories.js"
import * as f5470738912473 from "../../src/components/ColorInput/index.stories.js"
import * as f6155456052992 from "../../src/components/Confirm/index.stories.js"
import * as f2676674344469 from "../../src/components/Container/index.stories.js"
import * as f15918582868135 from "../../src/components/CurrentDay/index.stories.js"
import * as f5347209449136 from "../../src/components/DateInput/index.stories.js"
import * as f12984134904489 from "../../src/components/Dropdown/index.stories.js"
import * as f12162171475362 from "../../src/components/FileInput/index.stories.js"
import * as f11927335739210 from "../../src/components/Grid/index.stories.js"
import * as f10261065846765 from "../../src/components/Header/index.stories.js"
import * as f6035430303946 from "../../src/components/Icons/index.stories.js"
import * as f10173362420623 from "../../src/components/KeyboardShortcut/index.stories.js"
import * as f1153425962678 from "../../src/components/LanguageInput/index.stories.js"
import * as f4437124256520 from "../../src/components/Layout/index.stories.js"
import * as f1126609356048 from "../../src/components/LineGraph/index.stories.js"
import * as f16765197606902 from "../../src/components/Media/index.stories.js"
import * as f936609549945 from "../../src/components/Modal/index.stories.js"
import * as f5634334384066 from "../../src/components/Note/index.stories.js"
import * as f5909785848135 from "../../src/components/NumberInput/index.stories.js"
import * as f16472063764097 from "../../src/components/Page/index.stories.js"
import * as f9460110149634 from "../../src/components/PieGraph/index.stories.js"
import * as f12047187696222 from "../../src/components/RichTextEditor/index.stories.js"
import * as f6285988781667 from "../../src/components/Schema/index.stories.js"
import * as f16126198374920 from "../../src/components/ScrollArea/index.stories.js"
import * as f15513603856812 from "../../src/components/SelectInput/index.stories.js"
import * as f4412292282470 from "../../src/components/SetInput/index.stories.js"
import * as f10196973367128 from "../../src/components/Sidebar/index.stories.js"
import * as f13597506036687 from "../../src/components/Spinner/index.stories.js"
import * as f17293536255708 from "../../src/components/Stack/index.stories.js"
import * as f17512554344332 from "../../src/components/Table/index.stories.js"
import * as f16386070420783 from "../../src/components/Text/index.stories.js"
import * as f7144734297614 from "../../src/components/TextAreaInput/index.stories.js"
import * as f5979046522585 from "../../src/components/TextInput/index.stories.js"
import * as f2542458627838 from "../../src/components/Thumbnail/index.stories.js"
import * as f10219561566831 from "../../src/components/Toast/index.stories.js"
import * as f12164388818727 from "../../src/components/Tooltip/index.stories.js"
import * as f14744076215203 from "../../src/components/Video/index.stories.js"
import * as f8139019256634 from "../../src/components/Form/stories/arrays.stories.js"
import * as f11284618058075 from "../../src/components/Form/stories/default.stories.js"
import * as f12399833393765 from "../../src/components/Form/stories/object.stories.js"
import * as f9013842098998 from "../../src/components/Form/stories/readonly.stories.js"
import * as f8217294240285 from "../../src/components/Form/stories/record.stories.js"
import * as f12909404527880 from "../../src/components/Form/stories/references.stories.js"
import * as f11010240342713 from "../../src/components/Form/stories/referencesSchema.stories.js"
import * as f7234131307474 from "../../src/components/Form/stories/set.stories.js"
export const stories = [f2709786937207,f12456265071631,f14261403483167,f13557855690583,f1403935485412,f12539861850560,f6155456052992,f2676674344469,f5347209449136,f15918582868135,f12162171475362,f12984134904489,f10261065846765,f11927335739210,f10173362420623,f6035430303946,f1153425962678,f5470738912473,f936609549945,f5634334384066,f4437124256520,f9460110149634,f5909785848135,f6285988781667,f16765197606902,f16472063764097,f12047187696222,f1126609356048,f4412292282470,f16126198374920,f17293536255708,f13597506036687,f10196973367128,f15513603856812,f2542458627838,f5979046522585,f7144734297614,f17512554344332,f16386070420783,f8139019256634,f12164388818727,f14744076215203,f11284618058075,f12399833393765,f10219561566831,f9013842098998,f12909404527880,f8217294240285,f11010240342713,f7234131307474]
export const parsedStories = [{ id: "f2709786937207", story: f2709786937207, path: "/Users/jimdebeer/saulx/better-ui/src/components/Badge/index.stories.tsx", file: `import * as React from 'react'
import { Badge, IconSmallBolt } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Badge> & { description: string } = {
  title: 'Atoms/Badge',
  description: 'Hello bla',
  component: Badge,
}

export default meta

export const Default: StoryObj<typeof Badge> = {
  args: {
    children: "I'm a badge",
    size: 'regular',
    color: 'auto-muted',
  },
  argTypes: {
    color: { control: 'select' },
  },
}

export const PrefixAndSuffix: StoryObj<typeof Badge> = {
  args: {
    children: "I'm a badge",
    size: 'regular',
    color: 'auto',
    prefix: <IconSmallBolt />,
    suffix: <IconSmallBolt />,
  },
  argTypes: {
    color: { control: 'select' },
  },
}

export const Copyable: StoryObj<typeof Badge> = {
  args: {
    children: "I'm a copyable badge",
    size: 'regular',
    color: 'informative',
    prefix: <IconSmallBolt />,
    copyValue: 'this got copied from a badge',
  },
  argTypes: {
    color: { control: 'select' },
  },
}
`},{ id: "f12456265071631", story: f12456265071631, path: "/Users/jimdebeer/saulx/better-ui/src/components/BarGraph/index.stories.tsx", file: `import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BarGraph } from '../../index.js'
import { color } from '../../index.js'

const meta: Meta<typeof BarGraph> = {
  title: 'Atoms/BarGraph',
  component: BarGraph,
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            background: color('background', 'muted'),
            height: '300px',
            width: '100%',
          }}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default meta

export const Horizontal: StoryObj<typeof BarGraph> = {
  args: {
    legend: true,
    muted: true,
    variant: 'horizontal',
    data: [
      {
        label: 'Apples',
        value: 4,
      },
      {
        label: 'Sugar',
        value: 3,
      },
      {
        label: 'foo',
        value: 2,
      },
      {
        label: 'Cinnamon',
        value: 1,
      },
    ],
  },
}

export const Vertical: StoryObj<typeof BarGraph> = {
  args: {
    legend: true,
    variant: 'vertical',
    data: [
      {
        label: 'Apples',
        value: 4,
      },
      {
        label: 'Sugar',
        value: 3,
      },
      {
        label: 'foo',
        value: 2,
      },
      {
        label: 'Cinnamon',
        value: 1,
      },
    ],
  },
}

export const StackedVertical: StoryObj<typeof BarGraph> = {
  args: {
    legend: true,

    variant: 'vertical',
    data: [
      {
        label: 'Apples',
        value: [
          { label: 'red', value: 1 },
          { label: 'yellow', value: 2 },
          { label: 'blue', value: 4 },
        ],
      },
      {
        label: 'Sugar',
        value: 3,
      },
      {
        label: 'Flour',
        value: 2,
      },
      {
        label: 'Cinnamon',
        value: 1,
      },
    ],
  },
}

export const StackedHorizontal: StoryObj<typeof BarGraph> = {
  args: {
    legend: true,

    variant: 'horizontal',
    data: [
      {
        label: 'Apples',
        value: [
          { label: 'red', value: 1 },
          { label: 'yellow', value: 2 },
          { label: 'blue', value: 4 },
        ],
      },
      {
        label: 'Sugar',
        value: 4,
      },
      {
        label: 'Flour',
        value: 2,
      },
      {
        label: 'Cinnamon',
        value: 1,
      },
    ],
  },
}
`},{ id: "f14261403483167", story: f14261403483167, path: "/Users/jimdebeer/saulx/better-ui/src/components/Code/index.stories.tsx", file: `import { Code } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Code> = {
  title: 'Atoms/Code',
  component: Code,
}

export default meta

const json = JSON.stringify({ hello: 'bla', x: 1, y: 2, z: 4 }, null, 2)

const ts = \`import * as React from 'react'

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
\`

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

export const Prettier: StoryObj<typeof Code> = {
  args: {
    value: ts,
    language: 'typescript',
    color: 'inverted',
    prettier: true
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
`},{ id: "f13557855690583", story: f13557855690583, path: "/Users/jimdebeer/saulx/better-ui/src/components/CheckboxInput/index.stories.tsx", file: `import { CheckboxInput } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CheckboxInput> = {
  title: 'Inputs/CheckboxInput',
  component: CheckboxInput,
}

export default meta

export const Checkbox: StoryObj<typeof CheckboxInput> = {
  args: {
    label: 'Label',
    description: 'This is the description',
    disabled: false,
  },
}

export const Toggle: StoryObj<typeof CheckboxInput> = {
  args: {
    label: 'Label',
    // description: 'This is the description',
    defaultValue: true,
    variant: 'toggle',
    disabled: false,
  },
}
`},{ id: "f1403935485412", story: f1403935485412, path: "/Users/jimdebeer/saulx/better-ui/src/components/Button/index.stories.tsx", file: `import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { IconCopy, IconMoreVertical, Button } from '../../index.js'

/** Use buttons for clickable things */
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
}

export default meta

export const Default: StoryObj<typeof Button> = {
  args: {
    children: 'Click me',
    variant: 'error-muted',
  },
}

export const Icon: StoryObj<typeof Button> = {
  args: {
    children: <IconMoreVertical />,
    variant: 'primary',
    shape: 'square',
  },
}

export const KeyboardShortcut: StoryObj<typeof Button> = {
  args: {
    children: 'Save',
    variant: 'primary',
    keyboardShortcut: 'Cmd+O',
    displayKeyboardShortcut: true,
    onClick: () => {
      alert('onclick triggered')
    },
  },
}

export const IconOnly: StoryObj<typeof Button> = {
  args: {
    children: <IconCopy />,
    variant: 'icon-only',
  },
}

export const Link: StoryObj<typeof Button> = {
  args: {
    children: 'This is a link',
    variant: 'neutral-link',
    shape: 'square',
    onClick: () => {
      alert('hello')
    },
  },
}

export const PrefixAndSuffix: StoryObj<typeof Button> = {
  args: {
    children: 'Click me',
    variant: 'primary',
    prefix: <IconCopy />,
    suffix: <IconCopy />,
    onClick: () => {
      alert('hello')
    },
  },
}

export const AsyncOnClick: StoryObj<typeof Button> = {
  args: {
    children: 'Click',
    variant: 'primary',
    prefix: <IconCopy />,
    onClick: async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 800)
      })
      throw new Error('something went bad')
    },
  },
}

export const ButtonSmall: StoryObj<typeof Button> = {
  args: {
    children: 'Click',
    variant: 'primary',
    size: 'small',
    prefix: <IconCopy />,
    onClick: async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 800)
      })
      throw new Error('something went bad')
    },
  },
}
`},{ id: "f12539861850560", story: f12539861850560, path: "/Users/jimdebeer/saulx/better-ui/src/components/Calendar/index.stories.tsx", file: `import { Calendar } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Calendar> = {
  title: 'Atoms/Calendar',
  component: Calendar,
}

export default meta

export const Default: StoryObj<typeof Calendar> = {
  args: {},
}
`},{ id: "f6155456052992", story: f6155456052992, path: "/Users/jimdebeer/saulx/better-ui/src/components/Confirm/index.stories.tsx", file: `import { Confirm } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Confirm> = {
  title: 'Atoms/Confirm',
  component: Confirm,
}

export default meta

export const Default: StoryObj<typeof Confirm> = {
  args: {},
}

export const Icons: StoryObj<typeof Confirm> = {
  args: {
    variant: 'small',
  },
}
`},{ id: "f2676674344469", story: f2676674344469, path: "/Users/jimdebeer/saulx/better-ui/src/components/Container/index.stories.tsx", file: `import * as React from 'react'
import {
  Container,
  Thumbnail,
  Button,
  Dropdown,
  IconMoreHorizontal,
} from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Container> = {
  title: 'Components/Container',
  component: Container,
}

export default meta

// <SelectMenu items={['x','y','z', { value: 'root', label: 'bla'}]} onChange={(value: string) => {}} />

export const ListItem: StoryObj<typeof Container> = {
  args: {
    title: 'This is a title',
    description: 'This is a description',
    prefix: <Thumbnail text="AB" />,
    suffix: (
      <Dropdown.Root>
        <Dropdown.Trigger>
          <Button variant="neutral-transparent" shape="square">
            <IconMoreHorizontal />
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Items>
          <Dropdown.Item
            onClick={() => {
              alert('item 1 clicked')
            }}
          >
            Item 1
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              alert('item 1 clicked')
            }}
          >
            Item 2
          </Dropdown.Item>
        </Dropdown.Items>
      </Dropdown.Root>
    ),
  },
}

export const ListItemWithOnClick: StoryObj<typeof Container> = {
  args: {
    title: 'This is a title',
    description: 'This is a description',
    onClick: () => {
      alert('clicked')
    },
    prefix: <Thumbnail text="AB" />,
    suffix: (
      <Dropdown.Root>
        <Dropdown.Trigger>
          <Button variant="neutral-transparent" shape="square">
            <IconMoreHorizontal />
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Items>
          <Dropdown.Item
            onClick={() => {
              alert('item 1 clicked')
            }}
          >
            Item 1
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              alert('item 1 clicked')
            }}
          >
            Item 2
          </Dropdown.Item>
        </Dropdown.Items>
      </Dropdown.Root>
    ),
  },
}

export const ListItemWithChildren: StoryObj<typeof Container> = {
  args: {
    title: 'This is a title',
    description: 'This is a description',
    expandable: true,
    expanded: true,
    prefix: <Thumbnail text="AB" />,
    suffix: (
      <Dropdown.Root>
        <Dropdown.Trigger>
          <Button variant="neutral-transparent" shape="square">
            <IconMoreHorizontal />
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Items>
          <Dropdown.Item
            onClick={() => {
              alert('item 1 clicked')
            }}
          >
            Item 1
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              alert('item 1 clicked')
            }}
          >
            Item 2
          </Dropdown.Item>
        </Dropdown.Items>
      </Dropdown.Root>
    ),
    children: <Button>This is a button</Button>,
  },
}

export const ListItemSimple: StoryObj<typeof Container> = {
  args: {
    title: 'This is a title',
  },
}

export const Expandable: StoryObj<typeof Container> = {
  args: {
    title: 'This is a title',
    description: 'This is a description',
    expandable: true,
    expanded: true,
    prefix: <Thumbnail text="AB" />,
    suffix: (
      <Dropdown.Root>
        <Dropdown.Trigger>
          <Button variant="neutral-transparent" shape="square">
            <IconMoreHorizontal />
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Items>
          <Dropdown.Item
            onClick={() => {
              alert('item 1 clicked')
            }}
          >
            Item 1
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              alert('item 1 clicked')
            }}
          >
            Item 2
          </Dropdown.Item>
        </Dropdown.Items>
      </Dropdown.Root>
    ),
    children: <Button>This is a button</Button>,
  },
}
`},{ id: "f5347209449136", story: f5347209449136, path: "/Users/jimdebeer/saulx/better-ui/src/components/DateInput/index.stories.tsx", file: `import * as React from 'react'
import { DateInput } from '../../index.js'

const meta = {
  title: 'Inputs/DateInput',
}
export default meta

export const SingleDate = () => {
  return (
    <DateInput
      label="Single date"
      description="Select a date"
      onChange={(value) => {
        console.log(value)
      }}
    />
  )
}

export const SingleDateAndTime = () => {
  return (
    <DateInput
      time
      label="Single date and time"
      onChange={(value) => {
        console.log(value)
      }}
      defaultValue={new Date('1999/11/03 08:00').getTime()}
    />
  )
}

export const DateRange = () => {
  return (
    <DateInput
      range
      label="Range"
      onChange={(value) => {
        console.log(value)
      }}
    />
  )
}

export const DateRangeAndTime = () => {
  return (
    <DateInput
      range
      time
      label="Range and time"
      onChange={(value) => {
        console.log(value)
      }}
    />
  )
}

export const Error = () => {
  return (
    <DateInput
      error
      onChange={(value) => {
        console.log(value)
      }}
    />
  )
}

export const Small = () => {
  return (
    <DateInput
      variant="small"
      onChange={(value) => {
        console.log(value)
      }}
    />
  )
}
`},{ id: "f15918582868135", story: f15918582868135, path: "/Users/jimdebeer/saulx/better-ui/src/components/CurrentDay/index.stories.tsx", file: `import { CurrentDay } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CurrentDay> = {
  title: 'Atoms/CurrentDay',
  component: CurrentDay,
}

export default meta

export const Default: StoryObj<typeof CurrentDay> = {
  args: { value: new Date().getTime() },
}
`},{ id: "f12162171475362", story: f12162171475362, path: "/Users/jimdebeer/saulx/better-ui/src/components/FileInput/index.stories.tsx", file: `import * as React from 'react'
import { useUploadFile, FileInput } from '../../index.js'
import { Provider } from '@based/react'
import based from '@based/client'

const client = based({
  org: 'saulx',
  project: 'based-ui',
  env: 'production',
})

const meta = {
  title: 'Inputs/FileInput',
}
export default meta

export const Default = () => {
  return (
    <FileInput
      onChange={(file) => {
        console.log('file', file)
      }}
      label="upload some file"
      description="drop a file in here"
      // disabled
    />
  )
}

export const Small = () => {
  return (
    <FileInput
      variant="small"
      onChange={(file) => {
        console.log('file', file)
      }}
    />
  )
}

export const Error = () => {
  return <FileInput status="error" />
}

const RealUploadContent = () => {
  const { handleFileInputChange, status, progress } = useUploadFile()

  return (
    <FileInput
      label="Avatar"
      status={status}
      progress={progress}
      onChange={handleFileInputChange((file) => {
        console.log('uploaded file', file)
      })}
    />
  )
}

export const RealUpload = () => {
  return (
    <Provider client={client}>
      <RealUploadContent />
    </Provider>
  )
}
`},{ id: "f12984134904489", story: f12984134904489, path: "/Users/jimdebeer/saulx/better-ui/src/components/Dropdown/index.stories.tsx", file: `import * as React from 'react'
import {
  Button,
  DropdownHookProvider,
  IconDelete,
  IconMoreVertical,
  Dropdown,
  useDropdown,
} from '../../index.js'

const meta = {
  title: 'Atoms/Dropdown',
  decorators: [
    (Story) => (
      <DropdownHookProvider>
        <Story />
      </DropdownHookProvider>
    ),
  ],
}
export default meta

export const Default = () => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button shape="square" variant="neutral">
          <IconMoreVertical />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Items>
        {Array.from({ length: 200 }).map((_, i) => (
          <Dropdown.Item
            key={i}
            onClick={() => {
              alert(\`delete \$i}\`)
            }}
            icon={<IconDelete />}
          >
            Delete {i}
          </Dropdown.Item>
        ))}
      </Dropdown.Items>
    </Dropdown.Root>
  )
}

function SimpleDropdown({ close, numberOfItems }) {
  return (
    <Dropdown.Items>
      {Array.from({ length: numberOfItems }).map((_, i) => (
        <Dropdown.Item
          key={i}
          onClick={() => {
            close(\`delete \$i}\`)
          }}
        >
          Delete {i}
        </Dropdown.Item>
      ))}
    </Dropdown.Items>
  )
}

export const Hook = () => {
  const { open } = useDropdown()

  return (
    <Button
      shape="square"
      variant="neutral"
      onClick={async () => {
        const value = await open(SimpleDropdown, { numberOfItems: 5 })
        console.log('dropdown return value:', value)
      }}
    >
      <IconMoreVertical />
    </Button>
  )
}
`},{ id: "f10261065846765", story: f10261065846765, path: "/Users/jimdebeer/saulx/better-ui/src/components/Header/index.stories.tsx", file: `import * as React from 'react'
import {
  Header,
  Dropdown,
  Button,
  IconSettings,
  Thumbnail,
  IconLogOut,
  Stack,
} from '../../index.js'
import type { Meta } from '@storybook/react'
import { BasedLogoWithText } from '../Icons/extras.js'

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const Default = () => {
  return (
    <div style={{ width: 1000 }}>
      <Header
        logo={<BasedLogoWithText />}
        navigation={
          <Stack gap={24}>
            <Button variant="neutral">Documentation</Button>
            <Dropdown.Root>
              <Dropdown.Trigger>
                <div style={{ cursor: 'pointer' }}>
                  <Thumbnail text="MD" shape="circle" />
                </div>
              </Dropdown.Trigger>
              <Dropdown.Items>
                <Dropdown.Item icon={<IconSettings />}>Settings</Dropdown.Item>
                <Dropdown.Item icon={<IconLogOut />}>Logout</Dropdown.Item>
              </Dropdown.Items>
            </Dropdown.Root>
          </Stack>
        }
        mobileNavigation={[
          { label: 'Settings', prefix: <IconSettings /> },
          { label: 'Logout', prefix: <IconLogOut /> },
        ]}
      />
    </div>
  )
}

export const BackButton = () => {
  return (
    <Header
      title="Luxemburg Song Contest"
      onBack={() => {
        alert('back button clicked in header')
      }}
      navigation={
        <Stack gap={24}>
          <Button variant="neutral">Documentation</Button>
          <Dropdown.Root>
            <Dropdown.Trigger>
              <div style={{ cursor: 'pointer' }}>
                <Thumbnail text="MD" shape="circle" />
              </div>
            </Dropdown.Trigger>
            <Dropdown.Items>
              <Dropdown.Item icon={<IconSettings />}>Settings</Dropdown.Item>
              <Dropdown.Item icon={<IconLogOut />}>Logout</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Root>
        </Stack>
      }
    />
  )
}
`},{ id: "f11927335739210", story: f11927335739210, path: "/Users/jimdebeer/saulx/better-ui/src/components/Grid/index.stories.tsx", file: `import * as React from 'react'
import {
  Grid,
  Dropdown,
  Button,
  IconCopy,
  IconDelete,
  IconMoreHorizontal,
} from '../../index.js'
import type { Meta } from '@storybook/react'
import { faker } from '@faker-js/faker'

const meta: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

const items = new Array(10).fill(null).map(() => ({
  id: faker.string.uuid().slice(0, 8),
  title: faker.system.commonFileName(),
  description: faker.lorem.words({ min: 0, max: 10 }),
  image: faker.image.url(),
  renderAs: faker.helpers.arrayElement(['folder', 'file', 'image']) as
    | 'folder'
    | 'file'
    | 'image',
}))

export const Default = () => {
  return (
    <div style={{ padding: 64 }}>
      <Grid
        items={items}
        itemAction={() => (
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button variant="icon-only">
                <IconMoreHorizontal />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Items>
              <Dropdown.Item icon={<IconCopy />}>Duplicate</Dropdown.Item>
              <Dropdown.Item icon={<IconDelete />}>Delete</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Root>
        )}
      />
    </div>
  )
}

export const Row = () => {
  return (
    <div style={{ padding: 64 }}>
      <Grid
        items={items}
        variant="row"
        itemAction={() => (
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button variant="icon-only">
                <IconMoreHorizontal />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Items>
              <Dropdown.Item icon={<IconCopy />}>Duplicate</Dropdown.Item>
              <Dropdown.Item icon={<IconDelete />}>Delete</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Root>
        )}
      />
    </div>
  )
}

export const SortableRow = () => {
  return (
    <div style={{ padding: 64 }}>
      <Grid
        items={items}
        sortable
        onChange={(items) => {
          console.info(items)
        }}
        variant="row"
        itemAction={() => (
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button variant="icon-only">
                <IconMoreHorizontal />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Items>
              <Dropdown.Item icon={<IconCopy />}>Duplicate</Dropdown.Item>
              <Dropdown.Item icon={<IconDelete />}>Delete</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Root>
        )}
      />
    </div>
  )
}
`},{ id: "f10173362420623", story: f10173362420623, path: "/Users/jimdebeer/saulx/better-ui/src/components/KeyboardShortcut/index.stories.tsx", file: `import * as React from 'react'
import { KeyboardShortcut } from '../../index.js'
import type { Meta } from '@storybook/react'

const meta: Meta<typeof KeyboardShortcut> = {
  title: 'Atoms/KeyboardShortcut',
  component: KeyboardShortcut,
}

export default meta

export const Default = () => {
  return <KeyboardShortcut shortcut="Cmd+D" />
}

export const Simple = () => {
  return <KeyboardShortcut shortcut="C" />
}

export const Modifier = () => {
  return <KeyboardShortcut shortcut="Cmd+B" />
}

export const DoubleModifier = () => {
  return <KeyboardShortcut shortcut="Cmd+Alt+A" />
}
`},{ id: "f6035430303946", story: f6035430303946, path: "/Users/jimdebeer/saulx/better-ui/src/components/Icons/index.stories.tsx", file: `import * as React from 'react'
// also fix this
import * as Icons from './index.js'
import { styled } from 'inlines'
import { borderRadius, color } from '../../index.js'

const meta = {
  title: 'Atoms/Icons',
}
export default meta

export const Default = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        Click to copy name
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
        }}
      >
        {Object.entries(Icons)
          .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
          .filter(([key]) => !key.toLocaleLowerCase().includes('based'))
          .map(([key, Icon]) => (
            <styled.div
              key={key}
              style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                borderRadius: borderRadius('small'),
                '&:hover': {
                  background: color('background', 'neutral'),
                },
              }}
              onClick={() => {
                navigator.clipboard.writeText(key)
              }}
            >
              <Icon />
              <div style={{ marginTop: 8, fontSize: 14 }}>{key}</div>
            </styled.div>
          ))}
      </div>
    </div>
  )
}
`},{ id: "f1153425962678", story: f1153425962678, path: "/Users/jimdebeer/saulx/better-ui/src/components/LanguageInput/index.stories.tsx", file: `import * as React from 'react'
import { LanguageInput } from '../../index.js'
import type { Meta } from '@storybook/react'

const meta: Meta<typeof LanguageInput> = {
  title: 'Inputs/LanguageInput',
  component: LanguageInput,
}

export default meta

export const Default = () => {
  const [lang, setLang] = React.useState('en')
  return (
    <LanguageInput
      value={lang}
      onChange={setLang}
      options={['en', 'de', 'fr', 'lb']}
    />
  )
}
`},{ id: "f5470738912473", story: f5470738912473, path: "/Users/jimdebeer/saulx/better-ui/src/components/ColorInput/index.stories.tsx", file: `import * as React from 'react'
import { ColorInput } from '../../index.js'

const meta = {
  title: 'Inputs/ColorInput',
}
export default meta

export const Default = () => {
  return (
    <ColorInput
      label="Background color"
      onChange={(value) => {
        console.log('onchange', value)
      }}
      description="put color on"
    />
  )
}

export const Small = () => {
  return <ColorInput variant="small" defaultValue="rgba(0,123,231,0.5)" />
}

export const Error = () => {
  return <ColorInput error />
}

export const Disabled = () => {
  return <ColorInput disabled />
}

export const Undefined = () => {
  return <ColorInput value={undefined} />
}
`},{ id: "f936609549945", story: f936609549945, path: "/Users/jimdebeer/saulx/better-ui/src/components/Modal/index.stories.tsx", file: `import * as React from 'react'
import { Modal, Button, TextInput, SelectInput } from '../../index.js'
import { styled } from 'inlines'

const meta = {
  title: 'Components/Modal',
  decorators: [
    (Story) => (
      <Modal.Provider>
        <Story />
      </Modal.Provider>
    ),
  ],
}

export default meta

export const Default = () => {
  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button>Open modal</Button>
      </Modal.Trigger>
      <Modal.Overlay>
        {({ close }) => (
          <>
            <Modal.Title
              children="Add custom view"
              description="This is your organisation’s name within Based. For example, you can use the name of your company or department."
            />
            <Modal.Body>
              <styled.div
                style={{
                  '& > * + *': {
                    marginTop: '24px',
                    marginBottom: '24px',
                  },
                }}
              >
                <TextInput label="Name" />
                <SelectInput
                  label="Language"
                  options={[
                    { label: 'English', value: 'english', prefix: '🇺🇸' },
                    { label: 'Hungarian', value: 'hungarian', prefix: '🇭🇺' },
                  ]}
                />
              </styled.div>
              <Modal.Message
                message="You are about to update the view"
                variant="positive"
              />
            </Modal.Body>

            <Modal.Actions>
              <Button variant="neutral" onClick={close}>
                Cancel
              </Button>
              <Button>Save</Button>
            </Modal.Actions>
          </>
        )}
      </Modal.Overlay>
    </Modal.Root>
  )
}

export const Nested = ({ level = 0 }) => {
  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button>Open modal</Button>
      </Modal.Trigger>
      <Modal.Overlay>
        {({ close }) => (
          <>
            <Modal.Title children={\`Modal #\$level}\`} description="ss" />
            <Modal.Actions>
              <Nested level={level + 1} />
              <Button variant="neutral" onClick={close}>
                Cancel
              </Button>
              <Button variant="error" onClick={close}>
                Cancel in red
              </Button>
            </Modal.Actions>
          </>
        )}
      </Modal.Overlay>
    </Modal.Root>
  )
}

export const List = ({ level = 0 }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <Modal.Root key={i}>
            <Modal.Trigger>
              <Button>Open modal</Button>
            </Modal.Trigger>
            <Modal.Overlay>
              {({ close }) => (
                <>
                  <Modal.Title children={\`Modal #\$level}\`} />
                  <Modal.Actions>
                    <Nested level={level + 1} />
                    <Button variant="neutral" onClick={close}>
                      Cancel
                    </Button>
                  </Modal.Actions>
                </>
              )}
            </Modal.Overlay>
          </Modal.Root>
        )
      })}
    </div>
  )
}

export const Open = () => {
  const modal = Modal.useModal()

  return (
    <Button
      onClick={() => {
        modal.open(
          <Modal title="xxx">
            Imma body
            <Modal.Message
              variant="warning"
              message="just a silly warning"
              style={{ marginTop: 20 }}
            />
            <Modal.Actions>
              <Button>Snurp</Button>
            </Modal.Actions>
          </Modal>,
        )
      }}
    >
      Open
    </Button>
  )
}

export const Alert = () => {
  const modal = Modal.useModal()

  return (
    <Button
      onClick={() => {
        modal.alert('Hello')
      }}
    >
      Alert
    </Button>
  )
}

export const Prompt = () => {
  const modal = Modal.useModal()

  return (
    <Button
      onClick={async () => {
        const res = await modal.prompt('Hello?')
        if (res) {
          return modal.alert(res)
        }
      }}
    >
      Prompt
    </Button>
  )
}

export const Confirm = () => {
  const { confirm, alert } = Modal.useModal()

  return (
    <div>
      <Button
        onClick={async () => {
          const res = await confirm('Yes??')
          return alert(res ? 'YES' : 'NO')
        }}
      >
        Confirm
      </Button>
    </div>
  )
}

const Ctx = React.createContext(null)

const CtxModal = () => {
  const ctx = React.useContext(Ctx)
  return <div>My context is: {ctx}</div>
}

export const ModalCtx = () => {
  const { open } = Modal.useModal()
  const modal1 = Modal.useModal()
  const modal2 = Modal.useModal()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Button
        onClick={async () => {
          return open(<CtxModal />)
        }}
      >
        Open modal without context
      </Button>
      <Ctx.Provider value="total success 1">
        <modal1.Provider />
        <Button
          onClick={async () => {
            return modal1.open(<CtxModal />)
          }}
        >
          Open modal with context 1
        </Button>
      </Ctx.Provider>
      <Ctx.Provider value="total success 2">
        <modal2.Provider />
        <Button
          onClick={async () => {
            return modal2.open(<CtxModal />)
          }}
        >
          Open modal with context 2
        </Button>
      </Ctx.Provider>
    </div>
  )
}

export const ModalConfirm = () => {
  const { open } = Modal.useModal()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Button
        onClick={async () => {
          const result = await open(({ close }) => (
            <Modal
              onConfirm={() => {
                close('yay')
              }}
            >
              xxx
            </Modal>
          ))

          console.log({ result })
        }}
      >
        Open modal
      </Button>
      <Button
        onClick={async () => {
          const result = await open(({ close }) => (
            <Button
              onClick={() => {
                close('supercool')
              }}
            >
              cool stuff
            </Button>
          ))

          console.log({ result })
        }}
      >
        Open modal 2
      </Button>
    </div>
  )
}
`},{ id: "f5634334384066", story: f5634334384066, path: "/Users/jimdebeer/saulx/better-ui/src/components/Note/index.stories.tsx", file: `import { Note } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Note> = {
  title: 'Atoms/Note',
  component: Note,
}

export default meta

export const Error: StoryObj<typeof Note> = {
  args: {
    children: 'This is an error',
    variant: 'error',
  },
}

export const Warning: StoryObj<typeof Note> = {
  args: {
    children: 'This is a warning',
    variant: 'warning',
  },
}

export const Positive: StoryObj<typeof Note> = {
  args: {
    children: 'This is positive',
    variant: 'positive',
  },
}

export const Informative: StoryObj<typeof Note> = {
  args: {
    children: 'This is informative',
    variant: 'informative',
  },
}

export const Neutral: StoryObj<typeof Note> = {
  args: {
    children: 'This is neutral',
    variant: 'neutral',
  },
}
`},{ id: "f4437124256520", story: f4437124256520, path: "/Users/jimdebeer/saulx/better-ui/src/components/Layout/index.stories.tsx", file: `import * as React from 'react'
import type { Meta } from '@storybook/react'
import {
  Layout,
  Page,
  Header,
  Sidebar,
  IconSettings,
  IconUsers,
  IconViewBoxes,
  Text,
} from '../../index.js'

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

const PageA = () => {
  return (
    <Page>
      {Array.from({ length: 30 }).map((_, i) => (
        <Text
          key={i}
          variant="body-strong"
          style={{ fontSize: 64, lineHeight: '64px' }}
        >
          Page A content
        </Text>
      ))}
    </Page>
  )
}

const PageB = () => {
  const [page, setPage] = React.useState('x')

  return (
    <>
      <Sidebar
        data={[
          { label: 'Nested X', value: 'x' },
          { label: 'Nested Y', value: 'y' },
        ]}
        value={page}
        onValueChange={setPage}
        collapsable={false}
      />

      {page === 'x' && <Page>nested x</Page>}
      {page === 'y' && <Page>nested y</Page>}
    </>
  )
}

const PageC = () => {
  return <Page>page C content</Page>
}

export const Default = () => {
  const [page, setPage] = React.useState('a')
  const [open, setOpen] = React.useState(true)

  return (
    <Layout
      header={
        <Header
          logo={<div>Logo</div>}
          navigation={<div>navigation items</div>}
        />
      }
    >
      <Sidebar
        data={[
          { label: 'Overview', value: 'a', prefix: <IconViewBoxes /> },
          { label: 'Users', value: 'b', prefix: <IconUsers /> },
          { label: 'Settings', value: 'c', prefix: <IconSettings /> },
        ]}
        value={page}
        onValueChange={(newValue) => {
          setPage(newValue)

          // if the new value is in this list then we close the sidebar otherwise open
          // (page b has a nested sidebar, others don't)
          setOpen(!['b'].includes(newValue))
        }}
        open={open}
        onOpenChange={setOpen}
      />

      {page === 'a' && <PageA />}
      {page === 'b' && <PageB />}
      {page === 'c' && <PageC />}
    </Layout>
  )
}
`},{ id: "f9460110149634", story: f9460110149634, path: "/Users/jimdebeer/saulx/better-ui/src/components/PieGraph/index.stories.tsx", file: `import type { Meta, StoryObj } from '@storybook/react'
import { PieGraph } from '../../index.js'

const meta: Meta<typeof PieGraph> = {
  title: 'Atoms/PieGraph',
  component: PieGraph,
}

export default meta

export const Default: StoryObj<typeof PieGraph> = {
  args: {
    legend: true,

    style: {
      width: 500,
    },
    data: [
      {
        label: 'foo',
        value: 25455,
      },
      {
        label: 'Sugar',
        value: 5484,
      },
      {
        label: 'asd',
        value: 999,
      },
      {
        label: 'Cinnamon',
        value: 2566,
      },
    ],
  },
}
`},{ id: "f5909785848135", story: f5909785848135, path: "/Users/jimdebeer/saulx/better-ui/src/components/NumberInput/index.stories.tsx", file: `import { NumberInput } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof NumberInput> = {
  title: 'Inputs/NumberInput',
  component: NumberInput,
}

export default meta

export const Default: StoryObj<typeof NumberInput> = {
  args: {
    placeholder: 'Placeholder text',
    label: 'Label',
    description: "What's your number?",
    step: 4,
    onChange: (value) => {
      console.log(value)
    },
    disabled: false,
  },
}

export const Small: StoryObj<typeof NumberInput> = {
  args: {
    placeholder: 'Placeholder text',
    variant: 'small',
  },
}

export const Error: StoryObj<typeof NumberInput> = {
  args: {
    placeholder: 'Placeholder text',
    error: true,
  },
}
`},{ id: "f6285988781667", story: f6285988781667, path: "/Users/jimdebeer/saulx/better-ui/src/components/Schema/index.stories.tsx", file: `import * as React from 'react'
import { Schema, Modal, Page, border, borderRadius } from '../../index.js'
import type { Meta } from '@storybook/react'
import based from '@based/client'
import { Provider, useQuery } from '@based/react'

const client = based({
  org: 'demo',
  project: 'demo',
  env: 'production',
})

const meta: Meta<typeof Schema> = {
  title: 'Based/SchemaEditor',
  decorators: [
    (Story) => (
      <Provider client={client}>
        <Modal.Provider>
          <Page
            style={{
              width: '100%',
              height: '50vh',
              border: border(),
              borderRadius: borderRadius('medium'),
            }}
          >
            <Story />
          </Page>
        </Modal.Provider>
      </Provider>
    ),
  ],
}

export default meta

export const Default = () => {
  // get a schema
  const { data, loading } = useQuery('db:schema')

  console.log('Schema -->', data, 'loading =', loading)

  if (loading) {
    return null
  }

  return <Schema schemaInput={data} />
}
`},{ id: "f16765197606902", story: f16765197606902, path: "/Users/jimdebeer/saulx/better-ui/src/components/Media/index.stories.tsx", file: `import * as React from 'react'
import type { Meta } from '@storybook/react'
import { color, Media, Stack } from '../../index.js'

const meta: Meta<typeof Media> = {
  title: 'Atoms/Media',
  component: Media,
  parameters: {
    layout: 'fullscreen',
  },
}

const base64 =
  'data:image/png;base64,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'

export default meta

function Examples() {
  return (
    <>
      <Media type="directory" />
      <Media type="application/pdf" src="no_extension_just_mime" />
      <Media src="no_mime_just_extension.txt" />
      <Media src="no_mime_just_extension.docx" />
      <Media variant="contain" src="https://i.imgur.com/t1bWmmC.jpeg" />
      <Media variant="contain" src="https://i.imgur.com/t1bWmmC.jpg" />
      <Media variant="contain" src="https://i.imgur.com/slJCr8Q.png" />
      <Media variant="contain" src="https://i.imgur.com/t1bWmmC.gif" />

      <Media src={base64} />

      <Media
        type="image/*"
        variant="cover"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <Media
        type="video/*"
        variant="cover"
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
      />
      <Media
        type="video/*"
        variant="cover"
        src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        thumbnail="https://plus.unsplash.com/premium_photo-1701767501250-fda0c8f7907f?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <Media
        type="*/*"
        variant="cover"
        thumbnail="https://plus.unsplash.com/premium_photo-1701767501250-fda0c8f7907f?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </>
  )
}

export const Small = () => {
  return (
    <Stack
      grid={48}
      style={{
        padding: 12,
        '& > *': {
          background: color('background', 'neutral'),
          borderRadius: '4px',
        },
      }}
    >
      <Examples />
    </Stack>
  )
}

export const Medium = () => {
  return (
    <Stack
      grid={100}
      style={{
        padding: 12,
        '& > *': {
          background: color('background', 'neutral'),
          borderRadius: '4px',
        },
      }}
    >
      <Examples />
    </Stack>
  )
}

export const Large = () => {
  return (
    <Stack
      grid={200}
      style={{
        padding: 12,
        '& > *': {
          background: color('background', 'neutral'),
          borderRadius: '4px',
        },
      }}
    >
      <Examples />
    </Stack>
  )
}
`},{ id: "f16472063764097", story: f16472063764097, path: "/Users/jimdebeer/saulx/better-ui/src/components/Page/index.stories.tsx", file: `import * as React from 'react'
import { Page, Text } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'
import { styled } from 'inlines'

const meta: Meta<typeof Page> = {
  title: 'Atoms/Page',
  component: Page,
}

export default meta

export const Default: StoryObj<typeof Page> = {
  args: {
    children: (
      <styled.div
        style={{
          width: 540,
          '& > div': {
            height: '270px',
          },
        }}
      >
        <styled.div style={{ background: '#f5f5f5', height: 200 }}>
          <Text variant="body">xx</Text>
          🦍
        </styled.div>
        <styled.div style={{ background: '#afafaf' }}>🐳</styled.div>
        <styled.div style={{ background: '#f5f5f5' }}>🦀</styled.div>
        <styled.div style={{ background: '#afafaf' }}>🦧</styled.div>
        <styled.div style={{ background: '#f5f5f5' }}>🐍</styled.div>
      </styled.div>
    ),
    style: { maxHeight: 324 },
  },
}
`},{ id: "f12047187696222", story: f12047187696222, path: "/Users/jimdebeer/saulx/better-ui/src/components/RichTextEditor/index.stories.tsx", file: `import type { Meta, StoryObj } from '@storybook/react'
import { RichTextEditor } from '../../index.js'

const meta: Meta<typeof RichTextEditor> = {
  title: 'Inputs/RichTextEditor',
  component: RichTextEditor,
}

export default meta

export const Default: StoryObj<typeof RichTextEditor> = {
  args: {
    autoFocus: true,
    placeholder: 'Enter some rich text...',
    onChange: ({ json, html }) => {
      console.log('onchange html --> ', html)
      console.log('onchange json --> ', json)
    },
  },
}
`},{ id: "f1126609356048", story: f1126609356048, path: "/Users/jimdebeer/saulx/better-ui/src/components/LineGraph/index.stories.tsx", file: `import * as React from 'react'
import type { Meta } from '@storybook/react'
import { LineGraph } from '../../index.js'

const meta: Meta<typeof LineGraph> = {
  title: 'Atoms/LineGraph',
  component: LineGraph,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

const genRandomPoints = (
  formula: (i: number) => { x: number; y: number },
  start: number = 0,
  end: number = 50,
  step: number = 1,
) => {
  const points: { x: number; y: number }[] = []
  for (let i = start; i <= end; i = i + step) {
    points.push(formula(i))
  }
  return points
}

export const Single = () => {
  return (
    <div
      style={{
        height: 500,
        width: 700,
      }}
    >
      <LineGraph
        data={{
          en: {
            data: genRandomPoints(
              (i) => ({
                x: i,
                y: ~~(Math.random() * 10000000) + i * 100,
              }),
              0,
              50000,
            ),
            minMax: true,
          },
        }}
      />
    </div>
  )
}

export const Multi = () => {
  return (
    <div
      style={{
        height: 500,
        width: 700,
      }}
    >
      <LineGraph
        data={{
          line1: {
            color: 'red',
            data: genRandomPoints(
              (i) => ({
                x: i,
                y: ~~(Math.random() * 100000) + i * 100,
              }),
              0,
              1000,
            ),
            // label: 'housing market 🏠',
          },
          line2: {
            color: 'green',
            // label: 'bitcoin 💸',
            data: genRandomPoints(
              (i) => ({
                x: i,
                y: ~~(Math.random() * 100000) + i * 100,
              }),
              0,
              1000,
            ),
          },
          line3: {
            color: 'blue',
            data: genRandomPoints(
              (i) => ({
                x: i,
                y: ~~(Math.random() * 100000) + i * 100,
              }),
              0,
              1000,
            ),
            // label: 'housing market 🏠',
          },
        }}
      />
    </div>
  )
}
`},{ id: "f4412292282470", story: f4412292282470, path: "/Users/jimdebeer/saulx/better-ui/src/components/SetInput/index.stories.tsx", file: `import { SetInput } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SetInput> = {
  title: 'Inputs/SetInput',
  component: SetInput,
}

export default meta

export const Default: StoryObj<typeof SetInput> = {
  args: {
    fieldItemType: 'number',
    label: 'Set Numbers',
    description: 'A set with numbers',
    value: [1, 2, 3, 6, 9],
    disabled: false,
  },
}

export const Strings: StoryObj<typeof SetInput> = {
  args: {
    label: 'Set of strings',
    description: 'A set with strings',
    value: ['flurp', 'snurp', 'derp'],
    onChange: (v) => console.log('onchange log: ', v),
  },
}

export const Options: StoryObj<typeof SetInput> = {
  args: {
    label: 'Options',
    description: 'Set with predefined options',
    options: ['cars', 'drinks', 'animals', 'shoes', 'bags'],
    onChange: (v) => console.log('onchange log: ', v),
  },
}
`},{ id: "f16126198374920", story: f16126198374920, path: "/Users/jimdebeer/saulx/better-ui/src/components/ScrollArea/index.stories.tsx", file: `import * as React from 'react'
import { ScrollArea } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'
import { styled } from 'inlines'

const meta: Meta<typeof ScrollArea> = {
  title: 'Atoms/ScrollArea',
  component: ScrollArea,
}

export default meta

export const Default: StoryObj<typeof ScrollArea> = {
  args: {
    children: (
      <styled.div
        style={{
          width: 420,
          '& > div': {
            height: '270px',
          },
        }}
      >
        <styled.div
          style={{ background: '#f6f6f6', height: 200, width: 700 }}
        />
        <styled.div
          style={{ background: '#f1f1f1', height: 200, width: 700 }}
        />
        <styled.div
          style={{ background: '#f9f9f9', height: 200, width: 700 }}
        />
        <styled.div
          style={{ background: '#ffe596', height: 200, width: 700 }}
        />
        <styled.div
          style={{ background: '#f3f3f3', height: 200, width: 700 }}
        />
      </styled.div>
    ),
    style: { maxHeight: 324 },
  },
}
`},{ id: "f17293536255708", story: f17293536255708, path: "/Users/jimdebeer/saulx/better-ui/src/components/Stack/index.stories.tsx", file: `import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Stack, border, borderRadius } from '../../index.js'

const meta: Meta<typeof Stack> = {
  title: 'Atoms/Stack',
  component: Stack,
}

export default meta

export const Default: StoryObj<typeof Stack> = {
  args: {
    gap: 32,
    style: {
      '& > *': {
        border: border(),
        borderRadius: borderRadius('small'),
        padding: '20px',
      },
    },
    children: [<div>Have a nice day!</div>, <div>Have a nice day!</div>],
  },
}

const manyChildren: ReactNode[] = []

for (let i = 0; i < 20; i++) {
  manyChildren.push(<div>Have a nice day! {i}</div>)
}

export const Grid: StoryObj<typeof Stack> = {
  args: {
    grid: true,
    gap: 12,
    style: {
      '& > *': {
        border: border(),
        borderRadius: borderRadius('small'),
        padding: '20px',
      },
    },
    children: manyChildren,
  },
}

export const GridFixedHeight: StoryObj<typeof Stack> = {
  args: {
    grid: 200,
    gap: 12,
    style: {
      border: border(),
      padding: 24,
      minWidth: '750px',
      '& > *': {
        border: border(),
        borderRadius: borderRadius('small'),
        padding: '20px',
      },
    },
    children: manyChildren,
  },
}
`},{ id: "f13597506036687", story: f13597506036687, path: "/Users/jimdebeer/saulx/better-ui/src/components/Spinner/index.stories.tsx", file: `import { Spinner } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
}

export default meta

export const Default: StoryObj<typeof Spinner> = {
  args: {
    size: 48,
  },
}
`},{ id: "f10196973367128", story: f10196973367128, path: "/Users/jimdebeer/saulx/better-ui/src/components/Sidebar/index.stories.tsx", file: `import * as React from 'react'
import {
  Sidebar,
  IconViewBoxes,
  IconEdit,
  IconUsers,
  IconAlert,
  Badge,
  color,
  IconBased,
} from '../../index.js'
import type { Meta } from '@storybook/react'
import { BasedLogoWithText } from '../Icons/extras.js'

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            background: color('background', 'muted'),
            height: '300px',
            width: '100%',
          }}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default meta

export const Default = () => {
  const [v, setV] = React.useState('overview')

  return (
    <Sidebar
      value={v}
      onValueChange={setV}
      data={[
        {
          label: 'Overview',
          value: 'overview',
          prefix: <IconViewBoxes />,
          suffix: <Badge color="informative-muted">12</Badge>,
        },
        {
          label: 'Content',
          value: 'content',
          prefix: <IconEdit />,
          suffix: <IconAlert />,
        },
        { label: 'Users', value: 'users', prefix: <IconUsers /> },
      ]}
    />
  )
}

export const Small = () => {
  const [v, setV] = React.useState('overview')
  return (
    <Sidebar
      size="small"
      value={v}
      onValueChange={setV}
      data={[
        {
          label: 'Overview',
          value: 'overview',
          prefix: <IconViewBoxes />,
        },
        {
          label: 'Content',
          value: 'content',
          prefix: <IconEdit />,
          suffix: <IconAlert />,
        },
        { label: 'Users', value: 'users', prefix: <IconUsers /> },
      ]}
    />
  )
}

export const SmallCollapsed = () => {
  const [v, setV] = React.useState('overview')
  return (
    <Sidebar
      size="small"
      value={v}
      open={false}
      onValueChange={setV}
      data={[
        {
          label: 'Overview',
          value: 'overview',
          prefix: <IconViewBoxes />,
        },
        {
          label: 'Content',
          value: 'content',
          prefix: <IconEdit />,
          suffix: <IconAlert />,
        },
        { label: 'Users', value: 'users', prefix: <IconUsers /> },
      ]}
    />
  )
}

export const Logo = () => {
  const [v, setV] = React.useState('overview')

  return (
    <Sidebar
      value={v}
      onValueChange={setV}
      header={<BasedLogoWithText />}
      data={[
        {
          label: 'Overview',
          value: 'overview',
          prefix: <IconViewBoxes />,
          suffix: <Badge color="informative-muted">12</Badge>,
        },
        {
          label: 'Content',
          value: 'content',
          prefix: <IconEdit />,
          suffix: <IconAlert />,
        },
        { label: 'Users', value: 'users', prefix: <IconUsers /> },
      ]}
    />
  )
}

export const Collapsable = () => {
  const [v, setV] = React.useState('overview')

  return (
    <Sidebar
      collapsable
      value={v}
      onValueChange={setV}
      data={[
        {
          label: 'Overview',
          value: 'overview',
          prefix: <IconViewBoxes />,
          suffix: <Badge color="informative-muted">12</Badge>,
        },
        {
          label: 'Content',
          value: 'content',
          prefix: <IconEdit />,
          suffix: <IconAlert />,
        },
        { label: 'Users', value: 'users', prefix: <IconUsers /> },
      ]}
    />
  )
}

export const Groups = () => {
  const [v, setV] = React.useState('overview')

  return (
    <Sidebar
      value={v}
      onValueChange={setV}
      header={<BasedLogoWithText />}
      data={{
        Group1: Array.from({ length: 16 }).map((_, i) => ({
          label: 'Item ' + i,
          value: 'item' + i,
        })),
        Group2: Array.from({ length: 16 }).map((_, i) => ({
          label: 'Group 2 Item ' + i,
          value: 'g2item' + i,
        })),
      }}
    />
  )
}

export const GroupsCollapsed = () => {
  const [v, setV] = React.useState('overview')

  return (
    <Sidebar
      open={false}
      value={v}
      onValueChange={setV}
      HeaderComponent={({ open }) =>
        open ? <BasedLogoWithText /> : <IconBased />
      }
      data={{
        Group1: Array.from({ length: 16 }).map((_, i) => ({
          label: 'Item ' + i,
          value: 'item' + i,
          prefix: i,
        })),
        Group2: Array.from({ length: 16 }).map((_, i) => ({
          label: 'Group 2 Item ' + i,
          value: 'g2item' + i,
        })),
      }}
    />
  )
}
`},{ id: "f15513603856812", story: f15513603856812, path: "/Users/jimdebeer/saulx/better-ui/src/components/SelectInput/index.stories.tsx", file: `import { SelectInput } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SelectInput> = {
  title: 'Inputs/SelectInput',
  component: SelectInput,
}

export default meta

export const Default: StoryObj<typeof SelectInput> = {
  args: {
    placeholder: 'Select something',
    label: 'Favourite fruit',
    description: 'What is your favourite?',
    disabled: false,
    options: [
      {
        label: 'Orange',
        value: 'orange',
        prefix: '🍊',
      },
      {
        label: 'Banana',
        value: 'banana',
        prefix: '🍌',
      },
      ...Array.from({ length: 100 }).map((_, i) => ({
        label: \`Apple \$i}\`,
        value: \`apple-\$i}\`,
        prefix: '🍎',
      })),
    ],
  },
}

export const Simple: StoryObj<typeof SelectInput> = {
  args: {
    placeholder: 'Select something',
    label: 'Favourite fruit',
    options: ['orange', 'banana', 'apple'],
  },
}

export const Clearable: StoryObj<typeof SelectInput> = {
  args: {
    placeholder: 'Select something',
    label: 'Favourite fruit',
    options: ['orange', 'banana', 'apple'],
    clearable: true,
  },
}

export const Small: StoryObj<typeof SelectInput> = {
  args: {
    value: 'orange',
    placeholder: 'Select something',
    options: ['orange', 'banana', 'apple'],
    variant: 'small',
  },
}

export const Error: StoryObj<typeof SelectInput> = {
  args: {
    placeholder: 'Select something',
    options: ['orange', 'banana', 'apple'],
    error: true,
  },
}
`},{ id: "f2542458627838", story: f2542458627838, path: "/Users/jimdebeer/saulx/better-ui/src/components/Thumbnail/index.stories.tsx", file: `import * as React from 'react'
import { Thumbnail, IconBorderLeft, Stack } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'
import { faker } from '@faker-js/faker'

const meta: Meta<typeof Thumbnail> = {
  title: 'Atoms/Thumbnail',
  component: Thumbnail,
}

export default meta

export const Image: StoryObj<typeof Thumbnail> = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    size: 'large',
    shape: 'square',
    color: 'blue',
  },
}

export const Icon: StoryObj<typeof Thumbnail> = {
  args: {
    // src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    // text: 'flappie',
    size: 'large',
    shape: 'circle',
    icon: <IconBorderLeft />,
    color: 'raspberry-soft',
  },
}

export const Placeholder: StoryObj<typeof Thumbnail> = {
  args: {
    text: 'AB',
    size: 'large',
    shape: 'circle',
    // color: 'auto',
    color: 'aquamarine-soft',
    outline: true,
  },
}

export const Counter: StoryObj<typeof Thumbnail> = {
  args: {
    text: 'AB',
    size: 'large',
    shape: 'square',
    count: 8,
  },
}

const facesNames = new Array(100).fill(null).map(() => ({
  src: faker.image.avatar(),
  id: faker.string.uuid().slice(0, 8),
  description: faker.lorem.words({ min: 0, max: 10 }),
  firstName: faker.person.firstName(),
  createdAt: faker.date.recent().valueOf(),
  lastUpdated: faker.date.recent().valueOf(),
  powerTime: faker.date.recent().valueOf(),
  city: faker.location.city(),
}))

export const Gallery = () => {
  return (
    <Stack grid>
      {facesNames.map((v) => {
        return <Thumbnail outline text={v.firstName} key={v.id} />
      })}
    </Stack>
  )
}

export const GalleryMuted = () => {
  return (
    <Stack grid>
      {facesNames.map((v) => {
        return <Thumbnail color="auto-muted" text={v.firstName} key={v.id} />
      })}
    </Stack>
  )
}

export const GalleryMutedOutline = () => {
  return (
    <Stack grid>
      {facesNames.map((v) => {
        return (
          <Thumbnail outline color="auto-muted" text={v.firstName} key={v.id} />
        )
      })}
    </Stack>
  )
}

export const GalleryMutedOutlineCircle = () => {
  return (
    <Stack grid>
      {facesNames.map((v) => {
        return (
          <Thumbnail
            size="extra-extra-large"
            src={v.src}
            shape="circle"
            outline
            color="auto-muted"
            text={v.firstName}
            key={v.id}
          />
        )
      })}
    </Stack>
  )
}
`},{ id: "f5979046522585", story: f5979046522585, path: "/Users/jimdebeer/saulx/better-ui/src/components/TextInput/index.stories.tsx", file: `import { TextInput } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TextInput> = {
  title: 'Inputs/TextInput',
  component: TextInput,
}

export default meta

export const Default: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'Placeholder text',
    label: 'Label',
    description: 'Enter some text',
  },
}

export const Small: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'Placeholder text',
    variant: 'small',
  },
}

export const Error: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'Placeholder text',
    error: true,
  },
}

export const Disabled: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'Placeholder text',
    label: 'Label',
    disabled: true,
  },
}
`},{ id: "f7144734297614", story: f7144734297614, path: "/Users/jimdebeer/saulx/better-ui/src/components/TextAreaInput/index.stories.tsx", file: `import { TextAreaInput } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TextAreaInput> = {
  title: 'Inputs/TextAreaInput',
  component: TextAreaInput,
}

export default meta

export const Default: StoryObj<typeof TextAreaInput> = {
  args: {
    placeholder: 'Placeholder text',
    label: 'Label',
    description: 'Enter some text if you wish',
    disabled: false,
  },
}

export const Small: StoryObj<typeof TextAreaInput> = {
  args: {
    placeholder: 'Placeholder text',
    variant: 'small',
  },
}

export const Error: StoryObj<typeof TextAreaInput> = {
  args: {
    placeholder: 'Placeholder text',
    label: 'Label',
    error: true,
  },
}
`},{ id: "f17512554344332", story: f17512554344332, path: "/Users/jimdebeer/saulx/better-ui/src/components/Table/index.stories.tsx", file: `import * as React from 'react'
import { Table, useUpdate } from '../../index.js'
import { faker } from '@faker-js/faker'
import based from '@based/client'
import { wait } from '@saulx/utils'

const client = based({
  org: 'saulx',
  project: 'based-ui',
  env: 'production',
})

const meta = {
  title: 'Components/Table',
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta

const data = new Array(100).fill(null).map(() => ({
  id: faker.string.uuid().slice(0, 8),
  src: faker.image.avatar(),
  status: faker.lorem.words(1),
  title: faker.lorem.sentence(3),
  number: faker.number.int(10),
  name: faker.person.fullName(),
  price: faker.commerce.price(),
  color: faker.color.rgb(),
  createdAt: faker.date.soon().valueOf(),
}))

const dataSmall = new Array(10).fill(null).map(() => ({
  id: faker.string.uuid().slice(0, 8),
  src: faker.image.avatar(),
  status: faker.lorem.words(1),
  title: faker.lorem.sentence(3),
  number: faker.number.int(10),
  name: faker.person.fullName(),
  price: faker.commerce.price(),
  color: faker.color.rgb(),
  createdAt: faker.date.soon().valueOf(),
}))

const dataLots = new Array(1000).fill(null).map((v, index) => ({
  nr: index, // check if all are numbers
  src: faker.image.avatar(),
  status: faker.lorem.words(1),
  title: faker.lorem.sentence(3),
  number: faker.number.int(10),
  name: faker.person.fullName(),
  price: faker.commerce.price(),
  color: faker.color.rgb(),
  createdAt: faker.date.soon().valueOf(),
}))

export const Default = () => {
  return (
    <div
      style={{
        height: 500,
      }}
    >
      <Table values={data} pagination sort />
    </div>
  )
}

export const LoadMore = () => {
  const dataRef = React.useRef({
    data: [...dataSmall],
  })

  const update = useUpdate()

  const d = dataRef.current.data

  return (
    <div
      style={{
        height: 500,
      }}
    >
      <Table
        values={d}
        pagination={{
          loadMore: async (p) => {
            await wait(Math.random() * 100)
            dataRef.current.data.push(
              ...new Array(p.pageSize * 5).fill(null).map((_, i) => ({
                id: faker.string.uuid().slice(0, 8),
                src: faker.image.avatar(),
                status: faker.lorem.words(1),
                title: faker.lorem.sentence(3),
                number: i + dataRef.current.data.length,
                name: faker.person.fullName(),
                price: faker.commerce.price(),
                color: faker.color.rgb(),
                createdAt: faker.date.soon().valueOf(),
              })),
            )
            update()
          },
          onPageChange: async (p) => {
            dataRef.current.data[p.start + 1].name =
              '$$$$$ ' + faker.person.fullName()
            update()
          },
          total: d.length,
          type: 'scroll',
        }}
        sort
      />
    </div>
  )
}

export const Infinite = () => {
  return (
    <div
      style={{
        height: 500,
      }}
    >
      <Table values={dataLots} pagination sort />
    </div>
  )
}

const sortByPrice = (a, b) => {
  return a.price * 1 > b.price * 1 ? -1 : a.price * 1 === b.price * 1 ? 0 : 1
}

const dataSorted = [...data].sort(sortByPrice)

export const CustomSort = () => {
  const update = useUpdate()
  return (
    <div
      style={{
        height: 500,
      }}
    >
      <Table
        values={dataSorted}
        pagination
        sort={{
          sorted: { key: 'price', dir: 'desc' },
          include: new Set(['price']),
          onSort: (key, dir, sort) => {
            sort.sorted = { key, dir }
            dataSorted.sort((a, b) => {
              return sortByPrice(a, b) * (dir === 'asc' ? -1 : 1)
            })
            update()
          },
        }}
      />
    </div>
  )
}

export const EditableTable = () => {
  return <Table values={dataSmall} editable sortable />
}

// const InfiniteQueryContent = () => {
//   const [itemToDelete, setItemToDelete] = React.useState(null)
//   const { data, fetchMore, setVisibleElements } = useInfiniteQuery({
//     accessFn: (data) => data.files,
//     queryFn: (offset) => ({
//       $id: 'root',
//       files: {
//         $all: true,
//         $list: {
//           $sort: { $field: 'updatedAt', $order: 'desc' },
//           $offset: offset,
//           $limit: 25,
//           $find: {
//             $traverse: 'children',
//             $filter: {
//               $operator: '=',
//               $field: 'type',
//               $value: 'todo',
//             },
//           },
//         },
//       },
//     }),
//   })

//   return (
//     <>
//       <div style={{ height: '100svh' }}>
//         <Table
//           data={data}
//           onScrollToBottom={fetchMore}
//           onVisibleElementsChange={setVisibleElements}
//           rowAction={(row) => (
//             <Dropdown.Root>
//               <Dropdown.Trigger>
//                 <Button shape="square" variant="neutral-transparent">
//                   <IconMoreVertical />
//                 </Button>
//               </Dropdown.Trigger>
//               <Dropdown.Items>
//                 <Dropdown.Item icon={<IconCopy />}>Copy</Dropdown.Item>
//                 <Dropdown.Item
//                   icon={<IconDelete />}
//                   onClick={() => {
//                     setItemToDelete(row.id)
//                   }}
//                 >
//                   Delete
//                 </Dropdown.Item>
//               </Dropdown.Items>
//             </Dropdown.Root>
//           )}
//         />
//       </div>
//       {itemToDelete && (
//         <Modal.Root
//           open
//           onOpenChange={() => {
//             setItemToDelete(null)
//           }}
//         >
//           <Modal.Overlay>
//             {({ close }) => (
//               <>
//                 <Modal.Title description="Are you sure? This action cannot be undone.">
//                   Deleting item #{itemToDelete}
//                 </Modal.Title>
//                 <Modal.Actions>
//                   <Button onClick={close} variant="neutral">
//                     Cancel
//                   </Button>
//                   <Button onClick={close} variant="error">
//                     Delete
//                   </Button>
//                 </Modal.Actions>
//               </>
//             )}
//           </Modal.Overlay>
//         </Modal.Root>
//       )}
//     </>
//   )
// }

// export const InfiniteQuery = () => {
//   return (
//     <Provider client={client}>
//       <InfiniteQueryContent />
//     </Provider>
//   )
// }
`},{ id: "f16386070420783", story: f16386070420783, path: "/Users/jimdebeer/saulx/better-ui/src/components/Text/index.stories.tsx", file: `import { Text } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
}

export default meta

export const Body: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'body',
    color: 'secondary',
  },
}

export const title: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'title',
  },
}

export const titlePage: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'title-page',
    weight: 'strong',
    as: 'h2',
  },
}

export const titleModal: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'title-modal',
  },
}

export const bodyBold: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'body-bold',
  },
}

export const bodyStrong: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'body-strong',
  },
}

export const caption: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'caption',
  },
}
`},{ id: "f8139019256634", story: f8139019256634, path: "/Users/jimdebeer/saulx/better-ui/src/components/Form/stories/arrays.stories.tsx", file: `import * as React from 'react'
import { Form, Modal } from '../../../index.js'
import { objectField } from './objectField.js'
import { deepMerge } from '@saulx/utils'

const meta = {
  title: 'Form/Arrays',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Modal.Provider>
        <Story />
      </Modal.Provider>
    ),
  ],
}

export default meta

export const Arrays = () => {
  return (
    <Form
      values={{
        simpleArray: ['hello'],
        array: [
          {
            price: 2,
            powerful: 'rgb(188,56,0)',
          },
          {
            powerful: 'rgb(78,56,188)',
          },
          {
            powerful: 'rgb(78,56,188)',
          },
        ],
        nestedArray: [
          [
            {
              powerful: 'rgb(78,56,188)',
            },
            {
              powerful: 'rgb(78,56,188)',
            },
            {
              powerful: 'rgb(78,56,188)',
            },
          ],
          [
            {
              powerful: 'rgb(78,56,188)',
            },
          ],
          [
            {
              powerful: 'rgb(78,56,188)',
            },
          ],
        ],
        arrayAutoTitle: [
          {
            name: 'fun',
          },
          {
            name: 'flap',
          },
          {
            name: 'Snurpie',
          },
        ],
        nestedArrayBig: [
          [
            {
              name: 'fun',
            },
          ],
        ],
        sequences: [
          {
            name: 'Countdown',
            pages: [
              {
                name: 'Countdown',
                id: 'p1',
              },
            ],
          },
          {
            name: 'Voting starts',
            pages: [
              {
                name: 'welcome',
                id: 'p1',
              },
              {
                name: 'vote!',
                id: 'p3',
              },
              {
                name: 'bye',
                id: 'p2',
              },
            ],
          },
        ],
      }}
      fields={{
        emptyArray: {
          title: 'Empty array',
          description: 'some things',
          type: 'array',
          values: objectField.ratings,
        },
        simpleArray: {
          type: 'array',
          values: {
            type: 'string',
          },
        },
        array: {
          title: 'Things',
          description: 'some things',
          type: 'array',
          values: {
            ...deepMerge(objectField.ratings, {
              properties: { isDope: { type: 'boolean' } },
            }),
          },
        },
        sequences: {
          title: 'Seqeunces',
          type: 'array',
          values: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              pages: { type: 'references' },
            },
          },
        },
        nestedArray: {
          title: 'Nested things',
          description: 'some things, nested',
          type: 'array',
          values: {
            description: 'some things',
            type: 'array',
            values: objectField.ratings,
          },
        },
        nestedArrayBig: {
          title: 'Nested things large',
          description: 'some things, nested',
          type: 'array',
          values: {
            description: 'some things',
            type: 'array',
            values: objectField.object,
          },
        },
        arrayAutoTitle: {
          title: 'Auto title',
          description: 'some things',
          type: 'array',
          values: objectField.object,
        },
      }}
      onChange={(values, changes, checksum, based) => {
        console.log({ values, changes, checksum, based })
      }}
    />
  )
}
`},{ id: "f12164388818727", story: f12164388818727, path: "/Users/jimdebeer/saulx/better-ui/src/components/Tooltip/index.stories.tsx", file: `import * as React from 'react'
import { Button, Tooltip } from '../../index.js'

const meta = {
  title: 'Atoms/Tooltip',
}
export default meta

export const Default = () => {
  return (
    <Tooltip content="This is a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  )
}
`},{ id: "f14744076215203", story: f14744076215203, path: "/Users/jimdebeer/saulx/better-ui/src/components/Video/index.stories.tsx", file: `import * as React from 'react'
import { Video } from '../../index.js'

const meta = {
  title: 'Atoms/Video',
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta

export const Default = () => {
  return (
    <Video src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" />
  )
}

export const WithCustomThumbnail = () => {
  return (
    <Video
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
      thumbnail="https://plus.unsplash.com/premium_photo-1701767501250-fda0c8f7907f?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
  )
}

export const HLS = () => {
  return <Video src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" />
}
`},{ id: "f11284618058075", story: f11284618058075, path: "/Users/jimdebeer/saulx/better-ui/src/components/Form/stories/default.stories.tsx", file: `import * as React from 'react'
import { Form, border, Modal } from '../../../index.js'
import { wait } from '@saulx/utils'

const meta = {
  title: 'Form/Default',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Modal.Provider>
        <Story />
      </Modal.Provider>
    ),
  ],
}

export default meta

const ts = \`import * as React from 'react'

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
\`

const fileUpload = async ({ value }, updateProgress) => {
  if (!value) {
    return undefined
  }
  let p = 0
  while (p < 100) {
    p += 10
    updateProgress(p)
    await wait(100)
  }
  return 'https://i.imgur.com/DRmh6S9.jpeg'
}

export const Default = () => {
  const [cnt, setCnt] = React.useState<number>(0)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCnt((cnt) => cnt + 1)
    }, 100)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Form
      checksum={cnt}
      variant="regular"
      onFileUpload={fileUpload}
      values={{
        src: 'https://i.imgur.com/t1bWmmC.jpeg',
        code: ts,
        json: JSON.stringify({ y: 1, x: 1, z: 1, someThing: 'great' }, null, 2),
        category: 'id12345',
        categoryNamed: {
          id: 'id12345',
          title: 'Mr category',
        },
        logo: {
          name: 't1bWmmC.jpeg',
          id: 'idxyz',
          src: 'https://i.imgur.com/t1bWmmC.jpeg',
        },
        number: cnt,
      }}
      fields={{
        name: {
          title: 'Name',
          type: 'string',
          description: 'A name of someone',
        },
        dope: {
          title: 'Is it dope?',
          type: 'boolean',
          description: 'Dope or nah',
        },
        number: {
          title: 'Number',
          type: 'number',
          minimum: 10,
          maximum: 10,
        },
        createdAt: {
          type: 'timestamp',
        },
        logo: {
          title: 'Logo',
          description: 'This is a logo',
          type: 'reference',
          allowedTypes: ['file'],
        },
        logoEmpty: {
          title: 'Logo empty',
          description: 'This is a logo',
          type: 'reference',
          allowedTypes: ['file'],
        },
        category: {
          title: 'Category',
          description: 'This is a category',
          type: 'reference',
          allowedTypes: ['category'],
          bidirectional: { fromField: 'flap' },
        },
        categoryNamed: {
          title: 'Category with a name',
          description: 'This is a category',
          type: 'reference',
          allowedTypes: ['category'],
          bidirectional: { fromField: 'flap' },
        },
        bgColor: {
          title: 'Background color',
          type: 'string',
          format: 'rgbColor',
        },
        options: {
          title: 'Options',
          description: 'Select some options',
          enum: ['Snurp', 'Merp', 'Dakkie', 'Lurp'],
        },
        json: {
          title: 'Some JSON',
          description: 'This is some json',
          type: 'json',
        },
        code: {
          title: 'Some Code',
          description: 'This is some Code',
          type: 'string',
          format: 'typescript',
        },
        shortnumber: {
          title: 'A short number',
          type: 'number',
          display: 'short',
          description: 'A short number',
        },
        date: {
          title: 'A date',
          type: 'timestamp',
          description: 'A timestamp',
        },
        flap: {
          title: 'Flap',
          type: 'string',
          description: 'A flap',
        },
        mutliLineText: {
          title: 'Multiline Text',
          type: 'string',
          multiline: true,
          description: 'A flap',
        },
        src: {
          title: 'Source',
          type: 'string',
          contentMediaType: '*/*',
          description: 'A src',
        },
      }}
      onChange={(values, changed, checksum, based) => {
        console.log(values, changed, checksum, based)
      }}
    />
  )
}

export const EuObserver = () => {
  return (
    <Form
      fields={{
        contributors: {
          title: 'Writers',
          description: 'Writers or people involved with the article.',
          type: 'references',
          allowedTypes: ['user'],
          bidirectional: {
            fromField: 'articles',
          },
        },
        contributorsText: {
          title: 'Contributors text',
          description:
            'Gets auto generated based on contributors, fill it in to override.',
          examples: ['Peter Teffer, graphics by Kashyap Raibagi (EDJNET)'],
          type: 'text',
        },
        headline: {
          title: 'Headline',
          description: 'Displayed on pages, also used as meta title for seo.',
          type: 'text',
        },
        publishDate: {
          title: 'Publish date',
          description: 'Any time you want the article to show on the website',
          type: 'timestamp',
        },
        archived: {
          title: 'Archived',
          description:
            'Archived articles will not show up on the website or be available outside of the cms',
          type: 'boolean',
        },
        hits: { type: 'number' }, // get a bit more going here maybe? what does this mean
        membership: { enum: ['Need membership', 'Free'] },
        location: { type: 'text' }, // or string its just city name or smth
        bio: { type: 'text', format: 'json' }, //has a href and stuff so aarich text
        tweet: { type: 'string' }, // ask if it needs translation  // 'The 2009 allocation of solar subsidies in Solvakia "was rigged," say a US cable. PM Fico denies it.',
        notes: { type: 'string' },
        abstract: { type: 'text' },
        body: { type: 'text', format: 'json' }, // will add rich text
        img: { type: 'reference' },
        caption: { type: 'text' },
      }}
    />
  )
}

export const SmallForm = () => {
  return (
    <Form
      variant="small"
      fields={{
        options: {
          title: 'Options',
          description: 'Select some options',
          enum: ['Snurp', 'Merp', 'Dakkie', 'Lurp'],
        },
      }}
      onChange={(values, changed, checksum) => {
        console.log(values, changed, checksum)
      }}
    />
  )
}

export const Bare = () => {
  return (
    <div style={{ borderRadius: 8, border: border() }}>
      <Form
        variant="bare"
        fields={{
          address: {
            title: 'Address',
            description:
              'An address similar to http://microformats.org/wiki/h-card',
            type: 'object',
            properties: {
              picture: {
                title: 'Picture',
                type: 'string',
                contentMediaType: '*/*',
              },
              postOfficeBox: {
                title: 'PO Box',
                type: 'string',
              },
              extendedAddress: {
                title: 'Address extended',
                // description: 'An address similar to flap',
                type: 'string',
              },
              streetAddress: {
                title: 'Street',
                type: 'string',
              },
              locality: {
                title: 'Locality',
                type: 'string',
              },
              region: {
                title: 'Region',
                type: 'string',
              },
              postalCode: {
                title: 'PostalCode',
                type: 'string',
              },
              countryName: {
                title: 'Country',
                type: 'string',
              },
            },
          },
        }}
        onChange={(values) => {
          console.log(values)
        }}
      />
    </div>
  )
}
`},{ id: "f12399833393765", story: f12399833393765, path: "/Users/jimdebeer/saulx/better-ui/src/components/Form/stories/object.stories.tsx", file: `import * as React from 'react'
import { Form, Modal } from '../../../index.js'
import { wait } from '@saulx/utils'
import { objectField } from './objectField.js'

const meta = {
  title: 'Form/Object',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Modal.Provider>
        <Story />
      </Modal.Provider>
    ),
  ],
}

export default meta

const ts = \`import * as React from 'react'

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
\`

const fileUpload = async ({ value }, updateProgress) => {
  if (!value) {
    return undefined
  }
  let p = 0
  while (p < 100) {
    p += 10
    updateProgress(p)
    await wait(100)
  }
  return 'https://i.imgur.com/DRmh6S9.jpeg'
}

export const Object = () => {
  return (
    <Form
      onFileUpload={fileUpload}
      variant="small"
      values={{
        ratings: {
          powerful: 'rgb(78,56,188)',
        },
        object: {
          location: {
            snurp: {
              id: 'flap',
              name: 'flap/bla/Screenshot_213123213213.png',
              src: 'https://i.imgur.com/t1bWmmC.jpeg',
            },
            doink: 'th123212',
          },
        },
        orderWithDescription: {
          code: ts,
          json: JSON.stringify(
            { y: 1, x: 1, z: 1, someThing: 'great' },
            null,
            2,
          ),
        },
      }}
      fields={objectField}
      onChange={(values) => {
        console.log(values)
      }}
    />
  )
}

export const ObjectReadOnly = () => {
  return (
    <Form
      onFileUpload={fileUpload}
      variant="small"
      values={{
        bla: {
          id: '12345',
          snurp: Date.now(),
          bla: 'https://i.imgur.com/DRmh6S9.jpeg',
        },
      }}
      fields={{
        bla: {
          readOnly: true,
          type: 'object',
          properties: {
            bla: { type: 'string', contentMediaType: 'image/*' },
            id: { title: 'Id', type: 'string', format: 'basedId' },
            snurp: { type: 'timestamp', display: 'date-time-text' },
          },
        },
      }}
    />
  )
}
`},{ id: "f10219561566831", story: f10219561566831, path: "/Users/jimdebeer/saulx/better-ui/src/components/Toast/index.stories.tsx", file: `import * as React from 'react'
import {
  Button,
  Stack,
  IconInfoFill,
  useToast,
  ToastProvider,
} from '../../index.js'

const meta = {
  title: 'Atoms/Toast',
}
export default meta

const DefaultContent = () => {
  const toast = useToast()

  return (
    <Stack direction="column" gap={8}>
      <Button
        variant="neutral"
        onClick={() => {
          toast('Toast Text')
        }}
      >
        Simple toast
      </Button>
      <Button
        variant="neutral"
        onClick={() => {
          toast({
            prefix: <IconInfoFill />,
            text: 'Toast text',
            suffix: <Button variant="neutral-link">Action</Button>,
          })
        }}
      >
        Prefix and suffix
      </Button>
      <Button
        variant="neutral"
        onClick={() => {
          toast("I'm an informative toast", 'informative')
        }}
      >
        Informative
      </Button>
      <Button
        variant="neutral"
        onClick={() => {
          toast('Warning text', 'warning')
        }}
      >
        Warning
      </Button>
      <Button
        variant="neutral"
        onClick={() => {
          toast('An error toast', 'error')
        }}
      >
        Error
      </Button>
    </Stack>
  )
}

export const Default = () => {
  return (
    <ToastProvider>
      <DefaultContent />
    </ToastProvider>
  )
}
`},{ id: "f9013842098998", story: f9013842098998, path: "/Users/jimdebeer/saulx/better-ui/src/components/Form/stories/readonly.stories.tsx", file: `import * as React from 'react'
import { Form, Modal } from '../../../index.js'
import { faker } from '@faker-js/faker'

const meta = {
  title: 'Form/ReadOnly',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Modal.Provider>
        <Story />
      </Modal.Provider>
    ),
  ],
}

export default meta

export const ReadOnly = () => {
  return (
    <Form
      values={{
        id: faker.string.uuid().slice(0, 8),
        email: faker.internet.email(),
        name: faker.person.firstName(),
        password: faker.string.alphanumeric(10),
      }}
      fields={{
        id: { type: 'string', readOnly: true },
        email: { type: 'string', readOnly: true, format: 'email' },
        name: { type: 'string', readOnly: true },
        password: { type: 'string', readOnly: true, format: 'strongPassword' },
      }}
      onChange={(values, changed, checksum, based) => {
        console.info({ values, changed, checksum, based })
      }}
    />
  )
}
`},{ id: "f12909404527880", story: f12909404527880, path: "/Users/jimdebeer/saulx/better-ui/src/components/Form/stories/references.stories.tsx", file: `import * as React from 'react'
import { Form, Modal } from '../../../index.js'
import { faker } from '@faker-js/faker'

const meta = {
  title: 'Form/References',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Modal.Provider>
        <Story />
      </Modal.Provider>
    ),
  ],
}

export default meta

const faces = new Array(50).fill(null).map(() => ({
  src: faker.image.avatar(),
  id: faker.string.uuid().slice(0, 8),
}))

const facesNames = new Array(50).fill(null).map(() => ({
  src: faker.image.avatar(),
  id: faker.string.uuid().slice(0, 8),
  description: faker.lorem.words({ min: 0, max: 10 }),
  firstName: faker.person.firstName(),
  createdAt: faker.date.recent().valueOf(),
  lastUpdated: faker.date.recent().valueOf(),
  powerTime: faker.date.recent().valueOf(),
  city: faker.location.city(),
}))

const facesLess = new Array(20).fill(null).map(() => ({
  src: faker.image.avatar(),
  id: faker.string.uuid().slice(0, 8),
  name: faker.person.firstName(),
}))

const getRandomRef = () => {
  const id = faker.string.uuid().slice(0, 8)
  const choices = [
    {
      id,
      src: faker.image.avatar(),
      name: faker.person.fullName(),
    },
    { id, title: faker.lorem.sentence(3) },
    id,
    {
      id,
      status: faker.lorem.words(1),
      title: faker.lorem.sentence(3),
      src: faker.image.avatar(),
      number: faker.number.int(10),
      name: faker.person.fullName(),
    },
    {
      id,
      src: faker.image.avatar(),
      name: faker.person.fullName(),
      status: faker.lorem.words(1),
    },
  ]
  return choices[Math.floor(Math.random() * choices.length)]
}

export const References = () => {
  const { open } = Modal.useModal()
  return (
    <Form
      values={{
        refTags: faces,
        people: facesNames,
        nonSortablePeople: facesNames.slice(0, 5),
        peopleLess: facesLess,
        refs: [
          'x211212',
          { id: '212cwcwe', name: 'my snurp' },
          {
            id: '212cwcwe',
            src: 'https://images.secretlab.co/theme/common/collab_pokemon_catalog_charizard-min.png',
          },
          { id: '212cwcwe' },
        ],
      }}
      onClickReference={async ({ path }) => {
        open(({ close }) => {
          return (
            <Modal onConfirm={() => close(getRandomRef())}>
              <Modal.Title>Go to "{path.join('/')}"</Modal.Title>
            </Modal>
          )
        })
      }}
      onSelectReference={async ({ path }) => {
        return open(({ close }) => {
          return (
            <Modal variant="large" onConfirm={() => close(getRandomRef())}>
              <Modal.Title>REFERENCE! {path.join('/')}</Modal.Title>
            </Modal>
          )
        })
      }}
      onSelectReferences={async ({ path }) => {
        return open(({ close }) => {
          const newItems: any[] = []
          const len = ~~(Math.random() * 100)
          for (let i = 0; i < len; i++) {
            newItems.push(getRandomRef())
          }
          return (
            <Modal variant="large" onConfirm={() => close(newItems)}>
              <Modal.Title>REFERENCE! {path.join('/')}</Modal.Title>
            </Modal>
          )
        })
      }}
      fields={{
        people: {
          sortable: true,
          title: 'People time',
          type: 'references',
        },
        nonSortablePeople: {
          title: 'People time (no drag)',
          type: 'references',
        },
        ref: {
          title: 'Single reference',
          type: 'reference',
          description: 'A single ref',
        },
        logo: {
          title: 'Single reference fronm file',
          type: 'reference',
          description: 'A single ref',
          allowedTypes: ['file'],
        },
        refTags: {
          title: 'Multi references',
          type: 'references',
          sortable: true,
          description: 'Multi ref',
        },
        peopleLess: {
          title: 'People',
          type: 'references',
        },

        refs: {
          title: 'Multi references',
          type: 'references',
          description: 'Multi ref',
          sortable: true,
        },
        object: {
          title: 'Refs in an object',
          type: 'object',
          description: 'Some refs',
          properties: {
            ref: {
              title: 'Single reference',
              type: 'reference',
              description: 'A single ref',
            },
            refs: {
              title: 'Multi references',
              type: 'references',
              description: 'Multi ref',
            },
          },
        },
      }}
      onChange={(values, changed, checksum, based) => {
        console.info({ values, changed, checksum, based })
      }}
    />
  )
}
`},{ id: "f8217294240285", story: f8217294240285, path: "/Users/jimdebeer/saulx/better-ui/src/components/Form/stories/record.stories.tsx", file: `import * as React from 'react'
import { Form, Modal } from '../../../index.js'

const meta = {
  title: 'Form/Record',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Modal.Provider>
        <Story />
      </Modal.Provider>
    ),
  ],
}

export default meta

export const Record = () => {
  return (
    <Form
      variant="small"
      values={{
        record: {
          flap: 'flap',
          snurp: 'derp',
        },
        ratings: {
          powerful: 'rgb(78,56,188)',
        },
        recordObject: {
          flap: { price: 200 },
          flup: { price: 50 },
        },
        recordObjectBig: {
          big: {},
          blap: {},
        },
      }}
      fields={{
        record: {
          title: 'Fun record',
          type: 'record',
          values: {
            type: 'string',
          },
        },
        recordMultiline: {
          title: 'Multiline record',
          type: 'record',
          values: {
            type: 'string',
            multiline: true,
          },
        },
        recordObject: {
          title: 'Nested record',
          type: 'record',
          values: {
            title: 'Ratings',
            description: 'Rating of things',
            type: 'object',
            properties: {
              price: { type: 'number', title: 'Price' },
              quality: { type: 'string', title: 'Quality' },
              time: { type: 'timestamp', title: 'Time' },
              powerful: {
                type: 'string',
                title: 'Power Level',
                format: 'rgbColor',
              },
            },
          },
        },
        recordObjectBig: {
          title: 'Nested big record',
          type: 'record',
          values: {
            title: 'Restaurant',
            description: 'Restaurant of the form',
            type: 'object',
            properties: {
              name: { type: 'string', title: 'Name' },
              isItDope: {
                title: 'Dopeness',
                type: 'boolean',
              },
              bla: {
                type: 'reference',
                bidirectional: {
                  fromField: 'bla',
                },
                title: 'Bla',
                allowedTypes: ['root'],
              },
              contact: {
                title: 'Contact',
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  phone: { type: 'string', format: 'mobilePhone' },
                  email: { type: 'string', format: 'email' },
                  picture: { type: 'string', contentMediaType: '*/*' },
                },
              },
            },
          },
        },
      }}
      onChange={(values, changed, checksum, based) => {
        console.log({
          values,
          changed,
          checksum,
          based,
        })
      }}
    />
  )
}
`},{ id: "f11010240342713", story: f11010240342713, path: "/Users/jimdebeer/saulx/better-ui/src/components/Form/stories/referencesSchema.stories.tsx", file: `import * as React from 'react'
import { Form, Modal } from '../../../index.js'
import { faker } from '@faker-js/faker'

const meta = {
  title: 'Form/ReferencesSchema',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Modal.Provider>
        <Story />
      </Modal.Provider>
    ),
  ],
}

export default meta

const people = new Array(10).fill(null).map(() => ({
  avatar: {
    src: faker.image.avatar(),
    name: faker.word.adverb(),
    id: faker.string.uuid().slice(0, 8),
  },
  category: {
    id: faker.string.uuid().slice(0, 8),
    name: 'Category ' + faker.word.adverb(),
    logo: {
      src: faker.image.avatar(),
      name: faker.word.adverb(),
      id: faker.string.uuid().slice(0, 8),
    },
  },
  name: faker.person.firstName(),
  id: faker.string.uuid().slice(0, 8),
  password: faker.string.alphanumeric(10),
  email: faker.internet.email(),
}))

export const ReferencesFullSchema = () => {
  return (
    <Form
      values={{
        people,
      }}
      fields={{
        people: {
          sortable: true,
          title: 'People time',
          type: 'references',
          allowedTypes: ['person', 'user'],
        },
      }}
      schema={{
        types: {
          person: {
            fields: {
              name: { type: 'string' },
              avatar: { type: 'reference', allowedTypes: ['file'] },
              category: { type: 'reference', allowedTypes: ['category'] },
            },
          },
          user: {
            fields: {
              name: { type: 'string' },
              avatar: { type: 'reference', allowedTypes: ['file'] },
              email: { type: 'string', format: 'email' },
              password: { type: 'string', format: 'strongPassword' },
            },
          },
          file: {
            fields: {
              mimeType: { type: 'string' },
              name: { type: 'string' },
              src: { type: 'string', contentMediaType: '*/*' },
            },
          },
          category: {
            fields: {
              name: { type: 'string' },
              logo: { type: 'reference', allowedTypes: ['file'] },
            },
          },
        },
      }}
      onChange={(values, changed, checksum, based) => {
        console.info({ values, changed, checksum, based })
      }}
    />
  )
}

export const ReferencesFullSchemaEditable = () => {
  return (
    <Form
      editableReferences
      values={{
        people,
      }}
      fields={{
        people: {
          sortable: true,
          title: 'People time',
          type: 'references',
          allowedTypes: ['person'],
        },
      }}
      schema={{
        types: {
          person: {
            fields: {
              name: { type: 'string' },
              avatar: { type: 'reference', allowedTypes: ['file'] },
              category: { type: 'reference', allowedTypes: ['category'] },
            },
          },
          file: {
            fields: {
              mimeType: { type: 'string' },
              name: { type: 'string' },
              src: { type: 'string', contentMediaType: '*/*' },
            },
          },
          category: {
            fields: {
              name: { type: 'string' },
              logo: { type: 'reference', allowedTypes: ['file'] },
            },
          },
        },
      }}
      onChange={(values, changed, checksum, based) => {
        console.info({ values, changed, checksum, based })
      }}
    />
  )
}
`},{ id: "f7234131307474", story: f7234131307474, path: "/Users/jimdebeer/saulx/better-ui/src/components/Form/stories/set.stories.tsx", file: `import * as React from 'react'
import { Form, Modal } from '../../../index.js'

const meta = {
  title: 'Form/Set',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Modal.Provider>
        <Story />
      </Modal.Provider>
    ),
  ],
}

export default meta

export const Set = () => {
  return (
    <Form
      values={{
        set: ['a', 'b', 'c'],
        setNumber: [
          1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ],
        object: {
          a: ['a', 'b', 'c'],
          b: [
            1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          ],
        },
      }}
      fields={{
        set: {
          title: 'Set',
          type: 'set',
          description: 'A set with strings',
          items: { type: 'string' },
        },
        setNumber: {
          title: 'Set Numbers',
          type: 'set',
          description: 'A set with numbers',
          items: { type: 'number' },
        },
        object: {
          title: 'Set in an object',
          type: 'object',
          description: 'A set with numbers',
          properties: {
            a: {
              title: 'Set',
              type: 'set',
              description: 'A set with strings',
              items: { type: 'string' },
            },
            b: {
              title: 'Set Numbers',
              type: 'set',
              description: 'A set with numbers',
              items: { type: 'number' },
            },
            c: {
              title: 'Set Numbers',
              type: 'set',
              description: 'A set with numbers',
              items: { type: 'number' },
            },
          },
        },
      }}
      onChange={(values, changed, checksum) => {
        console.log({ values, changed, checksum })
      }}
    />
  )
}
`}]