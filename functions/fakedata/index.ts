import { BasedQueryFunction } from '@based/functions'
import { faker } from '@faker-js/faker'

const fakedata: BasedQueryFunction<
  {
    [key: string]: any
  },
  any[]
> = async (_based, payload = {}, update) => {
  // Update function updates the
  // client state.

  // fix api

  const iterate = (cObj) => {
    const obj = {}

    Object.keys(cObj).forEach((key) => {
      if (obj[key] === true) {
        obj[key] = ''
      }
      if (key !== 'arraySize' && key !== 'update') {
        if (key === 'src') {
          obj[key] = faker.image.avatar()
        } else if (key === 'id') {
          obj[key] = faker.string.uuid().slice(0, 8)
        } else if (key === 'firstName') {
          obj[key] = faker.person.firstName(cObj[key] || undefined)
        } else if (key === 'name') {
          obj[key] = faker.person.firstName(cObj[key] || undefined)
        } else if (key === 'password') {
          obj[key] = faker.string.alphanumeric(cObj[key] || 10)
        } else if (key === 'email') {
          obj[key] = faker.internet.email(cObj[key] || undefined)
        } else if (key === 'status') {
          obj[key] = faker.lorem.words(cObj[key] || 1)
        } else if (key === 'title') {
          obj[key] = faker.lorem.sentence(cObj[key] || 3)
        } else if (key === 'number') {
          obj[key] = faker.number.int(cObj[key] || 10)
        } else if (key === 'price') {
          console.log('BAH', cObj[key])
          obj[key] = faker.commerce.price(cObj[key])
        } else if (key === 'color') {
          obj[key] = faker.color.rgb(cObj[key] || undefined)
        } else if (key === 'createdAt') {
          obj[key] = faker.date.recent().valueOf()
        } else if (key === 'updatedAt') {
          obj[key] = faker.date.soon().valueOf()
        } else if (key === 'lastUpdated') {
          obj[key] = faker.date.soon().valueOf()
        } else if (key === 'description') {
          obj[key] = faker.lorem.words(cObj[key] || { min: 0, max: 10 })
        } else if (key === 'powerTime') {
          obj[key] = faker.date.recent().valueOf()
        } else if (key === 'city') {
          obj[key] = faker.location.city()
        } else if (key === 'title') {
          obj[key] = faker.system.commonFileName()
        } else if (key === 'image') {
          obj[key] = faker.image.url(cObj[key] || undefined)
        } else if (key === 'renderAs') {
          obj[key] = faker.helpers.arrayElement(['folder', 'file', 'image'])
        } else if (typeof cObj[key] === 'object') {
          if (cObj[key].type) {
            obj[key] = iterate({ [cObj[key].type]: cObj[key].value })[
              cObj[key].type
            ]
          } else {
            obj[key] = iterate(cObj[key])
          }
        } else {
          obj[key] = faker.lorem.words(1)
        }
      }
    })

    return { ...obj }
  }

  if (payload.update) {
    if (!payload.arraySize) {
      payload.arraySize = 10
    }
    let size
    let checksum = 1
    const array = new Array(payload.arraySize)
      .fill(null)
      .map(() => iterate(payload))

    const reverseMap: any = {}

    const int = setInterval(() => {
      const rand = Math.ceil(Math.random() * (payload.arraySize / 3))

      for (let i = 0; i < rand; i++) {
        const y = Math.floor(Math.random() * payload.arraySize)
        const x = array[y]
        if (!size) {
          size = Object.keys(x).length
        }
        for (const key in x) {
          if (Math.random() > 0.75) {
            x[key] = iterate({ [key]: payload[key] })[key]
          }
        }
      }

      update(array, ++checksum)
    }, payload.update)
    update(array)

    return () => {
      clearInterval(int)
    }
  } else {
    const array = new Array(payload.arraySize || 10)
      .fill(null)
      .map(() => iterate(payload))

    update(array)
  }

  // Query functions should return
  // a cleanup function. It's run when
  // closing the connection
  return () => {}
}

export default fakedata
