import { useCallback } from "react"
import { getLocale } from './getLocale'

const useFormatTime = () => {
  const locale = getLocale()
  return useCallback((timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }, [])
}

export default useFormatTime
