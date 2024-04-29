import React from 'react'
import {
  Stack,
  Confirm,
  Button,
  IconPlus,
  Dropdown,
  useDropdown,
} from '../../index.js'
import { NewInput } from './NewInput.js'

export const AddNew = ({
  state,
  setState,
  fieldItemType,
  options,
}: {
  state: (string | number)[]
  setState: (v: any[]) => void
  fieldItemType?: 'integer' | 'number' | 'string'
  options?: number[] | string[]
}) => {
  const [addNew, setAddNew] = React.useState<boolean>(false)
  const [newValue, setNewValue] = React.useState<string | number>()
  const { open } = useDropdown()

  if (addNew) {
    return (
      <Stack>
        <NewInput
          fieldItemType={fieldItemType}
          onChange={(v) => {
            setNewValue(v)
          }}
        />
        <Confirm
          justify="start"
          variant="small"
          onConfirm={() => {
            if (!state.includes(newValue)) {
              const nValue = state ? [...state, newValue] : [newValue]
              setState(nValue)
            }
            setNewValue(undefined)
            setAddNew(false)
          }}
          onCancel={() => {
            setNewValue(undefined)
            setAddNew(false)
          }}
        />
      </Stack>
    )
  }

  return options ? (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button shape="square" variant="neutral">
          <IconPlus />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Items>
        {options.map((option, i) => (
          <Dropdown.Item
            key={i}
            onClick={() => {
              alert(`hello ${option}`)
            }}
          >
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Items>
    </Dropdown.Root>
  ) : (
    <Button
      size="small"
      onClick={() => {
        setAddNew(true)
      }}
      variant="icon-only"
      prefix={<IconPlus />}
    >
      Add
    </Button>
  )
}

const TypeSelectDropdown = ({ close, options }) => {
  return (
    <Dropdown.Items>
      {options.map((option, i) => (
        <Dropdown.Item
          key={i}
          onClick={() => {
            close(option)
          }}
        >
          {option}
        </Dropdown.Item>
      ))}
    </Dropdown.Items>
  )
}
