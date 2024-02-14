import React, { createContext } from 'react'
import useLocalStorage, { getLocalStorage } from '@based/use-local-storage'

const K = 'based:language'

export const useLanguage = () => useLocalStorage(K, 'en')

const code = getLocalStorage(K) || 'en'
const defaultOptions = [code]

export const LanguageCtx = createContext({
  code,
  options: defaultOptions,
  setLanguage: () => {},
})

export const LanguageProvider = ({ children, options = defaultOptions }) => {
  const [code, setLanguage] = useLanguage()
  return (
    <LanguageCtx.Provider
      value={{
        code,
        options,
        setLanguage,
      }}
    >
      {children}
    </LanguageCtx.Provider>
  )
}
