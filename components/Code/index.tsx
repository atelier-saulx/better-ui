import React, { FC, Dispatch, SetStateAction, ReactNode } from 'react'
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
import { Color, color as getColor } from '../../utils/colors'
import { useControllableState } from '../../utils/hooks/useControllableState'
import { useCopyToClipboard } from '../../utils/hooks/useCopyToClipboard'
import { Button } from '../Button'

export type CodeProps = {
  value?: string
  defaultValue?: string
  onChange?: ((value: string) => void) | Dispatch<SetStateAction<string>>
  style?: Style
  header?: ReactNode
  color?: Color['background']
  copy?: boolean
  language?: 'js' | 'html' | 'css' | 'json' | 'markup' | 'clike' | string
  props?: any
}

export const Code: FC<CodeProps> = ({
  value: valueProp,
  defaultValue: defaultValueProp = '',
  onChange: onChangeProp,
  style,
  header,
  color,
  copy,
  language = 'js',
  ...props
}) => {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValueProp,
    onChange: onChangeProp,
  })
  const [, copyIt] = useCopyToClipboard(value ?? '')
  return (
    <styled.div
      style={{
        width: '100%',
        position: 'relative',
        maxWidth: '100%',
        borderRadius: 4,
        background: color ? getColor('background', 'muted') : null,
        overflow: 'hidden',
        ...style,
      }}
    >
      {header && (
        <div
          style={{
            background: getColor('background', color || 'screen'),
          }}
        >
          {header}
        </div>
      )}

      {/* @ts-ignore */}
      <Editor
        //@ts-ignore
        value={value}
        onValueChange={(v) => setValue(v)}
        highlight={(code) => {
          try {
            // @ts-ignore
            const h = highlight(code, languages[language])
            return h
          } catch (err) {}
        }}
        style={{
          pointerEvents: !setValue ? 'none' : 'auto',
          margin: 16,
          fontSize: 14,
          color: getColor('content', 'primary'),
          fontFamily: 'Fira Code, monospace, sans-serif',

          outline: 'none !important',
        }}
        {...props}
      />
      {copy ? (
        <Button variant="icon-only" onClick={() => copyIt()}>
          <IconCopy
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
            }}
          />
        </Button>
      ) : null}
    </styled.div>
  )
}
