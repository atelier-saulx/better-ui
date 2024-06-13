import React, {useEffect, useRef, useState} from "react";
import {TrackingArea, useTrackMouse} from "../../hooks/useTrackMouse/index.js";
import {useEffectByFPS} from "../../hooks/useEffectByFPS/index.js";
import {useAuthState, useClient, useQuery} from "@based/react";
import {BasedCursor} from "./BasedCursor.js";

export type SharedCursorsProps = {
  room: string;
  width?: number | string,
  height?: number | string,
  size?: number,
  svgPath?: string,
  svgUrl?: string,
  fps?: number,
  children?: React.ReactNode
}

export const BasedSharedCursors: React.FC<SharedCursorsProps> = ({ room = '', fps = 1, width = '100%', height = '100%', size = 19, svgUrl, svgPath, children }) => {
  const client = useClient()
  const { userId} = useAuthState()
  const [roomId, setRoomId] = useState<string>(room)
  const elementRef = useRef<HTMLDivElement>(null);
  const { mousePosition, clickEvent, trackingArea, tracking } = useTrackMouse(elementRef);
  const { data } = useQuery('getCursors', {
    roomId
  })

  const setRoom = async (roomId: string, userId: string, trackingArea: TrackingArea, fps: number) => {
    setRoomId('')

    const id = await client.call('setRoom', {
      roomId,
      userId,
      fps,
      trackingArea,
    })

    setRoomId(id)
  }

  const setUserInRoom = async (roomId: string, userId: string) => {
    await client.call('setUserInRoom', {
      roomId,
      userId,
    })
  }

  useEffect(() => {
    if (!userId || !trackingArea.x || !trackingArea.y || !roomId) {
      return
    }

    setRoom(roomId, userId, trackingArea, fps)
    setUserInRoom(roomId, userId)
  }, [userId, trackingArea.x, trackingArea.y, fps]);

  useEffectByFPS(async () => {
    if (!userId || !roomId) {
      return
    }

    await client.call('setCursors', {
      mousePosition,
      clickEvent,
      tracking
    })
  }, [mousePosition, clickEvent, tracking], fps)

  return (
    <div
      ref={elementRef}
      style={{
        cursor: 'none',
        width: `${width}`,
        height: `${height}`,
        border: '1px solid rgba(15, 16, 19, 0.08)',
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {
        data?.users?.filter((user) => user.id === userId).map((user, index) => (
          <BasedCursor
            key={index}
            position={user?.mousePosition}
            click={user?.clickEvent}
            fps={fps}
            color={user?.color}
            text={user?.name}
            size={size}
            svgPath={svgPath}
            svgUrl={svgUrl}
            visible={user?.tracking}
          />
        ))
      }
      <BasedCursor
        position={mousePosition}
        fps={0}
        size={size}
        svgPath={svgPath}
        svgUrl={svgUrl}
        visible={tracking}
      />
      {children}
    </div>
  )
}
