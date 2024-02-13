export const isSafari = (): boolean => {
  const isSafari = global.safari !== undefined
  return isSafari
}
