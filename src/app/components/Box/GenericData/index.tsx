import React from 'react'
import styles from './GenericData.module.scss'

import usePrevious from '@/app/hooks/usePrevious'
import useDataLinger from '@/app/hooks/useDataLinger'

interface GenericDataProps {
  title: string | null,
  subtitle: string | null,
  description: string | null
}

/**
 * @description A component to display generic data inside a box
 * @prop {string} title - The title of the data
 */
const GenericData: React.FC<GenericDataProps> = ({title, subtitle, description}) => {
  const prevTitle = useDataLinger(usePrevious(title))
  const prevSubtitle = useDataLinger(usePrevious(subtitle))
  const prevDescription = useDataLinger(usePrevious(description))

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>{title ? prevTitle : title}</span>
        <span className={styles.subtitle}>{subtitle ? prevSubtitle : subtitle}</span>
      </div>
      <div>
        <span className={styles.description}>{description ? prevDescription : description}</span>
      </div>
    </div>
  )
}

export default GenericData
