'use client'

import React, {useMemo, useState, useEffect, memo} from 'react'
import {Space, Skeleton} from 'antd'

import usePrevious from '@/app/Hooks/usePrevious'

import Number from '../Number'
import Mini from './Mini'
import {getWeatherCode} from '@/app/utils/weather'

import styles from './Headline.module.scss'

interface HeadlineProps {
  high: number,
  low: number,
  weatherCode: number,
  temperature: number,
  className: string
  isLoading: boolean
}

const Headline: React.FC<HeadlineProps> = ({high, low, weatherCode, temperature, className = '', isLoading}) => {
  const prevHigh = usePrevious(high)
  const prevLow = usePrevious(low)
  const prevWeatherCode = usePrevious(weatherCode)
  const prevTemperature = usePrevious(temperature)
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
      {loading ? <Skeleton.Input active style={{height: 108, marginBottom: '40px'}} /> : <h1 className={styles.title}>{weather}</h1>}
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
