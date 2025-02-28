import '../../../assets/styles/ui/Input.scss'
import { useSelector } from 'react-redux'
import {
  getBet,
  getDenominator,
} from '../../../state/selectors/balanceSelectors'
import { useEffect } from 'react'
import { useCheckMinMaxBet } from '../hooks/useCheckMinMaxBet'
import { useRounding } from '../hooks/useRounding'

function InputBetAutoplay({ disabled = false, betValue, setBetValue, invalid = false }) {
  const bet = useSelector(getBet)
  const denominator = useSelector(getDenominator)
  const checkMinMaxBet = useCheckMinMaxBet()
  const formatRounding = useRounding()

  const onBlurBet = () => {
    const formatBet = checkMinMaxBet(formatRounding(betValue))
    setBetValue(String(formatBet))
  }

  const handleChange = (value) => {
    const numValue = value.replace(/[^0-9.,]/g, "")
    const dottedValue = numValue && numValue.includes(',') ? numValue.replace(/,/g, ".") : numValue
    setBetValue(dottedValue)
  }

  useEffect(() => {
    const betValue = formatRounding(bet / denominator)
    setBetValue(String(betValue))
  }, [bet])

  return (
    <div className={invalid ? 'input input-invalid' : 'input'}>
      <input disabled={disabled}
             value={betValue}
             onBlur={onBlurBet}
             onChange={(e) => handleChange(e.target.value)}
             type="text"
             inputMode="decimal"
             pattern="[0-9]*\.?[0-9]*"
      />
    </div>
  )
}

export default InputBetAutoplay
