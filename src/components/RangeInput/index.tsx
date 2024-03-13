import React from 'react'
import { styled, Style } from 'inlines'
import { color } from '../../utils/colors.js'

export const RangeInput = ({
  label,
  description,
  min,
  max,
  steps,
  onChange,
  value,
  disabled,
  style,
}) => {
  return (
    <Wrapper label={label} disabled={disabled} style={style}>
      {label && (
        <styled.span
          style={{
            marginBottom: 8,
            fontSize: 14,
            lineHeight: '24px',
            fontWeight: 500,
          }}
        >
          {label}
        </styled.span>
      )}
      <styled.div style={{ width: '100%' }}>
        {/* // slider */}
        <styled.div
          style={{
            width: '100%',
            height: 6,
            borderRadius: 4,
            background: color('background', 'primary2'),
          }}
        >
          <styled.div
            style={{
              height: 6,
              background: color('interactive', 'primary'),
              width: '70%',
              borderRadius: 4,
              position: 'relative',
            }}
          >
            {/* // thumb */}
            <styled.div
              style={{
                width: 16,
                height: 16,
                position: 'absolute',
                right: -8,
                top: -5,
                boxSizing: 'border-box',
                borderRadius: '50%',
                border: `5px solid ${color('interactive', 'primary')}`,
                background: color('background', 'screen'),
              }}
            ></styled.div>
          </styled.div>
        </styled.div>
      </styled.div>
    </Wrapper>
  )
}

const Wrapper = ({
  label,
  children,
  disabled,
  style,
}: {
  label?: string
  children: React.ReactNode
  disabled?: boolean
  style?: Style
}) => {
  if (label) {
    return (
      <styled.label
        style={
          label
            ? {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                opacity: disabled ? 0.6 : 1,
                cursor: disabled ? 'not-allowed' : 'default',
              }
            : undefined
        }
        onClick={(e) => (disabled ? e.preventDefault() : null)}
      >
        {children}
      </styled.label>
    )
  }

  return (
    <styled.div
      style={{
        width: '100%',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'default',
        ...style,
      }}
      onClick={(e) => (disabled ? e.preventDefault() : null)}
    >
      {children}
    </styled.div>
  )
}
