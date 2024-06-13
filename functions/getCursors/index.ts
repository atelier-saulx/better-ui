import {BasedQueryFunction} from "@based/functions";

const getCursors: BasedQueryFunction<
  {
    [key: string]: any
  }
> = async (_based, payload = {}, update) => {
  if (!payload?.roomId) {
    return
  }

  return _based.query('db', {
    $id: payload?.roomId,
    trackingArea: true,
    users: {
      $list: true,
      id: true,
      name: true,
      mousePosition: true,
      clickEvent: true,
      tracking: true,
      color: true
    }
  }).subscribe(update)
}

export default getCursors