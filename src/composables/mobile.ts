import { useMediaQuery } from '@vueuse/core'

export function useMobile() {
  const isMobile = useMediaQuery('(min-width: 0px) and (max-width: 1024px)')
  return { isMobile }
}
