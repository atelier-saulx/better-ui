import { BasedQueryFunction } from '@based/functions'

const fakedata: BasedQueryFunction = async (_based, _payload, update) => {
  // Update function updates the
  // client state.
  update('snurp put fakedata here')

  // Query functions should return
  // a cleanup function. It's run when
  // closing the connection
  return () => {}
}

export default fakedata
