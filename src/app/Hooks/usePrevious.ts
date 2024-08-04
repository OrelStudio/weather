'use client'

import {useEffect, useRef} from 'react'

const usePrevious = (value: any) => {
  const ref = useRef(value)

  useEffect(() => {
    if (value) {
      ref.current = value
    }
  })

  return ref.current
}

export default usePrevious
