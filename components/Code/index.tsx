import React, { FC, Dispatch, SetStateAction, ReactNode, useState } from 'react'
import Editor from './ReactSimpleEditor'
import { IconCopy } from '../Icons'
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
import './syntax.css'

import { Style, styled } from 'inlines'
import { Color, border, color as getColor } from '../../utils/colors'
import { useControllableState } from '../../utils/hooks/useControllableState'
import { useCopyToClipboard } from '../../utils/hooks/useCopyToClipboard'
import { Button } from '../Button'

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
  onChange?: ((value: string) => void) | Dispatch<SetStateAction<string>>
  variant?: 'regular' | 'small' // border
}

export const Code: FC<CodeProps> = ({
  value: valueProp,
  placeholder = '',
  onChange: onChangeProp,
  style,
  header,
  variant,
  color = 'muted',
  copy,
  language = 'js',
}) => {
  const [isFocus, setFocus] = useState(false)
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: placeholder,
    onChange: onChangeProp,
  })
  const [, copyIt] = useCopyToClipboard(value ?? '')
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
        border: isFocus ? border('focus', 1) : isSmall ? undefined : border(),
        boxShadow: isFocus
          ? '0 0 0 2px color-mix(in srgb, var(--interactive-primary) 20%, transparent)'
          : undefined,
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

      {/* @ts-ignore */}
      <Editor
        //@ts-ignore
        value={value}
        onValueChange={(v) => setValue(v)}
        highlight={(code) => {
          try {
            const selectLang =
              language === 'typescript' ||
              language === 'javascript' ||
              language === 'code'
                ? 'js'
                : language
            // @ts-ignore
            const h = highlight(code, languages[selectLang])
            return h
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
          margin: isSmall ? 16 : 24,
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
            top: 16,
            right: 16,
            color: contentColor,
          }}
        >
          <IconCopy style={{ width: 18, height: 18 }} />
        </Button>
      ) : null}
    </styled.div>
  )
}
