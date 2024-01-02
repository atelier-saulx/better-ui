import * as React from 'react'
// also fix this
import * as Icons from './index.js'
import { styled } from 'inlines'
import { borderRadius, color } from '../../index.js'

const meta = {
  title: 'Atoms/Icons',
}
export default meta

export const Default = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        Click to copy name
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
        }}
      >
        {Object.entries(Icons)
          .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
          .filter(([key]) => !key.toLocaleLowerCase().includes('based'))
          .map(([key, Icon]) => (
            <styled.div
              style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                borderRadius: borderRadius('small'),
                '&:hover': {
                  background: color('background', 'neutral'),
                },
              }}
              onClick={() => {
                navigator.clipboard.writeText(key)
              }}
            >
              <Icon />
              <div style={{ marginTop: 8, fontSize: 14 }}>{key}</div>
            </styled.div>
          ))}
      </div>
    </div>
  )
}
