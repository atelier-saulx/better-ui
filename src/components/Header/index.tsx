import * as React from 'react'
import { styled } from 'inlines'
import {
  Button,
  Dropdown,
  Thumbnail,
  useIsMobile,
  color,
  useTheme,
  IconEye,
  IconLogOut,
  IconMenu,
  IconSettings,
  border,
} from '../../index.js'
import { BasedLogoWithText, BasedLogoWithoutText } from '../Icons/extras.js'

export function Header() {
  const isMobile = useIsMobile()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()

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
          ...(isMobile &&
            mobileMenuOpen && {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 20,
            }),
        }}
      >
        {isMobile ? <BasedLogoWithoutText /> : <BasedLogoWithText />}
        {isMobile ? (
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
          <>
            <styled.div
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                '& > * + *': {
                  marginLeft: '24px',
                },
              }}
            >
              <Button size="small" variant="neutral">
                Documentation
              </Button>
              <Dropdown.Root>
                <Dropdown.Trigger>
                  <div style={{ cursor: 'pointer' }}>
                    <Thumbnail text="MD" shape="circle" size="small" />
                  </div>
                </Dropdown.Trigger>
                <Dropdown.Items>
                  <Dropdown.Item icon={<IconSettings />}>
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon={<IconEye />}
                    onClick={() => {
                      setTheme(theme === 'dark' ? 'light' : 'dark')
                    }}
                  >
                    Switch to {theme === 'dark' ? 'light' : 'dark'} mode
                  </Dropdown.Item>
                  <Dropdown.Item icon={<IconLogOut />}>Logout</Dropdown.Item>
                </Dropdown.Items>
              </Dropdown.Root>
            </styled.div>
          </>
        )}
      </header>
      {isMobile && mobileMenuOpen && (
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
          <styled.div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 48,
              '& > * + *': { marginLeft: '10px' },
              padding: '0 24px',
              borderBottom: border(),
            }}
          >
            <IconSettings />
            <div
              style={{
                color: color('content', 'primary'),
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Settings
            </div>
          </styled.div>
          <styled.div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 48,
              '& > * + *': { marginLeft: '10px' },
              padding: '0 24px',
              borderBottom: border(),
            }}
          >
            <IconEye />
            <div
              style={{
                color: color('content', 'primary'),
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Switch to dark mode
            </div>
          </styled.div>
          <styled.div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 48,
              '& > * + *': { marginLeft: '10px' },
              padding: '0 24px',
            }}
          >
            <IconLogOut />
            <div
              style={{
                color: color('content', 'primary'),
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Logout
            </div>
          </styled.div>
        </styled.div>
      )}
    </>
  )
}
