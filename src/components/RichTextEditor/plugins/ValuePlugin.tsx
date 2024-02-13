import * as React from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin.js'
import { $generateHtmlFromNodes } from '@lexical/html'

export type ValuePluginProps = {
  defaultValue?: string
  onChange?: ({ json, html }: { json: string; html: string }) => void
}

export function ValuePlugin({ defaultValue, onChange }: ValuePluginProps) {
  const [editor] = useLexicalComposerContext()
  const [isFirstRender, setIsFirstRender] = React.useState(true)

  React.useEffect(() => {
    if (defaultValue && isFirstRender && editor) {
      setIsFirstRender(false)
      editor.update(() => {
        editor.setEditorState(editor.parseEditorState(JSON.parse(defaultValue)))
      })
    }
  }, [isFirstRender, defaultValue, editor])

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          onChange?.({
            json: JSON.stringify(editorState.toJSON()),
            html: $generateHtmlFromNodes(editor, null),
          })
        })
      }}
    />
  )
}
