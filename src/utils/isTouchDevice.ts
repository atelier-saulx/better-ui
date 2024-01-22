export const isTouchDevice = (): boolean => {
  return (
    typeof 'global' !== undefined &&
    (navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0)
  )
}
