import {useCallback, useRef} from 'react'

const useDebounced = <T extends (...args: any[]) => void>(callback: T, delay: number) => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  return useCallback((...args: Parameters<T>) => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    timeout.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay])
}

export default useDebounced
