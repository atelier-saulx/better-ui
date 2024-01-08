import React, { ReactNode, useState } from 'react'
import { Style, styled } from 'inlines'

import {
  Button,
  IconCopy,
  Color,
  border,
  color as getColor,
  useControllableState,
  useCopyToClipboard,
  boxShadow,
} from '../../index.js'

import Editor from './ReactSimpleEditor.js'
// @ts-ignore
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-jsx.min'
import 'prismjs/components/prism-tsx.min'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-css'

export type CodeProps = {
  value?: string
  placeholder?: string
  style?: Style
  header?: ReactNode
  color?: Color['background']
  copy?: boolean
  language?:
    | 'typescript'
    | 'javascript'
    | 'html'
    | 'css'
    | 'json'
    | 'markup'
    | 'clike'
    | string
  onChange?: (value: string) => void
  variant?: 'regular' | 'small' // border
  checksum?: number
}

export const Code = ({
  value: valueProp,
  placeholder = '',
  onChange: onChangeProp,
  style,
  header,
  variant,
  color = 'muted',
  copy,
  language = 'js',
  checksum,
}: CodeProps) => {
  const [isFocus, setFocus] = useState(false)
  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue: placeholder,
    onChange: onChangeProp,
    checksum,
  })
  const [, copyIt] = useCopyToClipboard((value as string) ?? '')
  const isSmall = variant === 'small'
  const contentColor =
    color === 'inverted'
      ? getColor('content', 'inverted-muted')
      : getColor('content', 'secondary')
  return (
    <styled.div
      style={{
        width: '100%',
        position: 'relative',
        maxWidth: '100%',
        borderRadius: isSmall ? 4 : 8,
        background: color ? getColor('background', color) : null,
        overflow: 'hidden',
        border: isFocus
          ? border('focus', 1)
          : isSmall
          ? `1px solid transparent`
          : border(),
        boxShadow: isFocus ? boxShadow('focus') : undefined,
        ...style,
      }}
    >
      {header && (
        <styled.div
          style={{
            background: getColor('background', color || 'screen'),
          }}
        >
          {header}
        </styled.div>
      )}

      <Editor
        //@ts-ignore
        value={value}
        onValueChange={(v) => setValue(v)}
        highlight={(code) => {
          try {
            const selectLang =
              language === 'typescript' || language === 'javascript'
                ? 'js'
                : language

            // @ts-ignore
            return highlight(code, languages[selectLang] ?? languages.js)
          } catch (err) {}
        }}
        onFocus={
          onChangeProp
            ? () => {
                setFocus(true)
              }
            : undefined
        }
        onBlur={
          onChangeProp
            ? () => {
                setFocus(false)
              }
            : undefined
        }
        style={{
          pointerEvents: !setValue ? 'none' : 'auto',
          margin: isSmall ? 8 : 24,
          fontSize: 14,
          color: contentColor,
          fontFamily: 'Fira Code, monospace, sans-serif',
          outline: 'none !important',
        }}
      />
      {copy ? (
        <Button
          variant="icon-only"
          onClick={() => copyIt()}
          style={{
            position: 'absolute',
            top: isSmall ? 8 : 16,
            right: isSmall ? 8 : 16,
            color: contentColor,
          }}
        >
          <IconCopy style={{ width: 18, height: 18 }} />
        </Button>
      ) : null}
    </styled.div>
  )
}
