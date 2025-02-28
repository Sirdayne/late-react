import { FairGameData, FairListData } from '@apis-games-front/plinko-game-api'
import { getLocale } from './getLocale'

export const useProcessedFairnessList = (list: FairGameData | FairListData) => {
  const locale = getLocale()
  return list.reduce((acc, item, index) => {
    const currentDate = new Date(item.time).toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

    const prevDate = index > 0 ? new Date(list[index - 1].time).toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }) : null

    if (index === 0 || currentDate !== prevDate) {
      acc.push({ ...item, formatDate: currentDate })
    } else {
      acc.push({ ...item })
    }

    return acc
  }, [])
}
