'use client'

import React, {useMemo, useState, useEffect, memo} from 'react'
import {Space, Skeleton} from 'antd'

import usePrevious from '@/app/hooks/usePrevious'
import useDataLinger from '@/app/hooks/useDataLinger'

import Number from '@/app/components/Number'
import TextMorph from '@/app/components/TextMorph'
import Mini from './Mini'

import {getWeatherCode} from '@/app/utils/weather'

import styles from './Headline.module.scss'

interface HeadlineProps {
  high: number,
  low: number,
  weatherCode: number,
  temperature: number,
  className: string,
  isLoading: boolean
}

/**
 * @description Displays the current weather and temperature, high and low
 * @prop {number} high - The high temperature
 * @prop {number} low - The low temperature
 * @prop {number} weatherCode - The weather code
 * @prop {number} temperature - The current temperature
 * @prop {boolean} isLoading - Whether the component is loading
 * @returns {React.ReactElement} Headline
 */
const Headline: React.FC<HeadlineProps> = ({high, low, weatherCode, temperature, className = '', isLoading}) => {
  const prevHigh = useDataLinger(usePrevious(high))
  const prevLow = useDataLinger(usePrevious(low))
  const prevWeatherCode = useDataLinger(usePrevious(weatherCode))
  const prevTemperature = useDataLinger(usePrevious(temperature))
  const weather = useMemo(
    () => getWeatherCode(weatherCode || prevWeatherCode),
    [weatherCode, prevWeatherCode],
  )
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768) // because window is not defined in SSR
  }, [])

  const loading = useMemo(() => isLoading && !prevHigh, [isLoading, prevHigh])

  return (
    <div className={`${styles.headline} ${className}`}>
      {loading ? <Skeleton.Input active style={{height: 108, marginBottom: '40px'}} /> : <TextMorph text={weather} className={styles.title} />}
      <div className={styles.temperatures}>
        <Space.Compact direction='vertical' size='large'>
          <div className={styles.temp}>
            {loading ? <Skeleton.Input active style={{height: isMobile ? 60 : 120, marginTop: '17px'}} size='small' /> : (
              <>
                <Number
                  number={temperature || prevTemperature}
                  fontSize={isMobile ? 48 : 96}
                  className={styles.tempNumber}
                />
                <span>°</span>
              </>
            )}
          </div>
        </Space.Compact>
        <div className={styles.highlow}>
          {loading ? (
            <Skeleton.Input active style={{marginBottom: '10px'}} />
          ) : (
            <Mini
              number={high || prevHigh}
              spanFontSize={isMobile ? 16 : 25}
              numberFontSize={isMobile ? 16 : 32}
            >
              H
            </Mini>
          )}
          {loading ? (
            <Skeleton.Input active />
          ) : (
            <Mini
              number={low || prevLow}
              spanFontSize={isMobile ? 16 : 25}
              numberFontSize={isMobile ? 16 : 32}
            >
              H
            </Mini>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(Headline)
