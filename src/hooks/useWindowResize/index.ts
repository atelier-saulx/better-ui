import * as React from 'react'

export const useWindowResize =
  typeof window === 'undefined'
    ? () => null
    : (update: () => void) => {
        return React.useEffect(() => {
          const list = () => {}
          global.addEventListener('resize', list)
          return () => {
            global.removeEventListener('resize', list)
          }
        }, [])
      }
