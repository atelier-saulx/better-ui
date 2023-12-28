import * as React from 'react'
import { useIsMobile } from '../../index.js'

type Char =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '`'
  | '§'
  | ','
  | '.'
  | '/'
  | ';'
  | "'"
  | '\\'
  | '['
  | ']'
  | '-'
  | '='

type InputKey =
  | 'Enter'
  | 'Esc'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Tab'
  | Char

type Key =
  | InputKey
  | `${ModKeys}+${InputKey}`
  | DoubleMod<'Cmd'>
  | DoubleMod<'Alt'>
  | DoubleMod<'Shift'>

type ModKeys = `Cmd` | `Alt` | `Shift`

type DoubleMod<M extends ModKeys> = `${M}+${Exclude<ModKeys, M>}+${InputKey}`

export type KeyboardShortcutProps = {
  shortcut: Key
}

export function KeyboardShortcut({ shortcut }: KeyboardShortcutProps) {
  const isMobile = useIsMobile()
  const [isMac, setIsMac] = React.useState<boolean | null>(null)

  React.useLayoutEffect(() => {
    setIsMac(
      /(macintosh|macintel|macppc|mac68k|macos)/i.test(navigator.userAgent)
    )
  }, [shortcut])

  const content = React.useMemo(() => {
    if (isMobile) return null

    if (shortcut.includes('Cmd')) {
      return isMac
        ? shortcut.replace('Cmd', '⌘')
        : shortcut.replace('Cmd', 'Ctrl')
    }

    return shortcut
  }, [isMobile, isMac, shortcut])

  if (isMobile) return null

  return <span style={{ font: 'inherit', color: 'inherit' }}>{content}</span>
}
