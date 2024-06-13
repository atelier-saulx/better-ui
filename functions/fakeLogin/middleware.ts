import {BasedFunction} from "@based/functions";

const FakeLoginMiddleware: BasedFunction<
  {
    [key: string]: any
  }
  > = async (_based, payload, ctx) => {
  if (!payload.userId) {
    return false
  }

  const result = await _based.query('db', {
    user: {
      id: true,
      $list: {
        $find: {
          $traverse: 'children',
          $filter: {
            $field: 'id',
            $operator: '=',
            $value: payload.userId
          }
        }
      }
    },
  }).get()

  if (!result.user.length) {
    return false
  }

  await _based.renewAuthState(ctx, {
    userId: result.user[0].id,
    persistent: true
  })

  return true
}

export { FakeLoginMiddleware }