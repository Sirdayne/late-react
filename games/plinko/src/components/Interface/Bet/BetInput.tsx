import '../../../assets/styles/ui/Input.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBet,
  getDenominator,
} from '../../../state/selectors/balanceSelectors'
import { setBet } from '../../../state/slices/balanceSlice'
import { useCheckMinMaxBet } from '../hooks/useCheckMinMaxBet'
import { useRounding } from '../hooks/useRounding'

function BetInput({ disabled = false, invalid }) {
  const dispatch = useDispatch()
  const [betValue, setBetValue] = useState('1')
  const bet = useSelector(getBet)
  const denominator = useSelector(getDenominator)
  const formatRounding = useRounding()
  const checkMinMaxBet = useCheckMinMaxBet()

  const onBlurBet = () => {
    const formatBet = checkMinMaxBet(formatRounding(betValue))
    dispatch(setBet(Number(formatBet * denominator)))
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
      <input className="input-ref"
             disabled={disabled}
             value={betValue}
             onBlur={onBlurBet}
             onChange={(e) => handleChange(e.target.value)}
             type="text"
             inputMode="decimal"
             pattern="[0-9]*\.?[0-9]*" />
    </div>
  )
}

export default BetInput
