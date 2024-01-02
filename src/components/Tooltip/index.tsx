import * as React from 'react'
import * as TooltipBase from '@radix-ui/react-tooltip'
import { borderRadius, color } from '../../index.js'

export type TooltipProps = {
  children: React.ReactNode
  content: string
  side?: TooltipBase.TooltipContentProps['side']
}

export function Tooltip({ children, content, side }: TooltipProps) {
  return (
    <TooltipBase.Provider delayDuration={0} skipDelayDuration={0}>
      <TooltipBase.Root>
        <TooltipBase.Trigger asChild>
          <div>{children}</div>
        </TooltipBase.Trigger>
        <TooltipBase.Portal>
          <TooltipBase.Content
            asChild
            side={side}
            sideOffset={4}
            collisionPadding={8}
          >
            <div
              style={{
                padding: '4px 8px',
                borderRadius: borderRadius('tiny'),
                background: color('content', 'primary'),
                userSelect: 'none',
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  lineHeight: '20px',
                  color: color('content', 'inverted'),
                }}
              >
                {content}
              </span>
              <TooltipBase.Arrow
                style={{ fill: color('content', 'primary') }}
              />
            </div>
          </TooltipBase.Content>
        </TooltipBase.Portal>
      </TooltipBase.Root>
    </TooltipBase.Provider>
  )
}
