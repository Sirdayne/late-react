import { useSelector } from 'react-redux'
import {
  getBetmin, getDenominator,
  getRounding
} from '../../../state/selectors/balanceSelectors'

export function useRounding() {
  const rounding = useSelector(getRounding)
  const betmin = useSelector(getBetmin)
  const denominator = useSelector(getDenominator)

  const round = (strNum: string): number => {
    const numRounded = Number(strNum).toFixed(rounding)
    return Number(numRounded) || betmin / denominator || 0.1
  }

  return round
}
