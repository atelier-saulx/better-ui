import * as React from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js'
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import {
  $getRoot,
  $setSelection,
  BLUR_COMMAND,
  COMMAND_PRIORITY_LOW,
  FOCUS_COMMAND,
} from 'lexical'
import { mergeRegister } from '@lexical/utils'

export type ValuePluginProps = {
  value?: string
  onChange?: (html: string) => void
}

export function ValuePlugin({ value, onChange }: ValuePluginProps) {
  const [editor] = useLexicalComposerContext()
  const [focused, setFocused] = React.useState(false)

  React.useEffect(() => {
    if (focused) return

    editor.update(() => {
      const parser = new DOMParser()
      const dom = parser.parseFromString(value, 'text/html')
      const nodes = $generateNodesFromDOM(editor, dom)
      const root = $getRoot()
      root.clear()
      root.append(...nodes)
      $setSelection(null)
    })
  }, [value, editor])

  React.useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        BLUR_COMMAND,
        () => {
          setFocused(false)
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        FOCUS_COMMAND,
        () => {
          setFocused(true)
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerUpdateListener(
        ({
          editorState,
          dirtyElements,
          dirtyLeaves,
          prevEditorState,
          tags,
        }) => {
          if (
            (dirtyElements.size === 0 && dirtyLeaves.size === 0) ||
            tags.has('history-merge') ||
            prevEditorState.isEmpty()
          ) {
            return
          }

          editorState.read(() => {
            onChange?.($generateHtmlFromNodes(editor, null))
          })
        },
      ),
    )
  }, [])

  return null
}
