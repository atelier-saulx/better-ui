import * as React from 'react'
import {
  DOMExportOutput,
  ElementFormatType,
  LexicalNode,
  NodeKey,
  Spread,
} from 'lexical'
import {
  DecoratorBlockNode,
  SerializedDecoratorBlockNode,
} from '@lexical/react/LexicalDecoratorBlockNode.js'
import { ImageComponent } from '../components/ImageComponent.js'
import { color } from '../../../utils/colors.js'

export type EmbedNodePayload = {
  html: string
}

type SerializedEmbedNode = Spread<
  {
    //  type: 'image'
    version: 1
  } & EmbedNodePayload,
  SerializedDecoratorBlockNode
>

export class EmbedNode extends DecoratorBlockNode {
  __html: string

  static override getType(): string {
    return 'image'
  }

  static override clone(node: EmbedNode): EmbedNode {
    return new EmbedNode(node.__html, node.__format, node.__key)
  }

  constructor(html: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key)
    this.__html = html
  }

  override createDOM(): HTMLElement {
    return document.createElement('div')
  }

  override updateDOM(): false {
    return false
  }

  override decorate(): JSX.Element {
    return (
      <div style={{ border: '10px solid red' }}>
        {this.__html}
        {this.__key}
      </div>
    )
  }

  static override importJSON(serializedNode: SerializedEmbedNode): EmbedNode {
    return $createEmbedNode(serializedNode)
  }

  override exportJSON(): SerializedEmbedNode {
    return {
      ...super.exportJSON(),
      //   type: 'image',
      version: 1,
      html: this.__html,
    }
  }

  override exportDOM(): DOMExportOutput {
    const figure = document.createElement('figure')
    const img = document.createElement('img')
    img.src = this.__src

    figure.appendChild(img)

    if (this.__caption) {
      const caption = document.createElement('figcaption')
      caption.innerText = this.__caption
      figure.appendChild(caption)
    }

    return { element: figure }
  }
}

export function $createEmbedNode({ html }: EmbedNodePayload): EmbedNode {
  return new EmbedNode(html)
}

export function $isImageNode(
  node: LexicalNode | null | undefined,
): node is EmbedNode {
  return node instanceof EmbedNode
}
