const codesEnglish: Record<number, string> = {
  0: 'Clear Sky',
  1: 'Mainly Clear',
  2: 'Partly Cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Fog and Depositing Rime Fog',
  51: 'Light Drizzle',
  53: 'Drizzle',
  55: 'Drizzle',
  56: 'Light Freezing Drizzle',
  57: 'Freezing Drizzle',
  61: 'Light Rain',
  63: 'Rain',
  65: 'Heavy Rain',
  66: 'Light Freezing Rain',
  67: 'Freezing Rain',
  71: 'Slight Snow Fall',
  73: 'Snow Fall',
  75: 'Heavy Snow Fall',
  77: 'Snow Grains',
  80: 'Slight Showers',
  81: 'Showers',
  82: 'Heavy Showers',
  85: 'Snow Showers',
  86: 'Heavy Snow Showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with Hail',
  99: 'Thunderstorm with Heavy Hail',
}
type Effect = 'rain' | 'snow' | 'fog' | 'none'
const effects: Record<number, Effect> = {
  0: 'none',
  1: 'none',
  2: 'none',
  3: 'none',
  45: 'fog',
  48: 'fog',
  51: 'rain',
  53: 'rain',
  55: 'rain',
  56: 'rain',
  57: 'rain',
  61: 'rain',
  63: 'rain',
  65: 'rain',
  66: 'rain',
  67: 'rain',
  71: 'snow',
  73: 'snow',
  75: 'snow',
  77: 'snow',
  80: 'rain',
  81: 'rain',
  82: 'rain',
  85: 'snow',
  86: 'snow',
  95: 'rain',
  96: 'rain',
  99: 'rain',
}

const images: Record<number, string> = {
  0: 'clearSky',
  1: 'mainlyClear',
  2: 'partlyCloudy',
  3: 'overcast',
  45: 'fog',
  48: 'fog',
  51: 'fog',
  53: 'fog',
  55: 'fog',
  56: 'fog',
  57: 'fog',
  61: 'fog',
  63: 'fog',
  65: 'fog',
  66: 'fog',
  67: 'overcast',
  71: 'drizzle',
  73: 'drizzle',
  75: 'drizzle',
  77: 'drizzle',
  80: 'overcast',
  81: 'overcast',
  82: 'overcast',
  85: 'drizzle',
  86: 'drizzle',
  95: 'darkClouds',
  96: 'darkClouds',
  99: 'darkClouds',
}

const getWeatherCode = (code: number): string => codesEnglish[code]

const getImageName = (code: number): string => images[code]

const getEffect = (code: number): Effect => effects[code]

const processWeatherData = (data: any) => {
  // time format is yyyy-mm-ddThh:mm
  const currentTime = data.current.time.split('T')
  const currentDayIndex = data.daily.time.findIndex((time: string) => time === currentTime[0])

  // filter the hourly data from the current time
  const hourlyDataFromNowIndex = data.hourly.time.findIndex((time: string) => time.split(':')[0] === data.current.time.split(':')[0])
  const precipitationsFromNow = data.hourly.precipitation.slice(hourlyDataFromNowIndex)
  const hourlyDataFromNow = data.hourly.time.slice(hourlyDataFromNowIndex)

  // find the next precipitation and its time
  const nextPrecipitation = precipitationsFromNow.find(
    (precipitation: number) => precipitation !== data.current.precipitation,
  ) || null
  const nextPrecipitationIndex = precipitationsFromNow.findIndex(
    (precipitation: number) => precipitation === (nextPrecipitation || 0),
  )
  const nextPrecipitationTime = hourlyDataFromNow[nextPrecipitationIndex]

  // how many hours left from current time to the next precipitation
  const diffInMilliseconds = new Date(`${nextPrecipitationTime}:00`).getTime() - new Date(`${data.current.time}:00`).getTime()
  const hoursUntilNextPrecipitation = diffInMilliseconds / (1000 * 60 * 60)

  // how many days left from current time to the last hour in the hourly data
  const totalDiffInMilliseconds = new Date(`${data.hourly.time.at(-1)}:00`).getTime() - new Date(`${data.current.time}:00`).getTime()
  const daysUntilLast = Math.floor((totalDiffInMilliseconds / (1000 * 60 * 60)) / 24)

  const current = {
    year: currentTime[0].split('-')[0],
    month: currentTime[0].split('-')[1],
    day: currentTime[0].split('-')[2],
    hour: currentTime[1].split(':')[0],
    minute: currentTime[1].split(':')[1],
    weatherCode: data.current.weather_code,
    dew_point: data.hourly.dew_point_2m[0],

    temperature: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    feelsLike: data.current.apparent_temperature,
    isDay: data.current.is_day,
    precipitation: data.current.precipitation,
    nextPrecipitation,
    hoursUntilNextPrecipitation: Math.abs(hoursUntilNextPrecipitation),
    daysUntilLast,
    wind_speed: data.current.wind_speed_10m,
    wind_direction: data.current.wind_direction_10m,

    high: data.daily.temperature_2m_max[currentDayIndex],
    low: data.daily.temperature_2m_min[currentDayIndex],
  }

  const forecast = data.daily.time.map((time: string, index: number) => ({
    time,
    year: time.split('-')[0],
    month: time.split('-')[1],
    day: time.split('-')[2],
    dayName: new Date(time).toLocaleDateString('en-US', {weekday: 'long'}),
    date: `${time.split('-')[2]}/${time.split('-')[1]}`,
    weatherCode: data.daily.weather_code[index],
    maxTemperature: data.daily.temperature_2m_max[index],
    minTemperature: data.daily.temperature_2m_min[index],
  }))

  return {current, forecast}
}

export {getWeatherCode, getImageName, processWeatherData, getEffect}
