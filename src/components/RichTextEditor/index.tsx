import * as React from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer.js'
import { ValuePlugin, ValuePluginProps } from './plugins/ValuePlugin.js'
import {
  AutoFocusPlugin,
  AutoFocusPluginProps,
} from './plugins/AutoFocusPlugin.js'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin.js'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin.js'
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
import { color, border, ScrollArea } from '../../index.js'
import { ToolbarPlugin } from './plugins/ToolbarPlugin.js'
import { ImagePlugin } from './plugins/ImagePlugin.js'
import { ImageNode } from './nodes/ImageNode.js'
import { EmbedPlugin } from './plugins/EmbedPlugin.js'
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin.js'
import { EmbedNode } from './nodes/EmbedNode.js'

export type RichTextEditorProps = {
  placeholder?: string
  height?: number
} & ValuePluginProps &
  AutoFocusPluginProps

const CONFIG = {
  editable: true,
  namespace: '__based_rte',
  nodes: [
    HeadingNode,
    LinkNode,
    ListNode,
    ListItemNode,
    ImageNode,
    QuoteNode,
    EmbedNode,
  ],
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
      underline: 'rte-underline',
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
  height = 500,
  value,
}: RichTextEditorProps) {
  const editorContainerRef = React.useRef<HTMLDivElement | null>()

  return (
    <LexicalComposer initialConfig={CONFIG}>
      <ToolbarPlugin />

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
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
            padding: '16px ',
            minHeight: '300px',
            outline: 'none',
            height: `${height}px`,
          },
          '& .rte-h1': {
            margin: '0px',
            marginBottom: '14px',
            color: color('content', 'primary'),
          },
          '& .rte-h2': {
            margin: '0px',
            marginBottom: '12px',
            color: color('content', 'primary'),
          },
          '& .rte-h3': {
            margin: '0px',
            marginBottom: '10px',
            color: color('content', 'primary'),
          },
          '& .rte-p': {
            margin: '0px',
            marginBottom: '14px',
            fontSize: '15px',
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
            paddingLeft: '32px',
            margin: '0px',
            marginBottom: '16px',
          },
          '& .rte-blockquote': {
            background: color('background', 'muted'),
            padding: '8px 16px',
            fontStyle: 'italic',
            position: 'relative',
            fontSize: '16px',
            textAlign: 'center',
            marginBottom: '14px',
          },
          '& .rte-blockquote::before': {
            content: '" "',
            width: '24px',
            height: '24px',
            position: 'absolute',
            left: '-16px',
            opacity: '0.24',
            top: '-8px',
            fontSize: '17px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='currentColor' %3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M6.58455 4.5456C6.44521 4.5069 6.25179 4.5 5.56006 4.5H4.95C4.37757 4.5 3.99336 4.50058 3.69748 4.52476C3.41036 4.54822 3.27307 4.5901 3.18251 4.63624C2.94731 4.75608 2.75608 4.94731 2.63624 5.18251C2.5901 5.27307 2.54822 5.41035 2.52476 5.69748C2.50058 5.99336 2.5 6.37757 2.5 6.95V7.05C2.5 7.62243 2.50058 8.00664 2.52476 8.30252C2.54822 8.58965 2.5901 8.72693 2.63624 8.81749C2.75608 9.05269 2.94731 9.24392 3.18251 9.36376C3.27307 9.4099 3.41036 9.45178 3.69748 9.47524C3.99336 9.49942 4.37757 9.5 4.95 9.5H5.5C5.75993 9.5 6.00133 9.63459 6.13799 9.8557C6.27464 10.0768 6.28707 10.3529 6.17082 10.5854L4.71353 13.5H5.44906C5.54184 13.5 5.59474 13.4999 5.63483 13.4987C5.66 13.4979 5.67064 13.4969 5.67328 13.4966C5.73797 13.4857 5.79582 13.4499 5.83434 13.3968C5.83174 13.4004 5.83601 13.3955 5.85312 13.3638C5.87215 13.3285 5.89588 13.2812 5.93737 13.1982C6.31451 12.4439 6.48723 12.0976 6.63354 11.7467C7.10568 10.6143 7.38943 9.41238 7.47353 8.18843C7.4996 7.80913 7.5 7.4221 7.5 6.57881V6.43994C7.5 5.74821 7.4931 5.55479 7.4544 5.41545C7.33706 4.99302 7.00698 4.66294 6.58455 4.5456ZM5.66119 2.99995C6.20332 2.99958 6.62231 2.9993 6.986 3.10032C7.91536 3.35847 8.64153 4.08464 8.89968 5.014C9.0007 5.37769 9.00042 5.79668 9.00005 6.33881C9.00002 6.37205 9 6.40576 9 6.43994V6.61074C9.00001 7.41405 9.00001 7.85462 8.97 8.29126C8.87468 9.6784 8.55311 11.0406 8.01802 12.3239C7.84958 12.7279 7.65255 13.122 7.29331 13.8404L7.27901 13.869C7.27377 13.8795 7.26851 13.8901 7.26323 13.9007C7.20066 14.0262 7.13435 14.1592 7.04861 14.2774C6.77822 14.6503 6.37177 14.9015 5.91739 14.9766C5.77331 15.0004 5.62466 15.0002 5.48441 15C5.47256 15 5.46078 15 5.44906 15H3.5C3.24007 15 2.99867 14.8654 2.86201 14.6443C2.72536 14.4232 2.71293 14.1471 2.82918 13.9146L4.2876 10.9977C4.02222 10.9947 3.78522 10.9874 3.57533 10.9703C3.19545 10.9392 2.83879 10.8721 2.50153 10.7003C1.98408 10.4366 1.56338 10.0159 1.29973 9.49847C1.12789 9.16121 1.06078 8.80455 1.02974 8.42467C0.999981 8.06044 0.99999 7.61459 1 7.08043V6.91957C0.99999 6.38541 0.999981 5.93956 1.02974 5.57533C1.06078 5.19545 1.12789 4.83879 1.29973 4.50153C1.56338 3.98408 1.98408 3.56338 2.50153 3.29973C2.83879 3.12789 3.19545 3.06078 3.57533 3.02974C3.93956 2.99998 4.38541 2.99999 4.91957 3L5.56006 3C5.59424 3 5.62795 2.99998 5.66119 2.99995ZM16.5845 6.5456C16.4452 6.5069 16.2518 6.5 15.5601 6.5H14.95C14.3776 6.5 13.9934 6.50058 13.6975 6.52476C13.4104 6.54822 13.2731 6.5901 13.1825 6.63624C12.9473 6.75608 12.7561 6.94731 12.6362 7.18251C12.5901 7.27307 12.5482 7.41035 12.5248 7.69748C12.5006 7.99336 12.5 8.37757 12.5 8.95V9.05C12.5 9.62243 12.5006 10.0066 12.5248 10.3025C12.5482 10.5896 12.5901 10.7269 12.6362 10.8175C12.7561 11.0527 12.9473 11.2439 13.1825 11.3638C13.2731 11.4099 13.4104 11.4518 13.6975 11.4752C13.9934 11.4994 14.3776 11.5 14.95 11.5H15.5C15.7599 11.5 16.0013 11.6346 16.138 11.8557C16.2746 12.0768 16.2871 12.3529 16.1708 12.5854L14.7135 15.5H15.4491C15.5418 15.5 15.5947 15.4999 15.6348 15.4987C15.6709 15.4976 15.6771 15.4959 15.6727 15.4967C15.7377 15.4859 15.7957 15.45 15.8343 15.3968C15.8317 15.4004 15.836 15.3955 15.8531 15.3638C15.8721 15.3285 15.8959 15.2812 15.9374 15.1982C16.3145 14.4439 16.4872 14.0976 16.6335 13.7467C17.1057 12.6143 17.3894 11.4124 17.4735 10.1884C17.4996 9.80913 17.5 9.4221 17.5 8.57881V8.43994C17.5 7.74821 17.4931 7.55479 17.4544 7.41545C17.3371 6.99302 17.007 6.66294 16.5845 6.5456ZM15.6612 4.99995C16.2033 4.99958 16.6223 4.9993 16.986 5.10032C17.9154 5.35847 18.6415 6.08464 18.8997 7.014C19.0007 7.37769 19.0004 7.79668 19 8.33881C19 8.37205 19 8.40576 19 8.43994V8.61067C19 9.41402 19 9.8546 18.97 10.2913C18.8747 11.6784 18.5531 13.0406 18.018 14.3239C17.8496 14.7279 17.6525 15.122 17.2933 15.8405L17.279 15.869C17.2738 15.8795 17.2685 15.8901 17.2632 15.9007C17.2007 16.0262 17.1343 16.1592 17.0486 16.2774C16.7782 16.6503 16.3718 16.9015 15.9174 16.9766C15.7733 17.0004 15.6247 17.0002 15.4844 17C15.4726 17 15.4608 17 15.4491 17H13.5C13.2401 17 12.9987 16.8654 12.862 16.6443C12.7254 16.4232 12.7129 16.1471 12.8292 15.9146L14.2876 12.9977C14.0222 12.9947 13.7852 12.9874 13.5753 12.9703C13.1954 12.9392 12.8388 12.8721 12.5015 12.7003C11.9841 12.4366 11.5634 12.0159 11.2997 11.4985C11.1279 11.1612 11.0608 10.8046 11.0297 10.4247C11 10.0604 11 9.6146 11 9.08045V8.91955C11 8.3854 11 7.93956 11.0297 7.57533C11.0608 7.19545 11.1279 6.83879 11.2997 6.50153C11.5634 5.98408 11.9841 5.56338 12.5015 5.29973C12.8388 5.12789 13.1954 5.06078 13.5753 5.02974C13.9396 4.99998 14.3854 4.99999 14.9196 5L15.5601 5C15.5942 5 15.6279 4.99998 15.6612 4.99995Z' /%3E%3C/svg%3E")`,
          },
          '& .rte-blockquote::after': {
            content: '" "',
            width: '24px',
            height: '24px',
            position: 'absolute',
            right: '-16px',
            opacity: '0.24',
            bottom: '-8px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='currentColor' %3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M6.58455 4.5456C6.44521 4.5069 6.25179 4.5 5.56006 4.5H4.95C4.37757 4.5 3.99336 4.50058 3.69748 4.52476C3.41036 4.54822 3.27307 4.5901 3.18251 4.63624C2.94731 4.75608 2.75608 4.94731 2.63624 5.18251C2.5901 5.27307 2.54822 5.41035 2.52476 5.69748C2.50058 5.99336 2.5 6.37757 2.5 6.95V7.05C2.5 7.62243 2.50058 8.00664 2.52476 8.30252C2.54822 8.58965 2.5901 8.72693 2.63624 8.81749C2.75608 9.05269 2.94731 9.24392 3.18251 9.36376C3.27307 9.4099 3.41036 9.45178 3.69748 9.47524C3.99336 9.49942 4.37757 9.5 4.95 9.5H5.5C5.75993 9.5 6.00133 9.63459 6.13799 9.8557C6.27464 10.0768 6.28707 10.3529 6.17082 10.5854L4.71353 13.5H5.44906C5.54184 13.5 5.59474 13.4999 5.63483 13.4987C5.66 13.4979 5.67064 13.4969 5.67328 13.4966C5.73797 13.4857 5.79582 13.4499 5.83434 13.3968C5.83174 13.4004 5.83601 13.3955 5.85312 13.3638C5.87215 13.3285 5.89588 13.2812 5.93737 13.1982C6.31451 12.4439 6.48723 12.0976 6.63354 11.7467C7.10568 10.6143 7.38943 9.41238 7.47353 8.18843C7.4996 7.80913 7.5 7.4221 7.5 6.57881V6.43994C7.5 5.74821 7.4931 5.55479 7.4544 5.41545C7.33706 4.99302 7.00698 4.66294 6.58455 4.5456ZM5.66119 2.99995C6.20332 2.99958 6.62231 2.9993 6.986 3.10032C7.91536 3.35847 8.64153 4.08464 8.89968 5.014C9.0007 5.37769 9.00042 5.79668 9.00005 6.33881C9.00002 6.37205 9 6.40576 9 6.43994V6.61074C9.00001 7.41405 9.00001 7.85462 8.97 8.29126C8.87468 9.6784 8.55311 11.0406 8.01802 12.3239C7.84958 12.7279 7.65255 13.122 7.29331 13.8404L7.27901 13.869C7.27377 13.8795 7.26851 13.8901 7.26323 13.9007C7.20066 14.0262 7.13435 14.1592 7.04861 14.2774C6.77822 14.6503 6.37177 14.9015 5.91739 14.9766C5.77331 15.0004 5.62466 15.0002 5.48441 15C5.47256 15 5.46078 15 5.44906 15H3.5C3.24007 15 2.99867 14.8654 2.86201 14.6443C2.72536 14.4232 2.71293 14.1471 2.82918 13.9146L4.2876 10.9977C4.02222 10.9947 3.78522 10.9874 3.57533 10.9703C3.19545 10.9392 2.83879 10.8721 2.50153 10.7003C1.98408 10.4366 1.56338 10.0159 1.29973 9.49847C1.12789 9.16121 1.06078 8.80455 1.02974 8.42467C0.999981 8.06044 0.99999 7.61459 1 7.08043V6.91957C0.99999 6.38541 0.999981 5.93956 1.02974 5.57533C1.06078 5.19545 1.12789 4.83879 1.29973 4.50153C1.56338 3.98408 1.98408 3.56338 2.50153 3.29973C2.83879 3.12789 3.19545 3.06078 3.57533 3.02974C3.93956 2.99998 4.38541 2.99999 4.91957 3L5.56006 3C5.59424 3 5.62795 2.99998 5.66119 2.99995ZM16.5845 6.5456C16.4452 6.5069 16.2518 6.5 15.5601 6.5H14.95C14.3776 6.5 13.9934 6.50058 13.6975 6.52476C13.4104 6.54822 13.2731 6.5901 13.1825 6.63624C12.9473 6.75608 12.7561 6.94731 12.6362 7.18251C12.5901 7.27307 12.5482 7.41035 12.5248 7.69748C12.5006 7.99336 12.5 8.37757 12.5 8.95V9.05C12.5 9.62243 12.5006 10.0066 12.5248 10.3025C12.5482 10.5896 12.5901 10.7269 12.6362 10.8175C12.7561 11.0527 12.9473 11.2439 13.1825 11.3638C13.2731 11.4099 13.4104 11.4518 13.6975 11.4752C13.9934 11.4994 14.3776 11.5 14.95 11.5H15.5C15.7599 11.5 16.0013 11.6346 16.138 11.8557C16.2746 12.0768 16.2871 12.3529 16.1708 12.5854L14.7135 15.5H15.4491C15.5418 15.5 15.5947 15.4999 15.6348 15.4987C15.6709 15.4976 15.6771 15.4959 15.6727 15.4967C15.7377 15.4859 15.7957 15.45 15.8343 15.3968C15.8317 15.4004 15.836 15.3955 15.8531 15.3638C15.8721 15.3285 15.8959 15.2812 15.9374 15.1982C16.3145 14.4439 16.4872 14.0976 16.6335 13.7467C17.1057 12.6143 17.3894 11.4124 17.4735 10.1884C17.4996 9.80913 17.5 9.4221 17.5 8.57881V8.43994C17.5 7.74821 17.4931 7.55479 17.4544 7.41545C17.3371 6.99302 17.007 6.66294 16.5845 6.5456ZM15.6612 4.99995C16.2033 4.99958 16.6223 4.9993 16.986 5.10032C17.9154 5.35847 18.6415 6.08464 18.8997 7.014C19.0007 7.37769 19.0004 7.79668 19 8.33881C19 8.37205 19 8.40576 19 8.43994V8.61067C19 9.41402 19 9.8546 18.97 10.2913C18.8747 11.6784 18.5531 13.0406 18.018 14.3239C17.8496 14.7279 17.6525 15.122 17.2933 15.8405L17.279 15.869C17.2738 15.8795 17.2685 15.8901 17.2632 15.9007C17.2007 16.0262 17.1343 16.1592 17.0486 16.2774C16.7782 16.6503 16.3718 16.9015 15.9174 16.9766C15.7733 17.0004 15.6247 17.0002 15.4844 17C15.4726 17 15.4608 17 15.4491 17H13.5C13.2401 17 12.9987 16.8654 12.862 16.6443C12.7254 16.4232 12.7129 16.1471 12.8292 15.9146L14.2876 12.9977C14.0222 12.9947 13.7852 12.9874 13.5753 12.9703C13.1954 12.9392 12.8388 12.8721 12.5015 12.7003C11.9841 12.4366 11.5634 12.0159 11.2997 11.4985C11.1279 11.1612 11.0608 10.8046 11.0297 10.4247C11 10.0604 11 9.6146 11 9.08045V8.91955C11 8.3854 11 7.93956 11.0297 7.57533C11.0608 7.19545 11.1279 6.83879 11.2997 6.50153C11.5634 5.98408 11.9841 5.56338 12.5015 5.29973C12.8388 5.12789 13.1954 5.06078 13.5753 5.02974C13.9396 4.99998 14.3854 4.99999 14.9196 5L15.5601 5C15.5942 5 15.6279 4.99998 15.6612 4.99995Z' /%3E%3C/svg%3E")`,
          },
          // dragg blocks
          '& .draggable-block-menu': {
            borderRadius: '4px',
            padding: '2px 1px',
            cursor: 'grab',
            opacity: '0',
            position: 'absolute',
            left: '-13px',
            top: '0',
            willChange: 'transform',
          },
          '& .draggable-block-menu .icon': {
            width: '16px',
            height: '16px',
            opacity: 0.4,
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
            width: '18px',
            height: '22px',
            padding: '2px 0px',
          },
          '& .draggable-block-target-line': {
            pointerEvents: 'none',
            background: color('interactive', 'primary'),
            height: '3px',
            position: 'absolute',
            left: '0px',
            top: '0px',
            opacity: '0',
            willChange: 'transform',
          },
          '& [data-overlayscrollbars-viewport]': {
            marginBottom: '24px  !important',
          },
        }}
      >
        <ScrollArea
          style={{
            border: border(),
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
          }}
        >
          <RichTextPlugin
            contentEditable={<ContentEditable className="rte" />}
            placeholder={<Placeholder>{placeholder}</Placeholder>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          {editorContainerRef && (
            <DraggableBlockPlugin anchorElem={editorContainerRef?.current} />
          )}
          <EmbedPlugin />
          <ImagePlugin />
          <ListPlugin />
          <LinkPlugin />
          <BehaviourPlugin />
          <HistoryPlugin />
          <AutoFocusPlugin autoFocus={autoFocus} />
          <ValuePlugin value={value} onChange={onChange} />
        </ScrollArea>
      </styled.div>
    </LexicalComposer>
  )
}
