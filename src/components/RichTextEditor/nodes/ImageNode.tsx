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

export type ImageNodePayload = {
  src: string
  caption: string
}

type SerializedImageNode = Spread<
  {
    type: 'image'
    version: 1
  } & ImageNodePayload,
  SerializedDecoratorBlockNode
>

export class ImageNode extends DecoratorBlockNode {
  __src: string
  __caption: string

  static override getType(): string {
    return 'image'
  }

  static override clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__caption, node.__format, node.__key)
  }

  constructor(
    src: string,
    caption: string,
    format?: ElementFormatType,
    key?: NodeKey,
  ) {
    super(format, key)
    this.__src = src
    this.__caption = caption
  }

  override createDOM(): HTMLElement {
    return document.createElement('div')
  }

  override updateDOM(): false {
    return false
  }

  override decorate(): JSX.Element {
    return (
      <ImageComponent
        src={this.__src}
        caption={this.__caption}
        nodeKey={this.__key}
      />
    )
  }

  static override importJSON(serializedNode: SerializedImageNode): ImageNode {
    return $createImageNode(serializedNode)
  }

  override exportJSON(): SerializedImageNode {
    return {
      ...super.exportJSON(),
      type: 'image',
      version: 1,
      src: this.__src,
      caption: this.__caption,
    }
  }

  static importDOM() {
    return {
      figure: (node: HTMLElement) => {
        const img = node.querySelector('img')
        const caption = node.querySelector('figcaption')

        if (img) {
          return {
            conversion: () => {
              const node = new ImageNode(img.src, caption?.innerText)

              return { node }
            },
          }
        }

        return null
      },
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

export function $createImageNode({
  src,
  caption,
}: ImageNodePayload): ImageNode {
  return new ImageNode(src, caption)
}

export function $isImageNode(
  node: LexicalNode | null | undefined,
): node is ImageNode {
  return node instanceof ImageNode
}
