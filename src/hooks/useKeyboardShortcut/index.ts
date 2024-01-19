import * as React from 'react'
import { Key, useIsMac } from '../../index.js'

export function useKeyboardShortcut(key?: Key, handler?: () => void) {
  const isMac = useIsMac()

  const handleEvent = React.useCallback(
    (e: KeyboardEvent) => {
      if (!key || !handler) return

      const eventKey = e.key.toLocaleLowerCase()
      const p = key
        .toLocaleLowerCase()
        .split('+')
        .map((e) => (e === 'esc' ? 'escape' : e))
      const modKeys = {
        cmd: isMac ? e.metaKey : e.ctrlKey,
        alt: e.altKey,
        shift: e.shiftKey,
      }

      if (
        (p.length === 1 && eventKey === p[0]) ||
        (p.length === 2 && modKeys[p[0]] && eventKey === p[1]) ||
        (p.length === 3 && modKeys[p[0]] && modKeys[p[1]] && eventKey === p[2])
      ) {
        e.preventDefault()
        e.stopPropagation()
        handler()
      }
    },
    [key, handler, isMac],
  )

  React.useEffect(() => {
    if (!key || !handler) return

    global.addEventListener('keydown', handleEvent)

    return () => {
      global.removeEventListener('keydown', handleEvent)
    }
  }, [key, handler, isMac])
}
