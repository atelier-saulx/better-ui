import * as React from 'react'

export const useWindowResize =
  typeof window === 'undefined'
    ? () => null
    : (update: () => void) => {
        return React.useEffect(() => {
          const list = () => {
            update()
          }
          window.addEventListener('resize', list)
          return () => {
            window.removeEventListener('resize', list)
          }
        }, [])
      }
