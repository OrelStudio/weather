import {useEffect, useCallback, useSyncExternalStore} from 'react'

/**
 * @description Subscribes to local storage events related to a key
 * @param callback - The callback to call when the key changes
 * @param key - The key to subscribe to
 * @returns A function to unsubscribe from the event
 */
const subscribeToKey = (key: string, callback: () => void) => {
  const onStorageEvent = (e: StorageEvent) => {
    if (e.key === key) {
      callback()
    }
  }

  window.addEventListener('storage', onStorageEvent)
  return () => window.removeEventListener('storage', onStorageEvent)
}

const getLocalStorageItem = (key: string) => {
  const item = localStorage.getItem(key)

  if (item) {
    return JSON.parse(item)
  }

  return undefined
}

const setLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description Custom hook to use local storage as a state
 * @param {string} key - The key to store the value in local storage
 * @param {T} initialValue - The initial value to set in local storage
 * @returns The value from local storage and a function to set the value
 */
const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const getSnapshot = useCallback(() => getLocalStorageItem(key), [key])
  // curried function to subscribe to local storage events
  const subscribe = useCallback((callback: () => void) => subscribeToKey(key, callback), [key])
  const snapshot = useSyncExternalStore<T>(subscribe, getSnapshot)

  const setState = useCallback((value: T): void => {
    const newValue = typeof value === 'function' ? value(snapshot) : value
    setLocalStorage(key, newValue)
  }, [key, snapshot])

  useEffect(() => {
    if (getLocalStorageItem(key) === null && typeof initialValue !== 'undefined') {
      setLocalStorage(key, initialValue)
    }
  }, [key])

  return [snapshot ? snapshot : initialValue, setState]
}

export default useLocalStorage
