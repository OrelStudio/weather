'use client'

import {useCallback, useEffect} from 'react'

import Overlay from '@/app/components/Overlay'
import Weather from '@/app/components/Weather'

import useWeather from '@/app/hooks/useWeather'
import useLocalStorage from '@/app/hooks/useLocalStorage'

import getLocation from '@/app/utils/location'
import {Location} from '@/app/types/Location'
import {ResultType} from '@/app/types/Result'

const Home = () => {
  const [location, setLocation] = useLocalStorage<Location | null>('location', null)
  const weatherData = useWeather(location?.latitude || 0, location?.longitude || 0)

  const checkLocation = useCallback(() => {
    // if location is null
    // it means that it wasnt in local storage yet so we need to get it then set it
    if (!location) {
      getLocation().then((result) => {
        setLocation(result)
      })
    }
  }, [location, setLocation])

  const onSelect = useCallback((result: ResultType) => {
    setLocation(result)
  }, [setLocation])

  useEffect(() => {
    checkLocation()
    // because we want to run this only once we can ignore the dependency array
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Overlay weatherCode={weatherData?.current.weatherCode || 0}>
      <Weather
        location={location}
        onSelect={onSelect}
        weather={weatherData}
        isLoading={!weatherData || !location}
      />
    </Overlay>
  )
}

export default Home
