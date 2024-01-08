import { Authorize } from '@based/functions'

const weekMs = 604_800_000

const authorize: Authorize = async (based, ctx, name, payload) => {
  return true
}

export default authorize
