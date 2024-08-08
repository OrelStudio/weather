export type RawWeatherData = {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: {
    time: string
    interval: string
    temperature_2m: string
    relative_humidity_2m: string
    apparent_temperature: string
    is_day: string
    precipitation: string
    rain: string
    showers: string
    snowfall: string
    weather_code: string
    cloud_cover: string
    wind_speed_10m: string
    wind_direction_10m: string
  }
  current: {
    time: string
    interval: number
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    is_day: number
    precipitation: number
    rain: number
    showers: number
    snowfall: number
    weather_code: number
    cloud_cover: number
    wind_speed_10m: number
    wind_direction_10m: number
  }
  hourly_units: {
    time: string
    temperature_2m: string
    dew_point_2m: string
    apparent_temperature: string
    precipitation_probability: string
    precipitation: string
    rain: string
    showers: string
    snowfall: string
    snow_depth: string
    weather_code: string
    cloud_cover: string
    visibility: string
    wind_speed_10m: string
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    dew_point_2m: number[]
    apparent_temperature: number[]
    precipitation_probability: number[]
    precipitation: number[]
    rain: number[]
    showers: number[]
    snowfall: number[]
    snow_depth: number[]
    weather_code: number[]
    cloud_cover: number[]
    visibility: number[]
    wind_speed_10m: number[]
  }
  daily_units: {
    time: string
    weather_code: string
    temperature_2m_max: string
    temperature_2m_min: string
    sunrise: string
    sunset: string
    daylight_duration: string
    sunshine_duration: string
    uv_index_max: string
    precipitation_sum: string
    rain_sum: string
    showers_sum: string
    snowfall_sum: string
    precipitation_hours: string
    precipitation_probability_max: string
  }
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    sunrise: string[]
    sunset: string[]
    daylight_duration: number[]
    sunshine_duration: number[]
    uv_index_max: number[]
    precipitation_sum: number[]
    rain_sum: number[]
    showers_sum: number[]
    snowfall_sum: number[]
    precipitation_hours: number[]
    precipitation_probability_max: number[]
  }
}
export type Forecast = {
  date: string
  day: string
  dayName: string
  maxTemperature: number
  minTemperature: number
  month: string
  time: string
  weatherCode: number
  year: string
}
export type WeatherData = {
  current: {
    day: string
    daysUntilLast: number
    dew_point: number
    feelsLike: number
    high: number
    hour: string
    hoursUntilNextPrecipitation: number
    humidity: number
    isDay: number
    low: number
    minute: string
    month: string
    nextPrecipitation: number | null
    precipitation: number
    temperature: number
    weatherCode: number
    windDirection: number
    windSpeed: number
    year: string
  }
  forecast: Forecast[]
}
