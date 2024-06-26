import * as React from 'react'

export const useSize =
  typeof window === 'undefined'
    ? () => null
    : (onSizeChange: (rect: DOMRect, elem: HTMLElement) => void) => {
        const elem = React.useRef<HTMLElement | null>(null)
        const sizeRef = React.useRef({
          onSizeChange,
        })

        sizeRef.current.onSizeChange = onSizeChange

        const observer = React.useMemo(() => {
          return new ResizeObserver((entries) => {
            const rect = entries[0].target.getBoundingClientRect()
            sizeRef.current.onSizeChange(rect, elem.current)
          })
        }, [])

        const ref = React.useCallback(
          (node: HTMLElement | null) => {
            if (elem.current === null) {
              elem.current = node
              observer.observe(node)
            } else {
              observer.unobserve(elem.current)
              elem.current = null
            }
          },
          [observer],
        )

        return ref
      }
