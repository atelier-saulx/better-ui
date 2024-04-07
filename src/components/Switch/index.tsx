import React, { ReactNode, useEffect, useState } from 'react'
import { Style } from 'inlines'
import { borderRadius, color } from '../../utils/colors.js'
import { Stack, Button } from '../../index.js'

type SwitchProps = {
  data?: Array<string | ReactNode>
  onChange?: (value: number) => void
  style?: Style
  selected?: number
}

export const Switch = ({ data, style, selected, onChange }: SwitchProps) => {
  const [selectedTab, setSelectedTab] = useState(selected)

  useEffect(() => {
    setSelectedTab(selected)
  }, [selected])

  return (
    <Stack
      gap={2}
      fitContent
      justify="start"
      style={{
        padding: 4,
        borderRadius: borderRadius('medium'),
        background: color('background', 'neutral'),
        width: 'fit-content',
        ...style,
      }}
    >
      {[...data].map((v, idx) => {
        return (
          <Button
            key={idx}
            onClick={(v) => {
              onChange(idx)
              setSelectedTab(idx)
            }}
            prefix={
              <Stack
                style={{
                  paddingTop: 4,
                  paddingBottom: 4,
                  boxShadow:
                    selectedTab === idx
                      ? '0px 1px 2px rgba(0,0,0,0.1)'
                      : 'none',
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: borderRadius('tiny'),
                  background:
                    selectedTab === idx ? color('background', 'screen') : '',
                }}
              >
                {v}
              </Stack>
            }
            variant="icon-only"
          />
        )
      })}
    </Stack>
  )
}
