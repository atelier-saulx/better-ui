import React, { useState } from 'react'
import { styled, Style } from 'inlines'
import { borderRadius, boxShadow, color } from '../../utils/colors.js'
import { Text } from '../../index.js'

type SwitchProps = {
  data?: Array<string>
  onChange?: (value: string) => void
  style?: Style
  activeTab?: string
}

export const Switch = ({
  data,
  onChange,
  activeTab: activeTabProp,
  style,
}: SwitchProps) => {
  const [activeTab, setActiveTab] = useState(activeTabProp || data[0])

  return (
    <styled.div
      style={{
        display: 'inline-flex',
        backgroundColor: color('background', 'muted'),
        borderRadius: borderRadius('small'),
        padding: 4,
        gap: 4,
        ...style,
      }}
    >
      {data?.map((item, idx) => (
        <styled.div
          key={idx}
          onClick={() => {
            setActiveTab(data[idx])
            onChange(data[idx])
          }}
          style={{
            padding: '4px 12px',
            borderRadius: borderRadius('tiny'),
            userSelect: 'none',
            backgroundColor:
              activeTab === data[idx]
                ? color('background', 'screen')
                : 'inherit',
            boxShadow:
              activeTab === data[idx] ? boxShadow('elevation') : 'none',
          }}
        >
          <Text>{item}</Text>
        </styled.div>
      ))}
    </styled.div>
  )
}
