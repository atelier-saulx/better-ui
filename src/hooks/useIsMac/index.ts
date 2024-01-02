import * as React from 'react'

export function useIsMac() {
  const [isMac, setIsMac] = React.useState<boolean | null>(null)

  React.useLayoutEffect(() => {
    setIsMac(
      /(macintosh|macintel|macppc|mac68k|macos)/i.test(navigator.userAgent)
    )
  }, [])

  return isMac
}
