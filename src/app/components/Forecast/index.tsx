'use client'

import React, {memo, useMemo} from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  DotProps,
  YAxis,
} from 'recharts'
import {ForecastType} from '@/app/types/Forecast'

interface ForecastProps {
  forecast: ForecastType[] | []
}

interface CustomDotProps extends DotProps {
  payload?: {
    temp: number
    dayLabel: string
  }
}

const CustomDot: React.FC<CustomDotProps> = ({cx = 0, cy = 0, payload}) => (
  <g>
    <circle cx={cx} cy={cy} r={5} fill='#fff' />
    <text
      x={cx}
      y={cy - 18}
      textAnchor='middle'
      fontSize={14}
      fontWeight={600}
      fill='#fff'
    >
      {payload?.temp}
    </text>
    <text
      x={cx}
      y={cy + 22}
      textAnchor='middle'
      fontSize={14}
      fill='#fff'
    >
      {payload?.dayLabel}
    </text>
  </g>
)

/**
 * @description A component to display a graph of the forecast
 * @prop {ForecastType[]} forecast - The forecast to display
 * @returns {React.ReactElement} The Forecast component
 */
const PX_PER_POINT = 120

const Forecast: React.FC<ForecastProps> = ({forecast}) => {
  const data = useMemo(() => forecast.map((f) => {
    const date = new Date(+f.year, +f.month - 1, +f.day)
    return {
      temp: f.maxTemperature,
      dayLabel: date.toLocaleDateString('en-US', {weekday: 'short'}),
    }
  }), [forecast])

  const chartMinWidth = Math.max(data.length * PX_PER_POINT, 600)

  return (
    <div style={{overflowX: 'auto', WebkitOverflowScrolling: 'touch'}}>
      <div style={{width: '100%', minWidth: chartMinWidth, height: 220}}>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={data}
            margin={{top: 40, right: 25, left: 25, bottom: 40}}
          >
            <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
            <Line
              type='monotone'
              dataKey='temp'
              stroke='#e8e0d4'
              strokeWidth={4}
              dot={<CustomDot />}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default memo(Forecast)
