import { hashObjectIgnoreKeyOrder } from '@saulx/hash'

type Chars = { [key: string]: number }

type FontStyle = {
  fontSize: number
  fontFamily: string
  letterSpacing?: string
  lineHeight?: string | number
  fontWeight?: number | string
}

const memoizeMap: Map<number, Chars> = new Map()

const drawChar = (
  char: string,
  { fontFamily, fontSize, fontWeight, letterSpacing }: FontStyle
): number => {
  if (typeof window !== 'undefined') {
    const ctx = document.createElement('canvas').getContext('2d')
    if (letterSpacing) {
      // @ts-ignore
      ctx.letterSpacing = letterSpacing
    }
    ctx.font = `normal normal ${fontWeight} ${fontSize}px ${fontFamily}`
    return ctx.measureText(char).width
  } else {
    return fontSize
  }
}

const getCharWidth = (char: string, fontStyle: FontStyle): number => {
  const key = hashObjectIgnoreKeyOrder(fontStyle)
  let chars = memoizeMap.get(key)
  if (!chars) {
    chars = {}
    memoizeMap.set(key, chars)
  }
  let width = chars[char]
  if (width === undefined) {
    width = chars[char] = drawChar(char, fontStyle)
  }
  return width
}

export const getStringWidth = (str: string, fontStyle: FontStyle): number => {
  let nr = 0
  for (const char of str) {
    nr += getCharWidth(char, fontStyle)
  }
  return nr
}
