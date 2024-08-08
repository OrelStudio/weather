import React, {ReactNode, useMemo, memo} from 'react'
import Image from 'next/image'

import Effect from './Effect'

import {getImageName, getEffect} from '@/app/utils/weather'

import usePrevious from '@/app/Hooks/usePrevious'
import useDataLinger from '@/app/Hooks/useDataLinger'

import styles from './Overlay.module.scss'

interface ImageObject {
  name: string
  src: string
  color?: string
}

// Names of image files
const images: ImageObject[] = [
  {name: 'clearSky', src: '/clearSky.jpg', color: '#0c65d9'},
  {name: 'darkClouds', src: '/darkClouds.png', color: '#4b4d5b'},
  {name: 'drizzle', src: '/drizzle.jpg', color: '#cbd4db'},
  {name: 'fog', src: '/fog.jpg', color: '#5d656e'},
  {name: 'mainlyClear', src: '/mainlyClear.jpg', color: '#2389ed'},
  {name: 'overcast', src: '/overcast.png', color: '#686868'},
  {name: 'partlyCloudy', src: '/partlyCloudy.jpg', color: '#5296c5'},
  {name: 'storm', src: '/storm.jpg', color: '#404d55'},
]
// #0a518b
interface OverlayProps {
  children: ReactNode
  weatherCode: number
}

/**
 * @description A component to wrap content with an overlay
 * @prop {ReactNode} children - The content to wrap
 * @prop {number} weatherCode - The weather code, used to determine the background image
 * @returns {React.ReactElement} The Overlay component
 */
const Overlay: React.FC<OverlayProps> = ({children, weatherCode}) => {
  const prevWeatherCode = useDataLinger(usePrevious(weatherCode))
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
