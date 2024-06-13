import {BasedFunction} from "@based/functions";

const setCursors: BasedFunction<
  {
    [key: string]: any
  }
> = async (_based, payload = {}, ctx) => {
  return _based.call('db:set', {
    $id: ctx.session.authState.userId,
    mousePosition: payload.mousePosition,
    clickEvent: payload.clickEvent,
    tracking: payload.tracking
  })
}

export default setCursors