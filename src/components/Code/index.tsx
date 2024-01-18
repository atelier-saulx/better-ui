import React, { ReactNode, useState } from 'react'
import { Style, styled } from 'inlines'
import { formatCode } from './prettier.js'
import type { Config } from 'prettier'

import {
  Button,
  IconCopy,
  Color,
  border,
  color as getColor,
  useControllableState,
  useCopyToClipboard,
  boxShadow,
  Stack,
  IconFormatAlignLeft,
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
  prettier?: boolean | Config // prettier config
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
  prettier,
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

  const [isError, setError] = useState('')
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
        onValueChange={async (v) => {
          setValue(v)
        }}
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
            ? async () => {
                setFocus(false)

                if (prettier) {
                  setValue(
                    await formatCode(value, prettier, language, setError),
                  )
                }
              }
            : async () => {
                if (prettier) {
                  setValue(
                    await formatCode(value, prettier, language, setError),
                  )
                }
              }
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
      <styled.div
        style={{
          display: 'flex',
          flexGap: 4,
          position: 'absolute',
          top: isSmall ? 8 : 16,
          right: isSmall ? 8 : 16,
          color: isError ? 'red' : contentColor,
        }}
      >
        {prettier ? (
          <Button
            keyboardShortcut="Cmd+F"
            variant="icon-only"
            onClick={async () => {
              await setValue(
                await formatCode(value, prettier, language, setError),
              )
            }}
          >
            <IconFormatAlignLeft style={{ width: 18, height: 18 }} />
          </Button>
        ) : null}
        {copy ? (
          <Button variant="icon-only" onClick={() => copyIt()}>
            <IconCopy style={{ width: 18, height: 18 }} />
          </Button>
        ) : null}
      </styled.div>
    </styled.div>
  )
}
