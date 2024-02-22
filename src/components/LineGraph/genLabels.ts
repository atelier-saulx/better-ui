export default (height, ySpread, maxY) => {
  const labelLen = Math.floor(height / 36)
  const labelHeight = height / labelLen
  const labels = []

  if (ySpread) {
    for (let i = 0; i < labelLen + 1; i++) {
      const x = maxY - (ySpread / labelLen) * i
      labels.push({
        y: i * labelHeight,
        label: isNaN(x) ? 0 : x,
      })
    }
  } else {
    for (let i = 0; i < labelLen; i++) {
      labels.push({ y: i * labelHeight })
    }
  }

  return { labels, labelHeight }
}
