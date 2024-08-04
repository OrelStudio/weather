'use client'

import {useCallback, useEffect, useState} from 'react'

import Weather from '@/app/components/Weather'

import getLocation from '@/app/utils/location'
import {Location} from '@/app/types/location'
import {resultType} from '@/app/types/result'

const Home = () => {
  const [location, setLocation] = useState<Location | null>({name: 'London', latitude: 51.5074, longitude: 0.1278, countryCode: 'GB', country: 'UK'})
  // const weather = useWeather(location?.latitude || 0, location?.longitude || 0)

  const checkLocation = useCallback(() => {
    const localStorageItem = localStorage.getItem('location')
    if (localStorageItem) {
      setLocation(JSON.parse(localStorageItem))
    } else {
      getLocation().then((result) => {
        setLocation(result)
        localStorage.setItem('location', JSON.stringify(result))
      })
    }
  }, [])

  const onSelect = useCallback((result: resultType) => {
    setLocation(result)
    localStorage.setItem('location', JSON.stringify(result))
  }, [])

  useEffect(() => {
    checkLocation()
    // because we want to run this only once we can ignore the dependency array
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Weather location={location} onSelect={onSelect} />
  )
}

export default Home
