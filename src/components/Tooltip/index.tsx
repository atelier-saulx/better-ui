import * as React from 'react'
import * as TooltipBase from '@radix-ui/react-tooltip'
import { borderRadius, color } from '../../index.js'
import { styled } from 'inlines'

export type TooltipProps = {
  children: React.ReactNode
  content: string
  side?: TooltipBase.TooltipContentProps['side']
  delay?: number
}

export function Tooltip({ delay = 0, children, content, side }: TooltipProps) {
  return (
    <TooltipBase.Provider delayDuration={delay} skipDelayDuration={0}>
      <TooltipBase.Root>
        <TooltipBase.Trigger asChild>
          <styled.div style={{ display: 'inline-flex' }}>{children}</styled.div>
        </TooltipBase.Trigger>
        <TooltipBase.Portal>
          <TooltipBase.Content
            asChild
            side={side}
            sideOffset={4}
            collisionPadding={8}
          >
            <styled.div
              style={{
                padding: '4px 8px',
                borderRadius: borderRadius('tiny'),
                background: color('content', 'primary'),
                userSelect: 'none',
              }}
            >
              <styled.span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  lineHeight: '20px',
                  color: color('content', 'inverted'),
                }}
              >
                {content}
              </styled.span>
              <TooltipBase.Arrow
                style={{ fill: color('content', 'primary') }}
              />
            </styled.div>
          </TooltipBase.Content>
        </TooltipBase.Portal>
      </TooltipBase.Root>
    </TooltipBase.Provider>
  )
}
