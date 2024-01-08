import * as React from 'react'

type UseControllableStateParams<T> = {
  value?: T | undefined
  defaultValue?: T | undefined
  onChange?: (state: T) => void
  checksum?: number // this controlls change from outside with a checksum
}

export function useControllableState<T>({
  value,
  onChange = () => {},
  checksum,
  defaultValue,
}: UseControllableStateParams<T>) {
  const ref = React.useRef<{
    value?: T
    onChange?: typeof onChange
    checksum?: number
  }>({
    value,
    checksum,
  })
  ref.current.onChange = onChange

  const [newValue, setNewValue] = React.useState<T>(value ?? defaultValue)

  const update = React.useCallback((str: T) => {
    ref.current.onChange(str)
    setNewValue(str)
  }, [])

  if (checksum !== undefined) {
    React.useEffect(() => {
      if (checksum !== ref.current.checksum) {
        setNewValue(value === undefined && defaultValue ? defaultValue : value)
        ref.current.value = value
        ref.current.checksum = checksum
      }
    }, [checksum, defaultValue])
  } else {
    React.useEffect(() => {
      if (value !== ref.current.value) {
        setNewValue(value === undefined && defaultValue ? defaultValue : value)
        ref.current.value = value
      }
    }, [value, defaultValue])
  }

  return [newValue ?? ref.current.value, update] as const
}
