import { isTouchDevice } from './isTouchDevice.js'

export const isPhone = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    isTouchDevice() &&
    window.innerWidth < 800 &&
    window.innerHeight < 1400
  )
}
