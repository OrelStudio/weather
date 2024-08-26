import React, {memo} from 'react'
import SVGCompass from './SVGCompass'

import usePrevious from '@/app/hooks/usePrevious'
import useDataLinger from '@/app/hooks/useDataLinger'

import styles from './Compass.module.scss'

interface CompassProps {
  direction: number | undefined
  title: number | undefined
  subtitle: string
}

/**
 * @description A component to display a compass with a title and subtitle
 * @prop {number} direction - The direction of the compass
 * @prop {number} title - The title of the compass
 * @prop {string} subtitle - The subtitle of the compass
 * @returns {React.ReactElement} The Compass component
 */
const Compass: React.FC<CompassProps> = ({direction, title, subtitle}) => {
  const prevTitle = useDataLinger(usePrevious(title))
  const prevDirection = useDataLinger(usePrevious(direction))
  const prevSubtitle = useDataLinger(usePrevious(subtitle))

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
