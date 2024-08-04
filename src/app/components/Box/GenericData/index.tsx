import React from 'react'
import styles from './GenericData.module.scss'

import usePrevious from '@/app/Hooks/usePrevious'

interface GenericDataProps {
  title: string | null,
  subtitle: string | null,
  description: string | null
}

const GenericData: React.FC<GenericDataProps> = ({title, subtitle, description}) => {
  const prevTitle = usePrevious(title)
  const prevSubtitle = usePrevious(subtitle)
  const prevDescription = usePrevious(description)

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
