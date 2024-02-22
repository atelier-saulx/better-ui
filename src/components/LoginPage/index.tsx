import * as React from 'react'
import {
  TextInput,
  Button,
  border,
  borderRadius,
  Text,
  color,
  boxShadow,
  Spinner,
} from '../../index.js'

type LoginWithEmail = {
  logo: React.ReactNode
  variant?: 'email'
  onLogin?: ({ email, code }: { email: string; code: string }) => void
}

type LoginWithToken = {
  logo: React.ReactNode
  variant: 'token'
  onLogin?: ({ token }: { token: string }) => void
}

export type LoginPageProps = LoginWithEmail | LoginWithToken

export function LoginPage({
  logo,
  onLogin,
  variant = 'email',
}: LoginPageProps) {
  const code = React.useMemo(() => (~~(Math.random() * 1e6)).toString(16), [])
  const [submitted, setSubmitted] = React.useState(null)

  return (
    <main
      style={{
        display: 'flex',
        height: '100dvh',
        padding: '200px 16px 0',
        overflow: 'hidden',
        justifyContent: 'center',
        background: color('background', 'muted'),
      }}
    >
      <form
        onSubmit={(e: any) => {
          e.preventDefault()

          if (submitted) return
          const value = e.target.input.value

          setSubmitted(value)

          if (variant === 'email') {
            // @ts-ignore
            onLogin({ email: value, code })
          } else if (variant === 'token') {
            // @ts-ignore
            onLogin({ token: value })
          }
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 'fit-content',
          gap: 24,
          flexGrow: 0,
          width: 380,
          maxWidth: '100%',
          padding: 32,
          border: border(),
          borderRadius: borderRadius('medium'),
          boxShadow: boxShadow('elevation'),
          background: color('background', 'screen'),
        }}
      >
        {logo}
        {submitted && variant === 'email' ? (
          <>
            <Text>
              We've just sent a verification link to {submitted}. Please make
              sure the email contains the following security code:
            </Text>
            <div>
              <div
                style={{
                  border: border(),
                  padding: 9,
                  borderRadius: 4,
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 600,
                  marginBottom: 8,
                  position: 'relative',
                }}
              >
                <Text>{code}</Text>
                <span
                  style={{
                    position: 'absolute',
                    left: 8,
                    top: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Spinner size={24} color="secondary" />
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <TextInput
              placeholder={variant[0].toUpperCase() + variant.substring(1)}
              required
              disabled={submitted}
              formName="input"
            />
            <Button style={{ height: 42 }} type="submit">
              Login
            </Button>
          </>
        )}
      </form>
    </main>
  )
}
