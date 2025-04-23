import React from 'react'
import {Skeleton} from 'antd'
import classNames from 'classnames'

import styles from './Box.module.scss'

interface BoxProps {
  children: React.ReactNode,
  title: string
  isLoading: boolean
}

/**
 * @description Box component
 * @prop {React.ReactNode} children - The children of the component
 * @returns {React.ReactElement} The Box component
 */
const Box: React.FC<BoxProps> = ({ children, title, isLoading }) => (
  <div className={classNames(styles.box, { [styles.loading]: isLoading })}>
    <p className={styles.description}>
      {isLoading ? <Skeleton active /> : title}
    </p>

    {!isLoading && <div className={styles.content}>{children}</div>}
  </div>
)

export default Box
