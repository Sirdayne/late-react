import { useCallback } from "react"
import { getLocale } from './getLocale'

const useFormatDate = () => {
  const locale = getLocale()
  return useCallback((timestamp) => {
      const date = new Date(timestamp)
      return date.toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    },
    []
  )
}

export default useFormatDate
