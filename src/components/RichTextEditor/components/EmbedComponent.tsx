import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection.js'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js'
import { mergeRegister } from '@lexical/utils'
import {
  $getNodeByKey,
  $getSelection,
  $isDecoratorNode,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
} from 'lexical'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { styled } from 'inlines'
import { BLUR_COMMAND, COMMAND_PRIORITY_EDITOR } from 'lexical'
import { $isEmbedNode } from '../nodes/EmbedNode.js'
import { IconDelete, IconEdit } from '../../Icons/index.js'
import { Button, color, border, boxShadow, Stack } from '../../../index.js'
import { AddEmbedModal } from './AddEmbedModal.js'

export function EmbedComponent({
  html,
  nodeKey,
}: {
  html: string
  nodeKey: string
}) {
  const [editor] = useLexicalComposerContext()
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey)
  const [hover, setHover] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const onDelete = useCallback(
    (event: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        event.preventDefault()
        const node = $getNodeByKey(nodeKey)
        if ($isDecoratorNode(node)) {
          node.remove()
        }
      }

      return false
    },
    [isSelected, nodeKey],
  )

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (event) => {
          if (
            event.target === ref.current ||
            ref.current?.contains(event.target as Node)
          ) {
            clearSelection()
            setSelected(true)
            return true
          }

          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        BLUR_COMMAND,
        () => {
          clearSelection()
          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    )
  }, [clearSelection, editor, isSelected, nodeKey, onDelete, setSelected])

  return (
    <styled.div
      style={{ marginBottom: 12 }}
      // onMouseOver={() => setHover(true)}
      // onMouseLeave={() => setHover(false)}
    >
      <styled.div
        ref={ref}
        // key={nodeKey}
        style={{
          border: border(),
          boxShadow: boxShadow(),
          borderRadius: 4,
          width: 'fit-content',
          padding: 16,
          backgroundColor: color('background', 'muted'),

          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {hover && (
        <Stack gap={12} style={{ marginTop: '-12px' }} justify="center">
          <Button
            variant="error"
            prefix={<IconDelete />}
            onClick={() => {
              editor.update(() => {
                const node = $getNodeByKey(nodeKey)
                node.remove()
              })
            }}
          >
            Delete Embed
          </Button>
          <AddEmbedModal
            onSave={async (v) => {
              await v

              console.log('V for vedetta', v)

              editor.update(() => {
                const node = $getNodeByKey(nodeKey)

                if ($isEmbedNode(node)) {
                  const writable = node.getWritable()
                  if (v) {
                    writable.__html = v
                  }
                }
              })
            }}
          >
            <Button prefix={<IconEdit />}>Edit</Button>
          </AddEmbedModal>
        </Stack>
      )}
    </styled.div>
  )
}
