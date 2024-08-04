'use client'

import React, {useMemo, memo} from 'react'
import classNames from 'classnames'

import styles from './Number.module.scss'

interface LineProps {
  number: number,
  fontSize: number
}

const Line: React.FC<LineProps> = ({number = 0, fontSize = 32}) => {
  const transformY = useMemo(() => (`translateY(-${(number) * 10}%)`), [number])

  return (
    <div className={styles.line} style={{transform: transformY}}>
      <div className={styles.block} style={{fontSize}}>
        {Array.from({length: 10}, (_, i) => i).map((i) => (
          <div
            className={classNames(styles.number, {[styles.active]: i === number})}
            key={i}
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  )
}

interface NumberProps {
  number: number
  fontSize: number
  className: string
}

// Odometer effect with effect that numbers are moving up or down
const Number: React.FC<NumberProps> = ({number = 0, fontSize = 32, className = ''}) => {
  const isNegative = useMemo(() => number < 0, [number])
  const nums = useMemo(() => (String(Math.abs(number)).split('.')), [number])
  const odometerHeight = useMemo(() => fontSize * 1.5, [fontSize])
  // const dotSize = useMemo(() => fontSize * 0.13, [fontSize])

  return (
    <div className={`${styles.number} ${className}`}>
      <div className={styles.odometer} style={{height: odometerHeight}}>
        {isNegative && <div className={styles.negative} style={{fontSize}}>-</div>}
        {nums[0].split('').map((n) => (<Line key={n} number={parseInt(n, 10)} fontSize={fontSize} />))}

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

export default memo(Number)
