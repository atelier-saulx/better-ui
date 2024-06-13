import {BasedFunction} from "@based/functions";
import {FakeLoginMiddleware} from "../fakeLogin/middleware.js";

const setRoom: BasedFunction<
  {
    [key: string]: any
  }
> = async (_based, payload, ctx) => {
  const isLoggedIn: boolean = await FakeLoginMiddleware(_based, payload, ctx)

  if (!isLoggedIn) {
    return
  }

  let roomId: string = payload?.roomId //'rm83f5c0a6'

  if (roomId) {
    await _based.call('db:set', {
      $id: roomId,
      fps: payload?.fps ?? 1,
      trackingArea: payload?.trackingArea
    })
  } else {
    const { id } = await _based.call('db:set', {
      fps: payload?.fps ?? 1,
      trackingArea: payload?.trackingArea
    })

    roomId = id
  }

  return roomId
}

export default setRoom