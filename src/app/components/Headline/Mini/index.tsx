import React, {memo} from 'react'

import Number from '../../Number'

import styles from './Mini.module.scss'

interface MiniProps {
  number: number,
  numberFontSize: number
  spanFontSize: number
  children: React.ReactNode
}

const Mini: React.FC<MiniProps> = ({number, numberFontSize, spanFontSize, children}) => (
  <div className={styles.mini}>
    <span style={{fontSize: spanFontSize}}>{children}</span>
    <div style={{display: 'flex'}}>
      <Number number={number} fontSize={numberFontSize} className='' />
      <span>°</span>
    </div>
  </div>
)

export default memo(Mini)
