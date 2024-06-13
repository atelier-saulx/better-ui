import {BasedFunction} from "@based/functions";

const fakeLogin: BasedFunction<
  {
    [key: string]: any
  }
> = async (_based, payload, ctx) => {
  if (!payload.name) {
    return
  }

  let userId: string

  const result = await _based.query('db', {
    user: {
      name: true,
      id: true,
      $list: {
        $find: {
          $traverse: 'children',
          $filter: {
            $field: 'name',
            $operator: '=',
            $value: payload.name
          }
        }
      }
    },
  }).get()

  userId = result?.user[0]?.id

  if (!userId) {
    const { id } = await _based.call('db:set', {
      type: 'user',
      name: payload.name,
      color: payload.color
    })
    userId = id
  }

  const token = Date.now().toString()

  return await _based.renewAuthState(ctx, {
    token,
    userId,
    persistent: true
  })
}

export default fakeLogin