import React, {memo} from 'react'
import {Skeleton} from 'antd'

import usePrevious from '@/app/Hooks/usePrevious'
import useDataLinger from '@/app/Hooks/useDataLinger'

import styles from './DateSection.module.scss'

interface DateSectionProps {
  year: string
  month: string
  day: string
  isLoading: boolean
}

/**
 * @description A component to display the date
 * @prop {string} year - The year to display
 * @prop {string} month - The month to display
 * @prop {string} day - The day to display
 * @prop {boolean} isLoading - Whether the component is loading
 * @returns {React.ReactElement} The DateSection component
 */
const DateSection: React.FC<DateSectionProps> = ({year, month, day, isLoading}) => {
  const prevYear = useDataLinger(usePrevious(year))
  const prevMonth = useDataLinger(usePrevious(month))
  const prevDay = useDataLinger(usePrevious(day))

  return (
    <div className={styles.date}>
      {isLoading ? (<Skeleton.Input active />) : (
        <>
          <p>
            {`${year || prevYear}/`}
          </p>
          <p>
            {`${month || prevMonth}/`}
          </p>
          <p>
            {day || prevDay}
          </p>
        </>
      )}
    </div>
  )
}

export default memo(DateSection)
