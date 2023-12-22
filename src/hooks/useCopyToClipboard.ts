import { useState, useEffect, useCallback } from 'react'

export const useCopyToClipboard = (
  text: string | number
): [boolean, () => void] => {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(() => {
    if (!copied) {
      navigator.clipboard.writeText(String(text))
      setCopied(true)
    }
  }, [text])
  useEffect(() => () => setCopied(false), [text])
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2500)
      return () => clearTimeout(timeout)
    }
  }, [copied])
  return [copied, copy]
}
