import * as React from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer.js'
import { ValuePlugin, ValuePluginProps } from './plugins/ValuePlugin.js'
import {
  AutoFocusPlugin,
  AutoFocusPluginProps,
} from './plugins/AutoFocusPlugin.js'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin.js'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin.js'
// TODO what's a .prod.js import? are the other imports correct?
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary.prod.js'
import { ContentEditable } from '@lexical/react/LexicalContentEditable.js'
import { ListPlugin } from '@lexical/react/LexicalListPlugin.js'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin.js'
import { Placeholder } from './components/Placeholder.js'
import { BehaviourPlugin } from './plugins/BehaviourPlugin.js'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { LinkNode } from '@lexical/link'
import { ListNode, ListItemNode } from '@lexical/list'
import { styled } from 'inlines'
import { color, border, boxShadow } from '../../index.js'
import { ToolbarPlugin } from './plugins/ToolbarPlugin.js'
import { ImagePlugin } from './plugins/ImagePlugin.js'
import { ImageNode } from './nodes/ImageNode.js'
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin.js'

export type RichTextEditorProps = {
  placeholder?: string
} & ValuePluginProps &
  AutoFocusPluginProps

const CONFIG = {
  editable: true,
  namespace: '__based_rte',
  nodes: [HeadingNode, LinkNode, ListNode, ListItemNode, ImageNode, QuoteNode],
  onError: (error) => {
    console.error('rte error:', error)
  },
  theme: {
    heading: {
      h1: 'rte-h1',
      h2: 'rte-h2',
      h3: 'rte-h3',
    },
    paragraph: 'rte-p',
    quote: 'rte-blockquote',
    text: {
      bold: 'rte-bold',
      italic: 'rte-italic',
      strikethrough: 'rte-strikethrough',
    },
    link: 'rte-link',
    list: {
      ul: 'rte-ul',
    },
    embedBlock: {
      base: 'rte-embedbase',
      focus: 'rte-embedfocus',
    },
  },
}

export function RichTextEditor({
  placeholder,
  autoFocus,
  onChange,
  defaultValue,
}: RichTextEditorProps) {
  const editorContainerRef = React.useRef<HTMLDivElement | null>()

  return (
    <LexicalComposer initialConfig={CONFIG}>
      <styled.div
        ref={editorContainerRef}
        style={{
          position: 'relative',
          '& .rte': {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            color: color('content', 'primary'),
            lineHeight: '1.33',
            border: border(),
            '&:hover': {
              border: border('hover'),
            },
            '&:focus': {
              border: border('focus'),
              boxShadow: boxShadow('focus'),
            },
            borderRadius: '8px',
            padding: '16px',
            minHeight: '300px',
            outline: 'none',
          },
          // keeping focus on the editor when a toolbar button is clicked
          // might not want this for everything so change later if needed
          '&:focus-within .rte': {
            border: border('focus'),
            boxShadow: boxShadow('focus'),
          },
          '& .rte-h1': {
            margin: 0,
            marginBottom: 12,
            color: color('content', 'primary'),
          },
          '& .rte-h2': {
            margin: 0,
            marginBottom: 10,
            color: color('content', 'primary'),
          },
          '& .rte-h3': {
            margin: 0,
            marginBottom: 8,
            color: color('content', 'primary'),
          },
          '& .rte-p': {
            margin: 0,
            marginBottom: 14,
            fontSize: 15,
            color: color('content', 'primary'),
          },
          '& .rte-bold': {
            fontWeight: 'bold',
          },
          '& .rte-italic': {
            fontStyle: 'italic',
          },
          '& .rte-underline': {
            textDecoration: 'underline',
          },
          '& .rte-strikethrough': {
            textDecoration: 'line-through',
          },
          '& .rte-link': {
            color: color('interactive', 'primary'),
          },
          '& .rte-ul': {
            paddingLeft: 32,
            margin: 0,
          },
          '& .rte-blockquote': {
            background: color('background', 'muted'),
            padding: '8px 16px',
            fontStyle: 'italic',
            fontFamily: 'serif',
          },
          '& .rte-blockquote::before': {
            content: '" "',
            width: 10,
            height: 10,
            background: 'red',
          },
          // dragg blocks
          '& .draggable-block-menu': {
            borderRadius: 4,
            padding: '2px 1px',
            cursor: 'grab',
            opacity: 0,
            position: 'absolute',
            left: '-16px',
            top: 0,
            willChange: 'transform',
          },
          '& .draggable-block-menu .icon': {
            width: 16,
            height: 16,
            opacity: 0.6,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundImage: ` url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='currentColor' %3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M5.75 3.25C5.75 4.07843 6.42157 4.75 7.25 4.75C8.07843 4.75 8.75 4.07843 8.75 3.25C8.75 2.42157 8.07843 1.75 7.25 1.75C6.42157 1.75 5.75 2.42157 5.75 3.25ZM11.25 3.25C11.25 4.07843 11.9216 4.75 12.75 4.75C13.5784 4.75 14.25 4.07843 14.25 3.25C14.25 2.42157 13.5784 1.75 12.75 1.75C11.9216 1.75 11.25 2.42157 11.25 3.25ZM11.25 10C11.25 10.8284 11.9216 11.5 12.75 11.5C13.5784 11.5 14.25 10.8284 14.25 10C14.25 9.17157 13.5784 8.5 12.75 8.5C11.9216 8.5 11.25 9.17157 11.25 10ZM12.75 18.25C11.9216 18.25 11.25 17.5784 11.25 16.75C11.25 15.9216 11.9216 15.25 12.75 15.25C13.5784 15.25 14.25 15.9216 14.25 16.75C14.25 17.5784 13.5784 18.25 12.75 18.25ZM7.25 11.5C6.42157 11.5 5.75 10.8284 5.75 10C5.75 9.17157 6.42157 8.5 7.25 8.5C8.07843 8.5 8.75 9.17157 8.75 10C8.75 10.8284 8.07843 11.5 7.25 11.5ZM5.75 16.75C5.75 17.5784 6.42157 18.25 7.25 18.25C8.07843 18.25 8.75 17.5784 8.75 16.75C8.75 15.9216 8.07843 15.25 7.25 15.25C6.42157 15.25 5.75 15.9216 5.75 16.75Z' /%3E%3C/svg%3E")`,
          },
          '& .draggable-block-menu:active': {
            cursor: 'grabbing',
          },
          '& .draggable-block-menu:hover': {
            backgroundColor: color('background', 'screen'),
            border: border(),
            borderRadius: '4px',
            width: 22,
            height: 22,
            padding: 2,
          },
          '& .draggable-block-target-line': {
            pointerEvents: 'none',
            background: color('interactive', 'primary'),
            height: 3,
            position: 'absolute',
            left: 0,
            top: 0,
            opacity: 0,
            willChange: 'transform',
          },
        }}
      >
        <ToolbarPlugin />

        <RichTextPlugin
          contentEditable={<ContentEditable className="rte" />}
          placeholder={<Placeholder>{placeholder}</Placeholder>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        {editorContainerRef && (
          <DraggableBlockPlugin anchorElem={editorContainerRef?.current} />
        )}
        <ImagePlugin />
        <ListPlugin />
        <LinkPlugin />
        <BehaviourPlugin />
        <HistoryPlugin />
        <AutoFocusPlugin autoFocus={autoFocus} />
        <ValuePlugin defaultValue={defaultValue} onChange={onChange} />
      </styled.div>
    </LexicalComposer>
  )
}
