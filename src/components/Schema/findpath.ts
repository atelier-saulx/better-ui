export const findPath = (ob, key) => {
  const path = []
  const keyExists = (obj, key) => {
    if (!obj || (typeof obj !== 'object' && !Array.isArray(obj))) {
      return false
    } else if (obj.hasOwnProperty(key)) {
      return true
    } else if (Array.isArray(obj)) {
      let parentKey = path.length ? path.pop() : ''

      for (let i = 0; i < obj.length; i++) {
        path.push(`${parentKey}[${i}]`)
        const result = keyExists(obj[i], key)
        if (result) {
          return result
        }
        path.pop()
      }
    } else {
      for (const k in obj) {
        path.push(k)
        const result = keyExists(obj[k], key)
        if (result) {
          return result
        }
        path.pop()
      }
    }
    return false
  }

  keyExists(ob, key)

  return path
}
