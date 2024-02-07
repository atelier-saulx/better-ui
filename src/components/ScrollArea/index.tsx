import * as React from 'react'
import { Style, styled } from 'inlines'
import 'overlayscrollbars/overlayscrollbars.css'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import './bars.css'

export type ScrollAreaProps = {
  children: React.ReactNode
  style?: Style
  onScroll?: React.UIEventHandler<HTMLDivElement>
}

export const ScrollArea = React.forwardRef(
  ({ children, style, onScroll }: ScrollAreaProps, ref) => {
    return (
      <styled.div
        style={{
          width: '100%',
          height: '100%',
          maxHeight: '100%',
        }}
        ref={ref}
      >
        <OverlayScrollbarsComponent
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '100%',
            overflow: 'auto',

            borderRadius: 'inherit',
            ...style,
          }}
          options={{
            scrollbars: {
              theme: 'os-theme-dark',
            },
          }}
          defer
          events={{
            scroll: (a, e) => {
              if (onScroll) {
                // @ts-ignore
                onScroll(e)
              }
            },
          }}
        >
          {children}
        </OverlayScrollbarsComponent>
      </styled.div>
    )
  },
)
