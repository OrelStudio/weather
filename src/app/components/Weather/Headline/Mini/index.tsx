import React, {memo} from 'react'

import Number from '../../../Number'

import styles from './Mini.module.scss'

interface MiniProps {
  number: number,
  numberFontSize: number
  spanFontSize: number
  children: React.ReactNode
}

/**
 * @description Component to display a number with a Celsius symbol in a pill shape
 * @prop {number} number - The number of degrees to display
 * @prop {number} numberFontSize - The font size of the number
 * @prop {number} spanFontSize - The font size of the celcius symbol
 * @returns {React.ReactElement} The Mini component
 */
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
