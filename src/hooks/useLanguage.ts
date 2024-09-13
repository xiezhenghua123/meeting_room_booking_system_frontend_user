import i18next from 'i18next'
import { useState } from 'react'

const useLanguage = () => {
  const [language, setLanguage] = useState<string>(i18next.language)
  const resources = i18next.store.data
  const languageArr = Object.keys(resources).map(key => ({
    value: key,
    label: resources[key].label
  }))

  const changeLanguage = (lng: string) => {
    i18next.changeLanguage(lng)
    setLanguage(lng)
  }

  return {
    language,
    languageArr,
    changeLanguage
  }
}

export default useLanguage
