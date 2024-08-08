'use client'

import React, {useRef, useCallback, useState} from 'react'
import {SearchOutlined} from '@ant-design/icons'
import classNames from 'classnames'
import {Skeleton} from 'antd'

import Dropdown from './Dropdown/intex'

import useOutside from '@/app/Hooks/useOutside'
import useDebounced from '@/app/Hooks/useDebounced'
import search from '@/app/utils/search'

import {ResultType} from '@/app/types/Result'
import styles from './Search.module.scss'

interface SearchProps {
  onSelect: (result: ResultType) => void,
  isLoading: boolean,
}

/**
 * @description A search component, auto-completes the search query with a list of countries
 * @prop {function} onSelect - The function to call when a country is selected
 * @prop {boolean} isLoading - Whether the component is loading
 * @returns {React.ReactElement} The Search component
 */
const Search: React.FC<SearchProps> = ({onSelect, isLoading}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const [countries, setCountries] = useState<ResultType[]>([])
  const [value, setValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setValue('')
    setCountries([])
    if (inputRef.current) {
      inputRef.current.blur()
    }
  }, [])

  const searchCountry = useDebounced((query: string) => {
    setCountries([])
    if (!query) {
      return
    }
    search(query).then((data) => {
      if (!data) {
        return
      }
      const result = data.map((c) => ({
        name: c.name,
        countryCode: c.countryCode,
        longitude: c.longitude,
        latitude: c.latitude,
        countryFlag: `https://open-meteo.com/images/country-flags/${c.countryCode.toLowerCase()}.svg`,
        country: c.country,
      }))
      setCountries(result)
    })
  }, 500)

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    searchCountry(e.target.value)
  }, [searchCountry])

  // when the search icon is clicked
  const onClick = useCallback(() => {
    if (!isOpen && inputRef.current) {
      inputRef.current.focus() // focus on the input when clicking the search icon
      open()
    }
  }, [isOpen, open])

  // when the user presses the escape key
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      close()
    }
  }, [close])

  const select = useCallback((result: ResultType) => {
    close()
    onSelect(result)
  }, [close, onSelect])

  useOutside(searchRef, close)

  return (
    <div className={classNames(styles.wrapper, {[styles.open]: isOpen})}>
      {isLoading ? <Skeleton.Input active className={styles.skeleton} style={{height: 40}} /> : (
        <>
          <div className={styles.search} onClick={onClick} ref={searchRef} onKeyDown={onKeyDown} role='button' tabIndex={0}>
            <div className={styles.input}>
              <input
                type='text'
                placeholder='Search city'
                ref={inputRef}
                onChange={onChange}
                value={value}
              />
              <SearchOutlined className={styles.icon} />
            </div>
            <Dropdown data={countries} isOpen={isOpen} onSelect={select} />
          </div>
          <div className={styles.background} />
        </>
      )}
    </div>
  )
}

export default Search
