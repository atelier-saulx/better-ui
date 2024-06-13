import React, {useEffect, useState} from "react";
import { useClient } from "@based/react";
import {TextInput} from "../TextInput/index.js";
import {Button} from "../Button/index.js";
import {Stack} from "../Stack/index.js";

export const BasedFakeLogin: React.FC = () => {
  const client = useClient()
  const [input, setInput] = useState<string>('')

  const getRandomColor = () => Math.floor(Math.random() * (999999 - 456789 + 1)) + 456789

  const fakeLogin = async (input?: string) => {
    if (!input) {
      return
    }

    return await client.call('fakeLogin', {
      name: input,
      color: `#${getRandomColor()}`
    })
  }

  useEffect(() => {
    const clearAuthState = async () => await client.setAuthState({})

    clearAuthState()
  }, []);

  return (
    <Stack
      gap={32}
    >
      <TextInput
        placeholder="Kirby Ashley"
        label="Name"
        description="Enter you login information"
        value={input}
        onChange={e => setInput(e)}
      />
      <Button
        variant="primary"
        disabled={Boolean(!input)}
        onClick={async () => await fakeLogin(input)}>
        Login
      </Button>
    </Stack>
  )
}
