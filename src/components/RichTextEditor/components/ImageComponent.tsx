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
import React, { useCallback, useEffect, useRef } from 'react'
import { styled } from 'inlines'
// import { ImageUploadModal } from './ImageUploadModal'
import { BLUR_COMMAND, COMMAND_PRIORITY_EDITOR } from 'lexical'
import { $isImageNode } from '../nodes/ImageNode.js'
import { IconDelete, IconEdit } from '../../Icons/index.js'
import { Button, color } from '../../../index.js'
import { AddImageModal } from './AddImageModal.js'
import { Text } from '../../../index.js'

export function ImageComponent({
  src,
  caption,
  nodeKey,
}: {
  src?: string
  caption?: string
  nodeKey: string
}) {
  const [editor] = useLexicalComposerContext()
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey)
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
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        border: `2px solid ${
          isSelected ? color('interactive', 'primary') : 'transparent'
        }`,
        '& > * + *': {
          marginTop: '8px',
        },
        '&:hover .overlay': {
          display: 'flex',
        },
      }}
    >
      <styled.img
        src={src}
        alt=""
        style={{
          display: 'block',
          margin: '0 auto',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <Text color="secondary" style={{ marginTop: 6 }}>
        {caption}
      </Text>
      <styled.div
        className="overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'none',
          margin: 0,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(4px)',
          '& > * + *': {
            marginTop: '12px',
          },
        }}
      >
        <AddImageModal
          mode="edit"
          defaultCaption={caption}
          onSave={(val) => {
            editor.update(() => {
              const node = $getNodeByKey(nodeKey)
              if ($isImageNode(node)) {
                const writable = node.getWritable()
                if (val.file) {
                  writable.__src = val.file.src
                }
                writable.__caption = val.caption
              }
            })
          }}
        >
          <Button prefix={<IconEdit />}>Edit image</Button>
        </AddImageModal>
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
          Delete image
        </Button>
      </styled.div>
    </styled.div>
  )
}
