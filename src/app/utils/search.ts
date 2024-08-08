import axios from 'axios'

import {SearchData} from '@/app/types/Search'

const search = (query: string): Promise<SearchData[]> => axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${query}`).then((response) => {
  const resData = response.data

  if (!resData || !resData.results) {
    return []
  }

  const data = resData.results.map((result: any) => {
    const countryCode = result.country_code === 'PS' ? 'IL' : result.country_code

    return {
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      country: result.country,
      countryCode,
    }
  })

  return data
})

export default search
