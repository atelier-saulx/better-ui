import React, { useEffect, useState, useCallback } from 'react'
import { styled } from 'inlines'
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
  ElementFormatType,
  $isElementNode,
} from 'lexical'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { getSelectedNode } from '../utils/index.js'
import { $findMatchingParent, $getNearestNodeOfType } from '@lexical/utils'
import {
  $isListNode,
  ListNode,
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list'
import {
  $createHeadingNode,
  $isHeadingNode,
  $isQuoteNode,
  $createQuoteNode,
} from '@lexical/rich-text'
import {
  color,
  border,
  Button,
  Dropdown,
  IconCheckLarge,
  IconIcTextAlignLeft,
  IconIcTextAlignCenter,
  IconIcTextAlignRight,
  IconIcTextBold,
  IconIcTextColor,
  IconIcTextItalic,
  IconIcTextUnderline,
  IconIcTextStrikethrough,
  IconIcImage,
  IconIcLink,
  IconIcListBulleted,
  IconIcListNumbered,
  IconText,
  IconIcRedo,
  IconIcQuotes,
  IconChevronDown,
  IconAttachment,
  Stack,
  Tooltip,
  Text,
} from '../../../index.js'
import {
  $setBlocksType,
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from '@lexical/selection'
import { AddImageModal } from '../components/AddImageModal.js'
import { INSERT_IMAGE_COMMAND } from './ImagePlugin.js'
import { INSERT_EMBED_COMMAND } from './EmbedPlugin.js'
import { FontColorModal } from '../components/FontColorModal.js'
import { LinkModal } from '../components/LinkModal.js'
import { AddEmbedModal } from '../components/AddEmbedModal.js'

const TOOLTIP_DELAY_MS = 1200

export function ToolbarPlugin({ variant, onAddImage }) {
  const [editor] = useLexicalComposerContext()
  const [type, setType] = useState<
    | 'title'
    | 'heading'
    | 'subheading'
    | 'body'
    | 'bullet'
    | 'order'
    | 'blockquote'
  >('body')
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikeThrough, setIsStrikeThrough] = useState(false)
  const [isLink, setIsLink] = useState(false)
  const [elementFormat, setElementFormat] = useState<ElementFormatType>('left')

  const [openModal, setOpenModal] = useState<string>()

  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [fontSelection, setFontSelection] = useState()

  useEffect(() => {
    editor.registerUpdateListener(({ editorState }) => {
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

      editorState.read(() => {
        const selection = $getSelection()

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

        const anchorNode = selection.anchor.getNode()
        const element =
          anchorNode.getKey() === 'root'
            ? anchorNode
            : $findMatchingParent(anchorNode, (e) => {
                const parent = e.getParent()
                return parent !== null && $isRootOrShadowRoot(parent)
              })

        setElementFormat(element.getFormatType())

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
          } else {
            setType('order')
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
        } else if ($isQuoteNode(element)) {
          setType('blockquote')
        } else if ($isParagraphNode(element)) {
          setType('body')
        }
      })
    })
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
    <>
      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: variant === 'small' ? 32 : 43,
          backgroundColor:
            // variant === 'small'
            color('background', 'screen'),
          // : color('background', 'muted'),
          // '& > * + *': {
          //   marginLeft: '5px',
          // },
          gap: 6,
          paddingLeft: '10px',
          paddingRight: '10px',
          borderTopRightRadius: '8px',
          borderTopLeftRadius: '8px',
          border: variant === 'small' ? '0px solid' : border(),
          borderBottom: '0px solid transparent',
          '& * > svg': {
            width: variant === 'small' ? '14px' : 'inherit',
            height: variant === 'small' ? '14px' : 'inherit',
          },
        }}
      >
        <Dropdown.Root>
          <Tooltip content="Type" delay={TOOLTIP_DELAY_MS}>
            <Dropdown.Trigger>
              <Button
                size="small"
                shape="square"
                variant="primary-transparent"
                prefix={
                  <Stack gap={4}>
                    <Text
                      style={{ fontWeight: '400', textTransform: 'capitalize' }}
                    >
                      {type}
                    </Text>
                    <IconChevronDown
                      style={{
                        color: color('content', 'primary'),
                        width: 16,
                        height: 16,
                      }}
                    />
                  </Stack>
                }
              />
            </Dropdown.Trigger>
          </Tooltip>
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
        <Tooltip content="Bold" delay={TOOLTIP_DELAY_MS}>
          <Button
            size="small"
            style={{
              color: isBold
                ? color('interactive', 'primary')
                : color('content', 'primary'),
            }}
            variant={isBold ? 'primary-muted' : 'primary-transparent'}
            prefix={<IconIcTextBold />}
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
        </Tooltip>
        <Tooltip content="Italic" delay={TOOLTIP_DELAY_MS}>
          <Button
            size="small"
            style={{
              color: isItalic
                ? color('interactive', 'primary')
                : color('content', 'primary'),
            }}
            variant={isItalic ? 'primary-muted' : 'primary-transparent'}
            prefix={<IconIcTextItalic />}
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
        </Tooltip>
        <Tooltip content="Underline" delay={TOOLTIP_DELAY_MS}>
          <Button
            size="small"
            style={{
              color: isUnderline
                ? color('interactive', 'primary')
                : color('content', 'primary'),
            }}
            variant={isUnderline ? 'primary-muted' : 'primary-transparent'}
            prefix={<IconIcTextUnderline />}
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
        </Tooltip>
        <Tooltip content="Strike-through" delay={TOOLTIP_DELAY_MS}>
          <Button
            size="small"
            style={{
              color: isStrikeThrough
                ? color('interactive', 'primary')
                : color('content', 'primary'),
            }}
            variant={isStrikeThrough ? 'primary-muted' : 'primary-transparent'}
            prefix={<IconIcTextStrikethrough />}
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
        </Tooltip>

        <Tooltip content="Add Link" delay={TOOLTIP_DELAY_MS}>
          <LinkModal
            onSave={(value, targetBlank) => {
              editor.update(() => {
                editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
                  url: value,
                  target: targetBlank ? '_blank' : '_self',
                })
              })
            }}
          >
            <Button
              size="small"
              style={{
                color: isLink
                  ? color('interactive', 'primary')
                  : color('content', 'primary'),
              }}
              variant={isLink ? 'primary-muted' : 'primary-transparent'}
              prefix={<IconIcLink />}
              shape="square"
            />
          </LinkModal>
        </Tooltip>

        {/* // ALIGN Dropdown */}
        <Dropdown.Root>
          <Dropdown.Trigger>
            <Button
              shape="square"
              variant="primary-transparent"
              prefix={
                <Stack gap={4}>
                  {elementFormat === 'center' ? (
                    <IconIcTextAlignCenter
                      style={{ width: 20, color: color('content', 'primary') }}
                    />
                  ) : elementFormat === 'right' ? (
                    <IconIcTextAlignRight
                      style={{ width: 20, color: color('content', 'primary') }}
                    />
                  ) : (
                    <IconIcTextAlignLeft
                      style={{ width: 20, color: color('content', 'primary') }}
                    />
                  )}

                  <IconChevronDown
                    style={{
                      width: 16,
                      height: 16,
                      color: color('content', 'primary'),
                    }}
                  />
                </Stack>
              }
            />
          </Dropdown.Trigger>
          <Dropdown.Items>
            <Dropdown.Item
              icon={<IconIcTextAlignLeft />}
              onClick={() => {
                editor.update(() => {
                  const selection = $getSelection()
                  if ($isRangeSelection(selection)) {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
                  }
                })
              }}
            >
              {'  '}
            </Dropdown.Item>
            <Dropdown.Item
              icon={<IconIcTextAlignCenter />}
              onClick={() => {
                editor.update(() => {
                  const selection = $getSelection()
                  if ($isRangeSelection(selection)) {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
                  }
                })
              }}
            >
              {'  '}
            </Dropdown.Item>
            <Dropdown.Item
              icon={<IconIcTextAlignRight />}
              onClick={() => {
                editor.update(() => {
                  const selection = $getSelection()
                  if ($isRangeSelection(selection)) {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
                  }
                })
              }}
            >
              {'  '}
            </Dropdown.Item>
          </Dropdown.Items>
        </Dropdown.Root>

        <Tooltip content="Unordered list" delay={TOOLTIP_DELAY_MS}>
          <Button
            size="small"
            style={{
              color:
                type === 'bullet'
                  ? color('interactive', 'primary')
                  : color('content', 'primary'),
            }}
            variant={
              type === 'bullet' ? 'primary-muted' : 'primary-transparent'
            }
            prefix={<IconIcListBulleted />}
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
        </Tooltip>
        <Tooltip content="Ordered List" delay={TOOLTIP_DELAY_MS}>
          <Button
            size="small"
            style={{
              color:
                type === 'order'
                  ? color('interactive', 'primary')
                  : color('content', 'primary'),
            }}
            variant={type === 'order' ? 'primary-muted' : 'primary-transparent'}
            prefix={<IconIcListNumbered />}
            shape="square"
            onClick={() => {
              editor.update(() => {
                editor.dispatchCommand(
                  type === 'order'
                    ? REMOVE_LIST_COMMAND
                    : INSERT_ORDERED_LIST_COMMAND,
                  undefined,
                )
              })
            }}
          />
        </Tooltip>

        <Tooltip content="Embed code" delay={TOOLTIP_DELAY_MS}>
          <AddEmbedModal
            onSave={async (v) => {
              await v
              editor.update(() => {
                editor.dispatchCommand(INSERT_EMBED_COMMAND, {
                  html: v,
                })
              })
            }}
          >
            <Button
              size="small"
              style={{ color: color('content', 'primary') }}
              variant="primary-transparent"
              prefix={<IconAttachment style={{ width: 16 }} />}
              shape="square"
            />
          </AddEmbedModal>
        </Tooltip>

        <Tooltip content="Add Image" delay={TOOLTIP_DELAY_MS}>
          <Button
            shape="square"
            size="small"
            variant="primary-transparent"
            prefix={<IconIcImage />}
            style={{ color: color('content', 'primary') }}
            onClick={async () => {
              if (onAddImage) {
                const image = await onAddImage()

                editor.update(() => {
                  editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                    src: image.src,
                    caption: '',
                  })
                })

                return
              }
              setOpenModal('image')
            }}
          />
        </Tooltip>

        <Tooltip content="Quote" delay={TOOLTIP_DELAY_MS}>
          <Button
            size="small"
            style={{
              color:
                type === 'blockquote'
                  ? color('interactive', 'primary')
                  : color('content', 'primary'),
            }}
            variant={
              type === 'blockquote' ? 'primary-muted' : 'primary-transparent'
            }
            prefix={<IconIcQuotes />}
            shape="square"
            onClick={() => {
              editor.update(() => {
                const selection = $getSelection()

                $setBlocksType(selection as any, () => $createQuoteNode())
              })
            }}
          />
        </Tooltip>

        {/* Color this text */}
        <Tooltip content="Color Font" delay={TOOLTIP_DELAY_MS}>
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
              variant={'primary-transparent'}
              prefix={
                <IconIcTextColor
                  style={{
                    color: color('content', 'primary'),
                  }}
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
        </Tooltip>

        {/* Background- Color this text */}
        <Tooltip content="Background Color" delay={TOOLTIP_DELAY_MS}>
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
              style={{ color: color('content', 'primary') }}
              variant={'primary-transparent'}
              prefix={
                <IconText style={{ width: 20, border: border(), padding: 4 }} />
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
        </Tooltip>

        <styled.div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          <Tooltip content="Undo" delay={TOOLTIP_DELAY_MS}>
            <Button
              size="small"
              disabled={!canUndo}
              style={{ color: color('content', 'primary') }}
              variant={'primary-transparent'}
              prefix={<IconIcRedo style={{ transform: 'scaleX(-1)' }} />}
              shape="square"
              onClick={() => {
                editor.dispatchCommand(UNDO_COMMAND, null)
              }}
            />
          </Tooltip>
          <Tooltip content="Redo" delay={TOOLTIP_DELAY_MS}>
            <Button
              size="small"
              style={{ color: color('content', 'primary') }}
              disabled={!canRedo}
              variant={'primary-transparent'}
              prefix={<IconIcRedo />}
              shape="square"
              onClick={() => {
                editor.dispatchCommand(REDO_COMMAND, null)
              }}
            />
          </Tooltip>
        </styled.div>
      </styled.div>
      {openModal === 'image' && (
        <AddImageModal
          onOpenChange={() => {
            setOpenModal(null)
          }}
          onSave={({ file, caption }) => {
            editor.update(() => {
              editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                src: file.src,
                caption,
              })
            })
          }}
        />
      )}
    </>
  )
}
