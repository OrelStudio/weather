import React, {useMemo, memo} from 'react'
import useSWR from 'swr'

import {Skeleton} from 'antd'

import Overlay from '@/app/components/Overlay'
import Headline from '@/app/components/Headline'
import DateSection from '@/app/components/DateSection'
import Box from '@/app/components/Box'
import Compass from '@/app/components/Compass'
import GenericData from '@/app/components/Box/GenericData'
import Forecast from '@/app/components/Forecast'
import Search from '@/app/components/Search'

import {processWeatherData} from '@/app/utils/weather'
import {Location} from '@/app/types/location'

import styles from './Weather.module.scss'
import {resultType} from '@/app/types/result'

const getLink = (latitude: number, longitude: number) => (`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,cloud_cover,visibility,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_probability_max&past_days=2`)

const fetcher = (url: string) => fetch(url).then((response) => {
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  // artificially slow down the response
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(response.json())
  //   }, 100000)
  // })
  return response.json()
})

interface weatherProps {
  location: Location | null
  // eslint-disable-next-line no-unused-vars
  onSelect: (result: resultType) => void
}

const getFeelsLikeDesc = (feelsLike: number | undefined, temperature: number | undefined) => {
  if (!feelsLike || !temperature) return null
  if (feelsLike === temperature) return 'Same as current temperature'
  return feelsLike > temperature ? 'Warmer than current temperature' : 'Colder than current temperature'
}

const getPerccipitationDesc = (
  nextPrecipitation: number,
  hoursUntilNextPrecipitation: number,
  daysUntilLast: number,
) => (nextPrecipitation ? `${nextPrecipitation} mm expected in ${hoursUntilNextPrecipitation} hours` : `None expected in the next ${daysUntilLast} days`)

const Weather: React.FC<weatherProps> = ({location, onSelect}) => {
  const {data} = useSWR(location ? getLink(location.latitude, location.longitude) : null, fetcher)
  const weather = useMemo(() => (data ? processWeatherData(data) : null), [data])

  return (
    <Overlay weatherCode={weather?.current.weatherCode || 0}>
      <div className={styles.header}>
        <div>
          <DateSection
            year={weather?.current.year}
            month={weather?.current.month}
            day={weather?.current.day}
            isLoading={!data}
          />
          <div className={styles.location}>
            {!data ? <Skeleton.Input active /> : <h1>{`${location?.name}, ${location?.countryCode}`}</h1>}
          </div>
        </div>
        <Search onSelect={onSelect} isLoading={!data} />
      </div>
      <div className='content'>
        <Headline
          className={styles.section}
          high={weather?.current.high}
          low={weather?.current.low}
          weatherCode={weather?.current.weatherCode}
          temperature={weather?.current.temperature}
          isLoading={!data}
        />
        <div className={styles.section}>
          <div className={styles.boxContainer}>
            <Box title='Wind' isLoading={!data}>
              <Compass direction={weather?.current.wind_direction} title={weather?.current.wind_speed} subtitle='km/h' />
            </Box>
            <Box title='Feels Like' isLoading={!data}>
              <GenericData
                title={weather ? `${weather?.current.feelsLike}°` : null}
                subtitle=''
                description={
                  getFeelsLikeDesc(weather?.current.feelsLike, weather?.current.temperature)
                }
              />
            </Box>
            <Box title='Humidity' isLoading={!data}>
              <GenericData
                title={weather ? `${weather?.current.humidity}%` : null}
                subtitle=''
                description={weather ? `The dew point is ${weather?.current.dew_point}° right now` : null}
              />
            </Box>
            <Box title='Precipitation' isLoading={!data}>
              <GenericData
                title={weather ? `${weather?.current.precipitation} mm` : null}
                subtitle='in last 24h'
                description={weather
                  ? getPerccipitationDesc(
                    weather?.current.nextPrecipitation,
                    weather?.current.hoursUntilNextPrecipitation,
                    weather?.current.daysUntilLast,
                  ) : null}
              />
            </Box>
          </div>
        </div>
        <div className={styles.longSection}>
          {!data ? <Skeleton.Input active style={{marginTop: '15px', marginLeft: '15px'}} /> : <p>Forecast</p>}
          <div className={styles.forecastWrapper}>
            <Forecast forecast={weather?.forecast} />
          </div>
        </div>
      </div>
    </Overlay>
  )
}

export default memo(Weather)
