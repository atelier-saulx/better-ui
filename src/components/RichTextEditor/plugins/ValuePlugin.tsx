import * as React from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js'
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import {
  $createParagraphNode,
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
  const focusedRef = React.useRef(false)

  React.useEffect(() => {
    if (focusedRef.current) {
      return
    }

    editor.update(() => {
      const parser = new DOMParser()
      const dom = parser.parseFromString(value, 'text/html')
      const nodes = $generateNodesFromDOM(editor, dom)
      const root = $getRoot()
      root.clear()

      if (value) {
        root.append(...nodes)
      } else {
        root.append($createParagraphNode())
      }
      $setSelection(null)
    })
  }, [value, editor])

  React.useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        BLUR_COMMAND,
        () => {
          focusedRef.current = false
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        FOCUS_COMMAND,
        () => {
          focusedRef.current = true
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
            prevEditorState.isEmpty() ||
            !focusedRef.current
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
