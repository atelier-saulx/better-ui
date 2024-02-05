import { hash, hashObjectIgnoreKeyOrder } from '@saulx/hash'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
export const StateContext = createContext({ map: new Map() })
export const StateProvider = ({ children, values, onChange }) => {
  const ctxValue = useMemo(() => {
    const ctxVal = {
      map: new Map(),
      notDefault: true,
      onChange,
    }
    return ctxVal
  }, [])
  useEffect(() => {
    for (const key in values) {
      let v = ctxValue.map.get(key)
      if (!v) {
        v = {
          version: 0,
          listeners: new Set(),
        }
        ctxValue.map.set(key, v)
      }
      v.value = values[key]
      const n = hash(v.value ?? 0)
      if (n !== v.version) {
        v.version = n
        v.listeners.forEach((u) => u(n))
      }
    }
  }, [ctxValue, values ? hashObjectIgnoreKeyOrder(values) : 0])
  ctxValue.onChange = onChange
  return React.createElement(
    StateContext.Provider,
    { value: ctxValue },
    children,
  )
}
export const useContextState = (key, initialValue) => {
  const values = useContext(StateContext)
  if (!values.map.has(key)) {
    values.map.set(key, {
      version: 0,
      listeners: new Set(),
    })
  }
  const v = values.map.get(key)
  const [, update] = useState(v.version)
  useEffect(() => {
    v.listeners.add(update)
    return () => {
      v.listeners.delete(update)
    }
  }, [])
  return [
    v.value ?? initialValue,
    (value) => {
      v.value = value
      const n = hash(v.value ?? 0)
      if (n !== v.version) {
        v.listeners.forEach((u) => u(n))
        // @ts-ignore
        if (values.onChange) {
          // @ts-ignore
          values.onChange(key, value)
        }
      }
    },
  ]
}
//# sourceMappingURL=index.js.map
