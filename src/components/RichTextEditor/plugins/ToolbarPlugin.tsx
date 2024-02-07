import React, { useEffect, useState, useCallback } from 'react'
import { styled } from 'inlines'
import { ColorInput, color } from '../../../index.js'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js'
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  $createParagraphNode,
  $isParagraphNode,
  $isRootOrShadowRoot,
  $isTextNode,
} from 'lexical'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { getSelectedNode } from '../utils/index.js'
import { $findMatchingParent, $getNearestNodeOfType } from '@lexical/utils'
import {
  $isListNode,
  ListNode,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list'
import { $createHeadingNode, $isHeadingNode } from '@lexical/rich-text'
import {
  Button,
  Dropdown,
  IconCheckLarge,
  IconFormatAlignLeft,
  IconFormatAlignCenter,
  IconFormatAlignRight,
  IconFormatBold,
  IconFormatItalic,
  IconFormatUnderline,
  IconFormatStrikethrough,
  IconImage,
  IconLink,
  IconListBullet,
  IconText,
  IconRepeat,
} from '../../../index.js'
import {
  $setBlocksType,
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from '@lexical/selection'
import { AddImageModal } from '../components/AddImageModal.js'
import { INSERT_IMAGE_COMMAND } from './ImagePlugin.js'
import { FontColorModal } from '../components/FontColorModal.js'

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const [type, setType] = useState<
    'title' | 'heading' | 'subheading' | 'body' | 'bullet'
  >('body')
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikeThrough, setIsStrikeThrough] = useState(false)
  const [isLink, setIsLink] = useState(false)

  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [fontSelection, setFontSelection] = useState()

  useEffect(() => {
    console.log('🥟', fontSelection)
  }, [fontSelection])

  useEffect(() => {
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection()

        console.log(selection, '🍿')

        if (!$isRangeSelection(selection)) return

        setIsBold(selection.hasFormat('bold'))
        setIsItalic(selection.hasFormat('italic'))
        setIsStrikeThrough(selection.hasFormat('strikethrough'))
        setIsUnderline(selection.hasFormat('underline'))

        //font color
        $getSelectionStyleValueForProperty(
          selection,
          'color',
          color('content', 'primary'),
        )

        const node = getSelectedNode(selection)
        const parent = node.getParent()
        setIsLink($isLinkNode(parent) || $isLinkNode(node))

        console.log('node??', node)
        console.log('parent', parent)

        const anchorNode = selection.anchor.getNode()
        const element =
          anchorNode.getKey() === 'root'
            ? anchorNode
            : $findMatchingParent(anchorNode, (e) => {
                const parent = e.getParent()
                return parent !== null && $isRootOrShadowRoot(parent)
              })

        console.log('element', element)

        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode,
          )
          const type = parentList
            ? parentList.getListType()
            : element.getListType()

          if (type === 'bullet') {
            setType('bullet')
          }
        } else if ($isHeadingNode(element)) {
          switch (element.getTag()) {
            case 'h1': {
              setType('title')
              break
            }
            case 'h2': {
              setType('heading')
              break
            }
            case 'h3': {
              setType('subheading')
              break
            }
          }
        } else if ($isParagraphNode(element)) {
          setType('body')
        }
      })
    })
    editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload)
        return false
      },
      1,
    ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)
          return false
        },
        1,
      )
  }, [editor])

  const applyStyleText = useCallback(
    (
      styles: Record<string, string>,
      selection: any,
      skipHistoryStack?: boolean,
    ) => {
      editor.update(
        () => {
          if (selection !== null) {
            $patchStyleText(selection as any, styles)
          }
        },
        skipHistoryStack ? { tag: 'historic' } : {},
      )
    },
    [editor],
  )

  return (
    <styled.div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 48,
        // '& > * + *': {
        //   marginLeft: '5px',
        // },
        gap: 10,
      }}
    >
      <Dropdown.Root>
        <Dropdown.Trigger>
          <Button
            size="small"
            shape="square"
            variant="neutral-transparent"
            prefix={<IconText />}
          />
        </Dropdown.Trigger>
        <Dropdown.Items>
          <Dropdown.Item
            icon={type === 'title' && <IconCheckLarge />}
            onClick={() => {
              editor.update(() => {
                const selection = $getSelection()
                if ($isRangeSelection(selection)) {
                  selection.getNodes().forEach((node) => {
                    if ($isTextNode(node)) {
                      node.setFormat(0)
                    }
                  })
                  $setBlocksType(selection, () => $createHeadingNode('h1'))
                }
              })
            }}
          >
            Title
          </Dropdown.Item>
          <Dropdown.Item
            icon={type === 'heading' && <IconCheckLarge />}
            onClick={() => {
              editor.update(() => {
                const selection = $getSelection()
                if ($isRangeSelection(selection)) {
                  selection.getNodes().forEach((node) => {
                    if ($isTextNode(node)) {
                      node.setFormat(0)
                    }
                  })
                  $setBlocksType(selection, () => $createHeadingNode('h2'))
                }
              })
            }}
          >
            Heading
          </Dropdown.Item>
          <Dropdown.Item
            icon={type === 'subheading' && <IconCheckLarge />}
            onClick={() => {
              editor.update(() => {
                const selection = $getSelection()
                if ($isRangeSelection(selection)) {
                  selection.getNodes().forEach((node) => {
                    if ($isTextNode(node)) {
                      node.setFormat(0)
                    }
                  })
                  $setBlocksType(selection, () => $createHeadingNode('h3'))
                }
              })
            }}
          >
            Subheading
          </Dropdown.Item>
          <Dropdown.Item
            icon={type === 'body' && <IconCheckLarge />}
            onClick={() => {
              editor.update(() => {
                const selection = $getSelection()
                if ($isRangeSelection(selection)) {
                  selection.getNodes().forEach((node) => {
                    if ($isTextNode(node)) {
                      node.setFormat(0)
                    }
                  })
                  $setBlocksType(selection, () => $createParagraphNode())
                }
              })
            }}
          >
            Body
          </Dropdown.Item>
        </Dropdown.Items>
      </Dropdown.Root>
      <Button
        size="small"
        variant={isBold ? 'primary' : 'neutral-transparent'}
        prefix={<IconFormatBold />}
        shape="square"
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection()

            if ($isRangeSelection(selection)) {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
            }
          })
        }}
      />
      <Button
        size="small"
        variant={isItalic ? 'primary' : 'neutral-transparent'}
        prefix={<IconFormatItalic />}
        shape="square"
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection()

            if ($isRangeSelection(selection)) {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
            }
          })
        }}
      />
      <Button
        size="small"
        variant={isUnderline ? 'primary' : 'neutral-transparent'}
        prefix={<IconFormatUnderline />}
        shape="square"
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
            }
          })
        }}
      />
      <Button
        size="small"
        variant={isStrikeThrough ? 'primary' : 'neutral-transparent'}
        prefix={<IconFormatStrikethrough />}
        shape="square"
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection()

            if ($isRangeSelection(selection)) {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
            }
          })
        }}
      />
      <Button
        size="small"
        variant={isLink ? 'primary' : 'neutral-transparent'}
        prefix={<IconLink />}
        shape="square"
        onClick={() => {
          editor.update(() => {
            editor.dispatchCommand(
              TOGGLE_LINK_COMMAND,
              isLink ? null : prompt('enter url'),
            )
          })
        }}
      />
      <Button
        size="small"
        variant={type === 'bullet' ? 'primary' : 'neutral-transparent'}
        prefix={<IconListBullet />}
        shape="square"
        onClick={() => {
          editor.update(() => {
            editor.dispatchCommand(
              type === 'bullet'
                ? REMOVE_LIST_COMMAND
                : INSERT_UNORDERED_LIST_COMMAND,
              undefined,
            )
          })
        }}
      />
      <AddImageModal
        onSave={({ file, caption }) => {
          console.log('onsave lefut', file, caption)
          editor.update(() => {
            editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
              src: file.src,
              caption,
            })
          })
        }}
      >
        <Button
          shape="square"
          size="small"
          variant="neutral-transparent"
          prefix={<IconImage />}
        />
      </AddImageModal>
      <Button
        size="small"
        variant={'neutral-transparent'}
        prefix={<IconFormatAlignLeft />}
        shape="square"
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection()

            if ($isRangeSelection(selection)) {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
            }
          })
        }}
      />
      <Button
        size="small"
        variant={'neutral-transparent'}
        prefix={<IconFormatAlignCenter />}
        shape="square"
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection()

            if ($isRangeSelection(selection)) {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
            }
          })
        }}
      />
      <Button
        size="small"
        variant={'neutral-transparent'}
        prefix={<IconFormatAlignRight />}
        shape="square"
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection()

            if ($isRangeSelection(selection)) {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
            }
          })
        }}
      />

      {/* Color this text */}
      <FontColorModal
        mode="font"
        onSave={async (v) => {
          await v
          editor.update(() => {
            if (v === color('content', 'primary') || v === '#1b242c') {
              applyStyleText({ color: 'inherit' }, fontSelection, true)
            } else {
              applyStyleText({ color: v }, fontSelection, true)
            }
          })
        }}
      >
        <Button
          size="small"
          variant={'neutral-transparent'}
          prefix={
            <IconText
              style={{ borderBottom: '4px solid orange', paddingBottom: 2 }}
            />
          }
          shape="square"
          onClick={() => {
            editor.update(() => {
              const selection = $getSelection()
              setFontSelection(selection as any)
            })
          }}
        />
      </FontColorModal>
      {/* Background- Color this text */}
      <FontColorModal
        mode="background"
        onSave={async (v) => {
          await v
          editor.update(() => {
            if (v === color('background', 'screen') || v === '#fff') {
              applyStyleText(
                { 'background-color': 'inherit' },
                fontSelection,
                true,
              )
            } else {
              applyStyleText({ 'background-color': v }, fontSelection, true)
            }
          })
        }}
      >
        <Button
          size="small"
          style={{ background: 'yellow' }}
          variant={'neutral-transparent'}
          prefix={<IconText />}
          shape="square"
          onClick={() => {
            editor.update(() => {
              const selection = $getSelection()
              setFontSelection(selection as any)
            })
          }}
        />
      </FontColorModal>

      {/* <AddEmbedModal
        onSave={({ html }) => {
          editor.update(() => {
            editor.dispatchCommand(INSERT_EMBED_COMMAND, {
              html,
            })
          })
        }}
      >
        <Button size="small" color="system" icon={<IconLayerThree />} />
      </AddEmbedModal> */}

      <styled.div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
        <Button
          size="small"
          disabled={!canUndo}
          variant={'neutral-transparent'}
          prefix={<IconRepeat />}
          shape="square"
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, null)
          }}
        />
        <Button
          size="small"
          disabled={!canRedo}
          variant={'neutral-transparent'}
          prefix={<IconRepeat style={{ transform: 'scaleX(-1)' }} />}
          shape="square"
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, null)
          }}
        />
      </styled.div>
    </styled.div>
  )
}
