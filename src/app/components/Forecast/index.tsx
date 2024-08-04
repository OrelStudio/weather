'use client'

import React, {memo, useRef} from 'react'
import {LineChart, Line, XAxis, ResponsiveContainer} from 'recharts'
import {forecastType} from '@/app/types/forecast'

import styles from './Forecast.module.scss'

interface ForecastProps {
  forecast: forecastType[]
}

const Forecast: React.FC<ForecastProps> = ({forecast}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart width={300} height={100} data={forecast}>
          <XAxis dataKey='dayName' />
          {/* <ReferenceLine stroke='red' /> */}
          <Line
            type='monotone'
            dataKey='maxTemperature'
            stroke='#8884d8'
            strokeWidth={5}
            label={{fontSize: 20}}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default memo(Forecast)
