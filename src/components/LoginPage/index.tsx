import * as React from 'react'
import {
  TextInput,
  Button,
  border,
  borderRadius,
  Text,
  color,
  boxShadow,
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
  const [submitted, setSubmitted] = React.useState(false)

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

          setSubmitted(true)

          if (variant === 'email') {
            // @ts-ignore
            onLogin({ email: e.target.input.value, code })
          } else if (variant === 'token') {
            // @ts-ignore
            onLogin({ token: e.target.input.value })
          }
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 'fit-content',
          gap: 24,
          flexGrow: 0,
          width: 500,
          maxWidth: '100%',
          padding: 32,
          border: border(),
          borderRadius: borderRadius('medium'),
          boxShadow: boxShadow('elevation'),
          background: color('background', 'screen'),
        }}
      >
        {logo}
        <TextInput
          required
          disabled={submitted}
          formName="input"
          placeholder={variant[0].toUpperCase() + variant.substring(1)}
        />
        {submitted && variant === 'email' ? (
          <div>
            <div
              style={{
                backgroundColor: color('interactive', 'primary-muted'),
                color: color('content', 'primary'),
                padding: 9,
                borderRadius: 4,
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              <Text>Code: {code}</Text>
            </div>
            <Text>Please check your email for validation.</Text>
          </div>
        ) : (
          <Button style={{ alignSelf: 'end' }} type="submit">
            Login
          </Button>
        )}
      </form>
    </main>
  )
}
