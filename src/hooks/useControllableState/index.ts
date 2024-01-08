import * as React from 'react'

type UseControllableStateParams<T> = {
  value?: T | undefined
  defaultValue?: T | undefined
  onChange?: (state: T) => void
  checksum?: number // this controlls change from outside with a checksum
  prop?: boolean | any
  defaultProp?: boolean
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
    newValue?: T
  }>({
    value,
    checksum,
  })
  ref.current.onChange = onChange

  const [newValue, setNewValue] = React.useState<T>(value ?? defaultValue)

  ref.current.newValue = newValue

  const update: (v: T | ((v: T) => T)) => T = React.useCallback(
    (v: T | ((v: T) => T)) => {
      // TODO: if object make it into a checksum to check for change
      if (typeof v === 'function') {
        // @ts-ignore too hard to understand 🧠
        const n = v(ref.current.newValue)
        ref.current.onChange?.(n)
        return n
      }
      ref.current.onChange?.(v)
      setNewValue(v)
      return v
    },
    []
  )

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
