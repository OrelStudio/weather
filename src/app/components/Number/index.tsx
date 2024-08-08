'use client'

import React, {useMemo} from 'react'

import Line from './Line'

import styles from './Number.module.scss'

interface NumberProps {
  number: number
  fontSize: number
  className: string
}

/**
 * @description A component to display a number with odometer effect with effect
 * that numbers are moving up or down
 * @param {number} number - The number to display
 * @param {number} fontSize - The font size of the number
 * @returns {React.ReactElement} The Number component
 */
const Number: React.FC<NumberProps> = ({number = 0, fontSize = 32, className = ''}) => {
  const isNegative = useMemo(() => number < 0, [number])
  const nums = useMemo(() => (String(Math.abs(number)).split('.')), [number])
  const odometerHeight = useMemo(() => fontSize * 1.5, [fontSize])
  // const dotSize = useMemo(() => fontSize * 0.13, [fontSize])

  return (
    <div className={`${styles.number} ${className}`}>
      <div className={styles.odometer} style={{height: odometerHeight}}>
        {isNegative && <div className={styles.negative} style={{fontSize}}>-</div>}
        {/* eslint-disable-next-line react/no-array-index-key */}
        {nums[0].split('').map((n, i) => (<Line key={i} number={parseInt(n, 10)} fontSize={fontSize} />))}

        {/* {nums[1] && (
          <div className={styles.dot}>
            <span style={{width: dotSize, height: dotSize, marginBottom: fontSize * 0.3}}>.</span>
          </div>
        )} */}
        {/* {nums[1] && (
          nums[1].split('').map((n) => (<Line key={n} number={parseInt(n, 10)} fontSize={32} />))
        )} */}
      </div>
    </div>
  )
}

export default Number
