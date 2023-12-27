import { useRef, useEffect, useState } from 'react'

export const useMedia = (query = ''): boolean => {
  const mediaRef = useRef<MediaQueryList>()
  const queryRef = useRef<string>()

  if (queryRef.current !== query) {
    mediaRef.current = window.matchMedia(query)
    queryRef.current = query
  }

  const { matches } = mediaRef.current
  const [, setState] = useState(matches)

  useEffect(() => {
    const fn = (media) => setState(media.matches)
    mediaRef.current.addEventListener('change', fn)
    return () => mediaRef.current.removeEventListener('change', fn)
  }, [query])

  return matches
}
