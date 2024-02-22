import * as React from 'react'

export function useIsMac() {
  const [isMac, setIsMac] = React.useState<boolean | null>(null)

  // TODO: this is not good jhust make a util you allways know it instantly

  React.useLayoutEffect(() => {
    setIsMac(
      /(macintosh|macintel|macppc|mac68k|macos)/i.test(navigator.userAgent),
    )
  }, [])

  return isMac
}
