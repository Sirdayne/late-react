import { useSelector } from 'react-redux'
import {
  getBalance,
  getBetmax,
  getBetmin,
  getDenominator, getRounding,
} from '../../../state/selectors/balanceSelectors'

export function useCheckMinMaxBet() {
  const balance = useSelector(getBalance)
  const betmax = useSelector(getBetmax)
  const betmin = useSelector(getBetmin)
  const denominator = useSelector(getDenominator)
  const rounding = useSelector(getRounding)

  const checkMinMax = (bet: number) => {
    const formatBetmax = betmax / denominator
    const formatBetmin = betmin / denominator
    const formatBalance = balance / denominator
    let conditionBet = bet

    if (formatBalance < formatBetmax && bet > formatBalance) {
      const factor = 10 ** rounding
      conditionBet = Number(Math.floor(formatBalance * factor) / factor)
    } else if (bet > formatBetmax) {
      conditionBet = formatBetmax
    } else if (bet < formatBetmin) {
      conditionBet = formatBetmin
    }

    return String(conditionBet)
  }

  return checkMinMax
}
