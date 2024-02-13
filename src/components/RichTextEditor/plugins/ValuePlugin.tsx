import * as React from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin.js'
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import { $getRoot, $insertNodes } from 'lexical'

export type ValuePluginProps = {
  defaultValue?: string
  onChange?: ({ json, html }: { json: string; html: string }) => void
}

// TODO make default value pick between JSON and HTML correctly

export function ValuePlugin({ defaultValue, onChange }: ValuePluginProps) {
  const [editor] = useLexicalComposerContext()
  const [isFirstRender, setIsFirstRender] = React.useState(true)

  React.useEffect(() => {
    if (defaultValue && isFirstRender && editor) {
      setIsFirstRender(false)
      editor.update(() => {
        const parser = new DOMParser()
        const dom = parser.parseFromString(defaultValue, 'text/html')
        const nodes = $generateNodesFromDOM(editor, dom)

        $getRoot().select()
        $insertNodes(nodes)

        // TODO this is for json, above the rest is for HTML
        // editor.setEditorState(editor.parseEditorState(JSON.parse(defaultValue)))
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
