import { BasedSharedCursors } from './index.js'
import type { Meta, StoryObj } from '@storybook/react'
import {Provider, useAuthState, useQuery} from "@based/react";
import * as React from "react";
import based from "@based/client";
import {BasedFakeLogin} from "../BasedFakeLogin/index.js";
import {Stack} from "../Stack/index.js";
import {Text} from "../Text/index.js";

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

const RoomInfo = () => {
  const { data } = useQuery('db', {
    room: {
      id: true,
      users: true,
      trackingArea: true,
      fps: true,
      $list: {
        $sort: {
          $order: 'desc',
          $field: 'id'
        },
        $find: {
          $traverse: 'children',
          $filter: {
            $field: 'type',
            $operator: '=',
            $value: 'room',
          },
        }
      }
    },
  })

  const selectedRoom = data?.room?.[0]?.id
  const usersInRoom = data?.room?.[0]?.users?.length
  const trackingArea = data?.room?.[0]?.trackingArea
  const fpsRoom = data?.room?.[0]?.fps

  return (
    <>
      <Stack display="block" style={{
        marginTop: '10px'
      }}>
        <Text variant="body-strong" color="secondary">
          Room ID: {selectedRoom}
        </Text>
        <Text variant="body" color="secondary">
          Users in the Room: {usersInRoom}
        </Text>
        <Text variant="body" color="secondary">
          FPS of the Room: {fpsRoom}
        </Text>
        <Text variant="body" color="secondary">
          Room Coordinates: {JSON.stringify(trackingArea)}
        </Text>
      </Stack>
    </>
  )
}

const meta: Meta<typeof BasedSharedCursors> = {
  title: 'Based/BasedSharedCursors',
  component: BasedSharedCursors,
  decorators: [
    (Story) => (
      <Provider client={client}>
        <BasedFakeLogin />
        <LoginInfo />
        <RoomInfo />
        <Story />
      </Provider>
    ),
  ],
}

export default meta

export const Default: StoryObj<typeof BasedSharedCursors> = {
  args: {
    width: '800px',
    height: '800px',
    room: 'rm83f5c0a6',
    fps: 1
  },
}