import React, {ReactNode, useMemo, memo} from 'react'
import Image from 'next/image'

import Effect from './Effect'

import {getImageName, getEffect} from '@/app/utils/weather'

import usePrevious from '@/app/Hooks/usePrevious'

import styles from './Overlay.module.scss'

interface ImageObject {
  name: string
  src: string
  color?: string
}

// Names of image files
const images: ImageObject[] = [
  {name: 'clearSky', src: 'https://i.ibb.co/nPy6rx2/ClearSky.jpg', color: '#0c65d9'},
  {name: 'darkClouds', src: 'https://i.ibb.co/5LMrn5C/dark-Clouds.png', color: '#4b4d5b'},
  {name: 'drizzle', src: 'https://i.ibb.co/kyQ6mqg/drizzle.jpg', color: '#cbd4db'},
  {name: 'fog', src: 'https://i.ibb.co/Tc9RfMC/fog.jpg', color: '#5d656e'},
  {name: 'mainlyClear', src: 'https://i.ibb.co/9WLF0rG/mainly-Clear.jpg', color: '#2389ed'},
  {name: 'overcast', src: 'https://i.ibb.co/ng1JVqP/overcast.png', color: '#686868'},
  {name: 'partlyCloudy', src: 'https://i.ibb.co/G73YqSK/partly-Cloudy.jpg', color: '#5296c5'},
  {name: 'storm', src: 'https://i.ibb.co/zbRnM0L/storm.jpg', color: '#404d55'},
]
// #0a518b
interface OverlayProps {
  children: ReactNode
  weatherCode: number
}

const Overlay: React.FC<OverlayProps> = ({children, weatherCode}) => {
  const prevWeatherCode = usePrevious(weatherCode)
  const image = useMemo(() => {
    const imageName = getImageName(weatherCode || prevWeatherCode)
    return images.find((img) => img.name === imageName)!
  }, [weatherCode, prevWeatherCode])

  const prevImage = useMemo(() => {
    const imageName = getImageName(prevWeatherCode)
    return images.find((img) => img.name === imageName)!
  }, [prevWeatherCode])

  return (
    <div className={styles.overlay}>
      <meta name='theme-color' content={image.color} />
      <div className={styles.image}>
        <Image src={image.src} layout='fill' objectFit='cover' alt='Weather image' />
        {prevImage.src !== image.src && (
          // If the weather code changes, this, the previous image, will be displayed and fade out
          <Image src={prevImage.src} layout='fill' objectFit='cover' alt='Weather image' className={styles.fadeOut} />
        )}
        <Effect type={getEffect(weatherCode)} />
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

const arePropsEqual = (prevProps: OverlayProps, newProps: OverlayProps) => {
  // previosly had a weather code,
  // but now it's null meaning the data is loading and we should not re-render
  if (prevProps.weatherCode !== null && newProps.weatherCode === null) {
    return true
  }

  return Object.is(prevProps, newProps)
}

export default memo(Overlay, arePropsEqual)
