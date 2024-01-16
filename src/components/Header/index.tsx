import * as React from 'react'
import { styled } from 'inlines'
import { Button, useIsMobile, color, IconMenu, border } from '../../index.js'

export type HeaderProps = {
  logo?: React.ReactNode
  navigation?: React.ReactNode
  mobileNavigation?: {
    label: string
    onClick?: () => void
    prefix?: React.ReactNode
  }[]
}

export function Header({ logo, navigation, mobileNavigation }: HeaderProps) {
  const isMobile = useIsMobile()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <>
      <header
        style={{
          height: 64,
          borderBottom: border(),
          background: color('background', 'screen'),
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          flexShrink: 0,
        }}
      >
        {logo}
        {mobileNavigation && isMobile ? (
          <styled.div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Button
              variant="neutral-transparent"
              shape="square"
              size="small"
              onClick={() => {
                setMobileMenuOpen((p) => !p)
              }}
            >
              <IconMenu />
            </Button>
          </styled.div>
        ) : (
          <div style={{ marginLeft: 'auto' }}>{navigation}</div>
        )}
      </header>
      {mobileNavigation && isMobile && mobileMenuOpen && (
        <styled.div
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            bottom: 0,
            background: color('background', 'screen'),
            zIndex: 20,
            padding: '12px0',
          }}
        >
          {mobileNavigation.map((e) => (
            <styled.div
              key={e.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: 48,
                '& > * + *': { marginLeft: '10px' },
                padding: '0 24px',
                borderBottom: border(),
              }}
              onClick={e.onClick}
            >
              {e.prefix}
              <div
                style={{
                  color: color('content', 'primary'),
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {e.label}
              </div>
            </styled.div>
          ))}
        </styled.div>
      )}
    </>
  )
}
