import useSWR from 'swr'

import useDataLinger from './useDataLinger'

import {processWeatherData} from '@/app/utils/weather'
import {RawWeatherData, WeatherData} from '@/app/types/WeatherData'

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

/**
 * @description Fetches weather data from the API
 * @param {number} latitude - The latitude of the location
 * @param {number} longitude - The longitude of the location
 * @returns {WeatherData | null} The weather data
 * first returning null while the data is being fetched
 * then returning the processed weather data each time the data changes without null values
 */
const useWeather = (latitude: number, longitude: number): WeatherData | null => {
  const {data} = useSWR(latitude && longitude ? getLink(latitude, longitude) : null, fetcher)
  const weather = useDataLinger<RawWeatherData>(data as RawWeatherData)

  // will return null while the data is being fetched only once
  return weather ? processWeatherData(weather) : null
}

export default useWeather
