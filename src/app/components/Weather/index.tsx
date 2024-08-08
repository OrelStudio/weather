import React, {memo} from 'react'

import {Skeleton} from 'antd'

import Headline from './Headline'
import DateSection from './DateSection'

import Box from '@/app/components/Box'
import Compass from '@/app/components/Compass'
import GenericData from '@/app/components/Box/GenericData'
import Forecast from '@/app/components/Forecast'
import Search from '@/app/components/Search'

import {WeatherData} from '@/app/types/WeatherData'
import {Location} from '@/app/types/Location'

import styles from './Weather.module.scss'
import {ResultType} from '@/app/types/Result'

interface WeatherProps {
  location: Location | null
  onSelect: (result: ResultType) => void
  weather: WeatherData | null
  isLoading: boolean
}

const getFeelsLikeDescription = (feelsLike: number, temperature: number) => {
  if (feelsLike === temperature) {
    return 'Same as current temperature'
  }
  return feelsLike > temperature ? 'Warmer than current temperature' : 'Colder than current temperature'
}

const getPerccipitationDescription = (
  nextPrecipitation: number | null,
  hoursUntilNextPrecipitation: number,
  daysUntilLast: number,
) => (nextPrecipitation ? `${nextPrecipitation} mm expected in ${hoursUntilNextPrecipitation} hours` : `None expected in the next ${daysUntilLast} days`)

const isWeatherValid = (
  weather: WeatherData | null,
): weather is (WeatherData & {current: {feelsLike: number, temperature: number}}
) => (!!weather && typeof weather.current.feelsLike === 'number' && typeof weather.current.temperature === 'number')

/**
 * @description Display the weather page
 * @prop {Location} location - The location to display
 * @prop {function} onSelect - The function to call when a location is selected
 * @prop {WeatherData} weather - The weather data to display
 * @prop {boolean} isLoading - Whether the component is loading
 * @returns {React.ReactElement} The Weather Page
 */
const Weather: React.FC<WeatherProps> = ({location, onSelect, weather, isLoading}) => (
  <>
    <div className={styles.header}>
      <div>
        <DateSection
          year={weather?.current.year || ''}
          month={weather?.current.month || ''}
          day={weather?.current.day || ''}
          isLoading={isLoading}
        />
        <div className={styles.location}>
          {isLoading ? <Skeleton.Input active /> : <h1>{`${location?.name}, ${location?.countryCode}`}</h1>}
        </div>
      </div>
      <Search onSelect={onSelect} isLoading={isLoading} />
    </div>
    <div className='content'>
      <Headline
        className={styles.section}
        high={weather?.current.high || 0}
        low={weather?.current.low || 0}
        weatherCode={weather?.current.weatherCode || 0}
        temperature={weather?.current.temperature || 0}
        isLoading={isLoading}
      />
      <div className={styles.section}>
        <div className={styles.boxContainer}>
          <Box title='Wind' isLoading={isLoading}>
            <Compass direction={weather?.current.windDirection} title={weather?.current.windSpeed} subtitle='km/h' />
          </Box>
          <Box title='Feels Like' isLoading={isLoading}>
            <GenericData
              title={weather ? `${weather?.current.feelsLike}°` : null}
              subtitle=''
              description={isWeatherValid(weather)
                ? getFeelsLikeDescription(
                  weather?.current.feelsLike,
                  weather?.current.temperature,
                ) : null}
            />
          </Box>
          <Box title='Humidity' isLoading={isLoading}>
            <GenericData
              title={weather ? `${weather?.current.humidity}%` : null}
              subtitle=''
              description={weather ? `The dew point is ${weather?.current.dew_point}° right now` : null}
            />
          </Box>
          <Box title='Precipitation' isLoading={isLoading}>
            <GenericData
              title={weather ? `${weather?.current.precipitation} mm` : null}
              subtitle='in last 24h'
              description={isWeatherValid(weather)
                ? getPerccipitationDescription(
                  weather?.current.nextPrecipitation,
                  weather?.current.hoursUntilNextPrecipitation,
                  weather?.current.daysUntilLast,
                ) : null}
            />
          </Box>
        </div>
      </div>
      <div className={styles.longSection}>
        {isLoading ? <Skeleton.Input active style={{marginTop: '15px', marginLeft: '15px'}} /> : <p>Forecast</p>}
        <div className={styles.forecastWrapper}>
          <Forecast forecast={weather?.forecast || []} />
        </div>
      </div>
    </div>
  </>
)

export default memo(Weather)
