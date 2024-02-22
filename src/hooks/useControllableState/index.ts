import * as React from 'react'

type UseControllableStateParams<T> = {
  value?: T | undefined
  defaultValue?: T | undefined
  onChange?: (state: T) => void
  checksum?: number // this controlls change from outside with a checksum
  prop?: boolean | any
  defaultProp?: boolean
}

export function useControllableState<T>(
  {
    value,
    onChange = () => {},
    checksum,
    defaultValue,
  }: UseControllableStateParams<T>,
  debounce?: number,
) {
  const ref = React.useRef<{
    value?: T
    onChange?: typeof onChange
    checksum?: number
    newValue?: T
    debounceTimer?: ReturnType<typeof setTimeout>
  }>({
    value,
    checksum,
  })
  ref.current.onChange = onChange

  const [newValue, setNewValue] = React.useState<T>(
    value === undefined ? defaultValue : value,
  )

  ref.current.newValue = newValue

  const update: (v: T | ((v: T) => T)) => T = React.useCallback(
    (v: T | ((v: T) => T)) => {
      // TODO: if object make it into a checksum to check for change
      if (typeof v === 'function') {
        // @ts-ignore too hard to understand 🧠
        const n = v(ref.current.newValue)
        if (debounce) {
          clearTimeout(ref.current.debounceTimer)
          ref.current.debounceTimer = setTimeout(() => {
            ref.current.onChange?.(n)
            ref.current.debounceTimer = null
          }, debounce)
        } else {
          ref.current.onChange?.(n)
        }
        setNewValue(n)
        return n
      }
      if (debounce) {
        clearTimeout(ref.current.debounceTimer)
        ref.current.debounceTimer = setTimeout(() => {
          ref.current.onChange?.(v)
          ref.current.debounceTimer = null
        }, debounce)
      } else {
        ref.current.onChange?.(v)
      }
      setNewValue(v)
      return v
    },
    [debounce],
  )

  if (checksum !== undefined) {
    React.useEffect(() => {
      if (!ref.current.debounceTimer) {
        if (checksum !== ref.current.checksum) {
          setNewValue(
            value === undefined && defaultValue ? defaultValue : value,
          )
          ref.current.value = value
          ref.current.checksum = checksum
        }
      }
    }, [checksum, defaultValue])
  } else {
    React.useEffect(() => {
      if (!ref.current.debounceTimer) {
        if (value !== ref.current.value) {
          setNewValue(
            value === undefined && defaultValue ? defaultValue : value,
          )
          ref.current.value = value
        }
      }
    }, [value, defaultValue])
  }

  return [
    newValue === undefined ? ref.current.value : newValue,
    update,
  ] as const
}
