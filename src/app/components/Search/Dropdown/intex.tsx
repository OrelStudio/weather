import React, {useCallback, memo} from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import {ResultType} from '@/app/types/Result'

import styles from './Dropdown.module.scss'

interface DropdownProps {
  data: ResultType[]
  isOpen: boolean
  onSelect: (result: ResultType) => void
}

const Dropdown: React.FC<DropdownProps> = ({data, isOpen, onSelect}) => {
  const onClick = useCallback((result: ResultType) => {
    onSelect(result)
  }, [onSelect])

  return (
    <div className={classNames(styles.wrapper, {[styles.open]: isOpen})}>
      {data.map((result) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div className={styles.item} key={result.name} onClick={() => onClick(result)} role='button' tabIndex={0}>
          <div className={styles.result}>
            <div className={styles.title}>
              <div className={styles.flag}>
                <Image src={result.countryFlag} alt={result.countryCode} width={15} height={15} />
              </div>
              <span>{result.name}</span>
            </div>
            <span className={styles.code}>{result.countryCode}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default memo(Dropdown)
