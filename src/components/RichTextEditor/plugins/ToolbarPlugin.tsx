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
  const [isStrikeThrough, setIsStrikeThrough] = useState(false)
  const [isLink, setIsLink] = useState(false)

  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [fontColor, setFontColor] = useState(color('content', 'primary'))
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
      console.log('hellow??')
      editor.update(
        () => {
          console.log('SELECTION0', selection)

          if (selection !== null) {
            $patchStyleText(selection as any, styles)
          }
        },
        skipHistoryStack ? { tag: 'historic' } : {},
      )
    },
    [editor],
  )

  const testColor = (styles) =>
    useCallback(
      (styles) => {
        console.log('halloa?')
        $patchStyleText(fontSelection as any, styles)
      },
      [fontSelection],
    )

  return (
    <styled.div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 48,
        '& > * + *': {
          marginLeft: '4px',
        },
      }}
    >
      <Dropdown.Root>
        <Dropdown.Trigger>
          <Button
            size="small"
            shape="square"
            variant="neutral"
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
        variant={isBold ? 'primary' : 'neutral'}
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
        variant={isItalic ? 'primary' : 'neutral'}
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
        variant={isStrikeThrough ? 'primary' : 'neutral'}
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
        variant={isLink ? 'primary' : 'neutral'}
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
        variant={type === 'bullet' ? 'primary' : 'neutral'}
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
          variant="neutral"
          prefix={<IconImage />}
        />
      </AddImageModal>
      <Button
        size="small"
        variant={'neutral'}
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
        variant={'neutral'}
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
        variant={'neutral'}
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
      <FontColorModal
        onSave={(v) => {
          editor.update(() => {
            // console.log('onsave lefut', file, caption)

            //            $patchStyleText(fontSelection as any, { color: 'red' })

            // const selection = fontSelection

            // applyStyleText({ color: 'red' }, selection, true)

            testColor({ color: 'red' })

            // editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
            //   src: file.src,
            //   caption,
            // })
          })
        }}
      >
        <Button
          size="small"
          variant={'neutral'}
          prefix={
            <IconText
              style={{ borderBottom: '4px solid orange', paddingBottom: 4 }}
            />
          }
          shape="square"
          onClick={() => {
            editor.update(() => {
              const selection = $getSelection()
              setFontSelection(selection as any)
              console.log('BOOM BOOM')
              applyStyleText({ color: 'red' }, selection, true)
              // testColor({ color: 'red' })
              //    $patchStyleText(fontSelection as any, { color: 'orange' })
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
          variant={'neutral'}
          prefix={<IconRepeat />}
          shape="square"
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, null)
          }}
        />
        <Button
          size="small"
          disabled={!canRedo}
          variant={'neutral'}
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
