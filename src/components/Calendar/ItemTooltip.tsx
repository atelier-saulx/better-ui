import * as React from 'react'
import * as TooltipBase from '@radix-ui/react-tooltip'
import { borderRadius, color, Text, border } from '../../index.js'
import { styled, Style } from 'inlines'
import { format } from 'date-fns'
import { prettyDate } from '@based/pretty-date'

export type ItemTooltipProps = {
  children: React.ReactNode
  labelField: string
  startField: Date | number
  endField: Date | number
  side?: TooltipBase.TooltipContentProps['side']
  delay?: number
  show?: boolean
  style?: Style
}

export function ItemTooltip({
  delay = 0,
  children,
  labelField,
  startField,
  endField,
  side,
  show,
  style,
}: ItemTooltipProps) {
  return (
    <TooltipBase.Provider delayDuration={delay} skipDelayDuration={0}>
      <TooltipBase.Root>
        <TooltipBase.Trigger asChild>
          <styled.div style={{ display: 'inline-flex', ...style }}>
            {children}
          </styled.div>
        </TooltipBase.Trigger>
        {show && (
          <TooltipBase.Portal>
            <TooltipBase.Content
              asChild
              side={side}
              sideOffset={4}
              collisionPadding={8}
            >
              <styled.div
                style={{
                  padding: '8px 12px 12px 12px',
                  borderRadius: borderRadius('tiny'),
                  background: color('background', 'screen'),
                  border: border(),
                  userSelect: 'none',
                  maxWidth: 478,
                }}
              >
                <Text variant="sub-title" style={{ marginBottom: 4 }}>
                  {labelField}
                </Text>
                <Text variant="body-light" color="secondary">
                  {prettyDate(
                    +format(new Date(startField), 'T'),
                    'date-time-text',
                  )}{' '}
                  -
                </Text>
                {startField !== endField && (
                  <Text variant="body-light" color="secondary">
                    {prettyDate(
                      +format(new Date(endField), 'T'),
                      'date-time-text',
                    )}
                  </Text>
                )}
              </styled.div>
            </TooltipBase.Content>
          </TooltipBase.Portal>
        )}
      </TooltipBase.Root>
    </TooltipBase.Provider>
  )
}
