import React, {useEffect, useRef, useCallback, memo} from 'react'

import usePrevious from '@/app/hooks1/usePrevious'
import styles from './TextMorph.module.scss'

interface TextMorphProps {
  text: string
  morphTime?: number
  className?: string
}

const TextMorph: React.FC<TextMorphProps> = ({text, morphTime = 1000, className = ''}) => {
  const prevText = usePrevious(text) || ''
  const textRef = useRef<HTMLSpanElement>(null)
  const prevTextRef = useRef<HTMLSpanElement>(null)

  /**
   * set the morphing effect based on the fraction of the morph time elapsed
   */
  const setMorph = useCallback((fraction: number) => {
    if (prevTextRef.current && textRef.current) {
      textRef.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
      textRef.current.style.opacity = `${(fraction ** 0.4) * 100}%`

      prevTextRef.current.style.filter = `blur(${Math.min(8 / (1 - fraction) - 8, 100)}px)`
      prevTextRef.current.style.opacity = `${((1 - fraction) ** 0.4) * 100}%`
    }
  }, [])

  /**
   * start the morphing effect using requestAnimationFrame for smooth transitions
   */
  const startMorphing = useCallback(() => {
    let startTime: number | null = null

    const morph = (currentTime: number) => {
      if (!startTime) {
        // Initialize the start time
        startTime = currentTime
      }
      const elapsedTime = currentTime - startTime
      // Calculate the fraction of the morph time elapsed
      const fraction = Math.min(elapsedTime / morphTime, 1)

      // Apply the morphing effect
      setMorph(fraction)

      if (fraction < 1) {
        // Continue morphing until complete
        requestAnimationFrame(morph)
      }
    }

    requestAnimationFrame(morph)
  }, [setMorph, morphTime])

  /**
   * reset the text elements to their original state
   */
  const reset = useCallback(() => {
    if (prevTextRef.current && textRef.current) {
      textRef.current.style.filter = ''
      textRef.current.style.opacity = '100%'

      prevTextRef.current.style.filter = ''
      prevTextRef.current.style.opacity = '0%'
    }
  }, [])

  useEffect(() => {
    if (prevText !== text) {
      startMorphing() // start the morphing effect if the text has changed
    } else {
      reset() // reset the text elements if the text hasn't changed
    }
  }, [text, prevText, startMorphing, reset])

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} ${className}`}>
        <span className={styles.prevText} ref={prevTextRef}>{prevText}</span>
        <span className={styles.text} ref={textRef}>{text}</span>
      </div>

      {/* The SVG filter creates a merging effect for the text */}
      <svg id='filters' width='0' height='0'>
        <defs>
          <filter id='threshold'>
            {/**
              * It works by applying a threshold
              * pixels with sufficient opacity become fully opaque
              * while others become completely transparent
              */}
            <feColorMatrix
              in='SourceGraphic'
              type='matrix'
              values='1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140'
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}

export default memo(TextMorph)
