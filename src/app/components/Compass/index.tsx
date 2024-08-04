import React, {memo} from 'react'
import SVGCompass from './SVGCompass'

import usePrevious from '@/app/Hooks/usePrevious'

import styles from './Compass.module.scss'

interface CompassProps {
  direction: number
  title: string
  subtitle: string
}

const Compass: React.FC<CompassProps> = ({direction, title, subtitle}) => {
  const prevTitle = usePrevious(title)
  const prevDirection = usePrevious(direction)
  const prevSubtitle = usePrevious(subtitle)

  return (
    <div className={styles.wrapper}>
      <SVGCompass style={{transform: `rotate(${direction || prevDirection}deg)`}} />
      <div className={styles.content}>
        <p className={styles.title}>{title || prevTitle}</p>
        <p className={styles.subtitle}>{subtitle || prevSubtitle}</p>
      </div>
    </div>
  )
}

export default memo(Compass)
