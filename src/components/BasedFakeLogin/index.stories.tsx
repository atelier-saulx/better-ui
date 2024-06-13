import { BasedFakeLogin } from './index.js'
import type { Meta, StoryObj } from '@storybook/react'
import {Provider, useAuthState} from "@based/react";
import * as React from "react";
import based from "@based/client";
import {Text} from "../Text/index.js";
import {Stack} from "../Stack/index.js";

const client = based({
  org: 'saulx',
  project: 'based-ui',
  env: 'production',
})

const LoginInfo = () => {
  const { userId} = useAuthState()

  return (
    <Stack display="block">
      <Text variant="body-strong" color="secondary">
        Is user LoggedIn?: {Boolean(userId).toString()}
      </Text>
      <Text variant="body" color="secondary">
        UserID: {userId}
      </Text>
    </Stack>
  )
}

const meta: Meta<typeof BasedFakeLogin> = {
  title: 'Based/BasedFakeLogin',
  component: BasedFakeLogin,
  decorators: [
    (Story) => (
      <Provider client={client}>
        <Story />
        <LoginInfo />
      </Provider>
    ),
  ],
}

export default meta

export const Default: StoryObj<typeof BasedFakeLogin> = {
  args: {}
}