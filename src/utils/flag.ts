export const getFlagEmoji = (countryCode = '') => {
  if (countryCode.length !== 2) {
    return '🌐'
  }
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}
