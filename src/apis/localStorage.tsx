const setLocalStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, value)
}

const getLocalStorage = (key: string) => {
  const storageData = window.localStorage.getItem(key)
  return storageData
}

export { getLocalStorage, setLocalStorage }
