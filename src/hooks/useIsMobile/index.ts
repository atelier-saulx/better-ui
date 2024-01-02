import { useMedia } from '../useMedia/index.js'

export function useIsMobile() {
  return useMedia('(max-width: 768px)')
}
