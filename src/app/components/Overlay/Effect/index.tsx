import React, {memo} from 'react'

import styles from './Effect.module.scss'

interface EffectProps {
  type: 'rain' | 'snow' | 'fog' | 'none'
}

const effectText = {
  rain: '',
  snow: '❅',
  fog: '',
}

/**
 * Effect component
 * @description This component is responsible for rendering the effect of the weather
 */
const Effect: React.FC<EffectProps> = ({type}) => (
  <div className={styles.wrapper}>
    {type === 'none' ? null : (
      <div className={styles.effect}>
        {Array.from({length: 100}, (_, i) => (
          <div key={i} className={`${styles.outer} ${styles[`${type}-o`]}`}>
            <span key={i} className={styles[`${type}-back`]}>{effectText[type]}</span>
            <span key={i} className={styles[type]}>{effectText[type]}</span>
          </div>
        ))}
      </div>
    )}
  </div>
)

export default memo(Effect)
