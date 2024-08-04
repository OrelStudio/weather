import React, {memo} from 'react'
import {Skeleton} from 'antd'

import usePrevious from '@/app/Hooks/usePrevious'

import styles from './DateSection.module.scss'

interface DateSectionProps {
  year: string
  month: string
  day: string
  isLoading: boolean
}

const DateSection: React.FC<DateSectionProps> = ({year, month, day, isLoading}) => {
  const prevYear = usePrevious(year)
  const prevMonth = usePrevious(month)
  const prevDay = usePrevious(day)

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
