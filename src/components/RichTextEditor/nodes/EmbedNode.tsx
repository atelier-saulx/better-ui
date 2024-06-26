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
import { EmbedComponent } from '../components/EmbedComponent.js'

export type EmbedNodePayload = {
  html: string
}

type SerializedEmbedNode = Spread<
  {
    type: 'embed'
    version: 1
  } & EmbedNodePayload,
  SerializedDecoratorBlockNode
>

export class EmbedNode extends DecoratorBlockNode {
  __html: string

  static override getType(): string {
    return 'embed'
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
    return <EmbedComponent html={this.__html} nodeKey={this.__key} />
  }

  static override importJSON(serializedNode: SerializedEmbedNode): EmbedNode {
    return $createEmbedNode(serializedNode)
  }

  static importDOM() {
    return {
      div: (div: HTMLDivElement) => {
        if (div.dataset.isEmbedNode) {
          return {
            conversion: () => {
              const embedNode = new EmbedNode(div.innerHTML)

              return { node: embedNode }
            },
          }
        }

        return null
      },
    }
  }

  override exportJSON(): SerializedEmbedNode {
    return {
      ...super.exportJSON(),
      type: 'embed',
      version: 1,
      html: this.__html,
    }
  }

  override exportDOM(): DOMExportOutput {
    const div = document.createElement('div')
    div.setAttribute('data-is-embed-node', 'true')
    const html = this.__html

    div.innerHTML = html

    return { element: div }
  }
}

export function $createEmbedNode({ html }: EmbedNodePayload): EmbedNode {
  return new EmbedNode(html)
}

export function $isEmbedNode(
  node: LexicalNode | null | undefined,
): node is EmbedNode {
  return node instanceof EmbedNode
}
