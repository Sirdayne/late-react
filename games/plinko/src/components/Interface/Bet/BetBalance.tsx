import '../../../assets/styles/Bet/Wallet.scss'
import balanceIcon from '../../../assets/img/balance.svg'
import { useL10n } from '@apis-games-front/use-assets'
import { useCallback } from 'react'
import { Big } from 'big.js'
import { useSelector } from 'react-redux'
import { getBalance, getCurrency, getDenominator, getRounding } from '../../../state/selectors/balanceSelectors'

function BetBalance() {
  const balance = useSelector(getBalance)
  const rounding = useSelector(getRounding)
  const denominator = useSelector(getDenominator)
  const currency = useSelector(getCurrency)
  const FORM_BALANCE = useL10n(`Form.BALANCE`)

  const showBalance = useCallback(
    (num: number) => {
      if (num < 0) return `0,${'0'.repeat(rounding)}`
      return new Big(num)
        .div(denominator)
        .round(rounding, Big.roundDown)
        .toFixed(rounding)
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
    [denominator, rounding]
  )

  return (
    <>
      <div className="wallet-label">
        <img className="wallet-label-icon" src={balanceIcon} alt="Balance icon" />
        <span className="wallet-label-text">{FORM_BALANCE}</span>
      </div>

      <div className="wallet-balance">
        <span className="wallet-balance-value">{showBalance(balance)}</span>
        <span className="wallet-balance-currency">{currency}</span>
      </div>
    </>
  )
}

export default BetBalance
