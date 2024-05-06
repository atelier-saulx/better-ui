import * as React from 'react'

export const useWindowResize =
  typeof window === 'undefined'
    ? () => null
    : (update: () => void) => {
        return React.useEffect(() => {
          let t
          const list = () => {
            clearTimeout(t)
            t = setTimeout(() => {
              update()
            }, 100)
          }
          window.addEventListener('resize', list)
          return () => {
            clearTimeout(t)
            window.removeEventListener('resize', list)
          }
        }, [])
      }
