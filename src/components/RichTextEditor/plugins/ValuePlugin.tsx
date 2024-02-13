import * as React from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js'
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import {
  $getRoot,
  $insertNodes,
  $setSelection,
  BLUR_COMMAND,
  COMMAND_PRIORITY_LOW,
} from 'lexical'

export type ValuePluginProps = {
  value?: string
  onChange?: (html: string) => void
}

export function ValuePlugin({ value, onChange }: ValuePluginProps) {
  const [editor] = useLexicalComposerContext()

  React.useEffect(() => {
    if (value && editor) {
      editor.update(() => {
        const parser = new DOMParser()
        const dom = parser.parseFromString(value, 'text/html')
        const nodes = $generateNodesFromDOM(editor, dom)

        const root = $getRoot()
        root.clear()
        root.append(...nodes)
        $setSelection(null)
      })
    }
  }, [value, editor])

  React.useEffect(() => {
    return editor.registerCommand(
      BLUR_COMMAND,
      () => {
        console.log('editor blurred')
        onChange?.($generateHtmlFromNodes(editor, null))
        return false
      },
      COMMAND_PRIORITY_LOW,
    )
  }, [])

  return null
}
