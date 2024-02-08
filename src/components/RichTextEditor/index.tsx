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
  return (
    <LexicalComposer initialConfig={CONFIG}>
      <styled.div
        style={{
          position: 'relative',
          '& .rte': {
            display: 'flex',
            flexDirection: 'column',
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
            background: 'yellow',
          },
        }}
      >
        <ToolbarPlugin />

        <RichTextPlugin
          contentEditable={<ContentEditable className="rte" />}
          placeholder={<Placeholder>{placeholder}</Placeholder>}
          ErrorBoundary={LexicalErrorBoundary}
        />
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
