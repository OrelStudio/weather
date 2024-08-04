import search from './search'
import {Location} from '../types/location'

const getState = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  if (timezone === '' || !timezone) {
    return null
  }

  // state
  return timezone.split('/')[1].replace('_', ' ')
}

const getLocation = (): Promise<Location> => {
  const state = getState()

  return search(state || 'Tokyo').then((data) => data[0]).catch(() => ({
    name: 'Tokyo',
    latitude: 35.6528,
    longitude: 139.8395,
    country: 'Japan',
    countryCode: 'JP',
  }))
}

export default getLocation
