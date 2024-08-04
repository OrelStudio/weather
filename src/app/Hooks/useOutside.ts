import React, {useEffect, useCallback} from 'react'

const useOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  const onClick = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      // Clicked outside the element
      callback()
    }
  }, [ref, callback])

  useEffect(() => {
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [onClick])
}

export default useOutside
