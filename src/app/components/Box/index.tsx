import React from 'react'
import {Skeleton} from 'antd'
import classNames from 'classnames'

import styles from './Box.module.scss'

interface BoxProps {
  children: React.ReactNode,
  title: string
  isLoading: boolean
}

const Box: React.FC<BoxProps> = ({children, title, isLoading}) => (
  <div className={classNames(styles.box, {[styles.loading]: isLoading})}>
    <div className={styles.description}>
      {isLoading ? <Skeleton active /> : <p>{title}</p>}
    </div>
    {!isLoading && children}
  </div>
)

export default Box
