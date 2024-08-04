'use client'

import {useEffect, useRef} from 'react'

const usePrevious = <T>(value: T): T => {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}

const useDataLinger = <T>(value: T) => {
  const ref = useRef(value)

  if (!!value) {
    ref.current = value
  }

  return ref.current
}

export default usePrevious
