import { BasedQueryFunction } from '@based/functions'
import { faker } from '@faker-js/faker'

const fakedata: BasedQueryFunction = async (_based, _payload, update) => {
  // Update function updates the
  // client state.

  const iterate = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (key !== 'arraySize') {
        if (key === 'src') {
          obj[key] = faker.image.avatar()
        } else if (key === 'id') {
          obj[key] = faker.string.uuid().slice(0, 8)
        } else if (key === 'firstName') {
          obj[key] = faker.person.firstName()
        } else if (key === 'name') {
          obj[key] = faker.word.adverb()
        } else if (key === 'password') {
          obj[key] = faker.string.alphanumeric(10)
        } else if (key === 'email') {
          obj[key] = faker.internet.email()
        } else if (key === 'status') {
          obj[key] = faker.lorem.words(1)
        } else if (key === 'title') {
          obj[key] = faker.lorem.sentence(3)
        } else if (key === 'number') {
          obj[key] = faker.number.int(10)
        } else if (key === 'price') {
          obj[key] = faker.commerce.price()
        } else if (key === 'color') {
          obj[key] = faker.color.rgb()
        } else if (key === 'createdAt') {
          obj[key] = faker.date.soon().valueOf()
        } else if (key === 'updatedAt') {
          obj[key] = faker.date.soon().valueOf()
        } else if (key === 'lastUpdated') {
          obj[key] = faker.date.soon().valueOf()
        } else if (key === 'description') {
          obj[key] = faker.lorem.words({ min: 0, max: 10 })
        } else if (key === 'powerTime') {
          obj[key] = faker.date.recent().valueOf()
        } else if (key === 'city') {
          obj[key] = faker.location.city()
        } else if (key === 'title') {
          obj[key] = faker.system.commonFileName()
        } else if (key === 'image') {
          obj[key] = faker.image.url()
        } else if (key === 'renderAs') {
          obj[key] = faker.helpers.arrayElement(['folder', 'file', 'image'])
        }
      }

      console.log(`key: ${key}, value: ${obj[key]}`)

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        iterate(obj[key])
      }
    })

    return { ...obj }
  }

  const array = new Array(_payload.arraySize || 10)
    .fill(null)
    .map(() => iterate(_payload))
  //   await iterate(_payload)

  // await iterate(_payload)

  update(array)

  // Query functions should return
  // a cleanup function. It's run when
  // closing the connection
  return () => {}
}

export default fakedata