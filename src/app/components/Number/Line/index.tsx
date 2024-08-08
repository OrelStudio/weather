import React, {useMemo, memo} from 'react'
import classNames from 'classnames'

import styles from './Line.module.scss'

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

export default memo(Line)
