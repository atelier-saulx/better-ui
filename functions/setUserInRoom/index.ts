import {BasedFunction} from "@based/functions";
import {FakeLoginMiddleware} from "../fakeLogin/middleware.js";

const setUserInRoom: BasedFunction<
  {
    [key: string]: any
  }
> = async (_based, payload, ctx) => {
  const isLoggedIn: boolean = await FakeLoginMiddleware(_based, payload, ctx)

  if (!isLoggedIn) {
    return
  }

  await _based.call('db:set', {
    $id: payload?.roomId,
    users: {
      $add: [
        payload?.userId
      ]
    }
  })

  return payload.roomId
}

export default setUserInRoom