import { useRef } from 'react'

export function useDebounceCallback () {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const debounceCallback = (callback: () => void, debounce = 1000) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(callback, debounce)
  }
  const clearRef = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }
  return { debounceCallback, clearRef }
}
