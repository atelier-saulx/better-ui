import * as React from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js'

export type AutoFocusPluginProps = {
  autoFocus?: boolean
}

export function AutoFocusPlugin({ autoFocus }: AutoFocusPluginProps) {
  const [editor] = useLexicalComposerContext()

  React.useEffect(() => {
    if (autoFocus && editor) {
      editor.focus()
    }
  }, [])

  return null
}
