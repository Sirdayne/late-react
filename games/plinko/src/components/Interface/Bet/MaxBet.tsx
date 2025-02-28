import '../../../assets/styles/Bet/MaxBet.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getBalance, getBet, getBetmax } from '../../../state/selectors/balanceSelectors'
import { openMaxBet } from '../../../state/slices/dialogSlice'
import { useCallback } from 'react'

function MaxBet({ disabled = false }) {
  const dispatch = useDispatch()
  const balance = useSelector(getBalance)
  const bet = useSelector(getBet)
  const betmax = useSelector(getBetmax)

  const lowest = Math.min(balance, betmax)

  const toggleMaxBet = useCallback(() => {
    if (!disabled) {
      dispatch(openMaxBet())
    }
  }, [dispatch, disabled])

  return (
    <button disabled={disabled} onClick={toggleMaxBet}
            className={Number(lowest) === Number(bet) ? 'max-bet max-bet-active' : 'max-bet'}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Icon_M">
          <path id="Vector" fillRule="currentColor" clipRule="evenodd"
                d="M18.3334 6.56371C18.3334 8.41683 15.0501 9.91908 11 9.91908C6.94994 9.91908 3.66669 8.41683 3.66669 6.56371C3.66669 4.71059 6.94994 3.20834 11 3.20834C15.0501 3.20834 18.3334 4.71059 18.3334 6.56371ZM17.8547 9.82342C16.5512 10.8839 13.9706 11.606 11.0001 11.606C8.02949 11.606 5.44887 10.8839 4.14541 9.8234C3.83609 10.1946 3.66669 10.5975 3.66669 11.0184C3.66669 12.8715 6.94994 14.3738 11 14.3738C15.0501 14.3738 18.3334 12.8715 18.3334 11.0184C18.3334 10.5975 18.164 10.1946 17.8547 9.82342ZM11.0001 16.024C13.9706 16.024 16.5512 15.3019 17.8547 14.2414C18.164 14.6126 18.3334 15.0154 18.3334 15.4363C18.3334 17.2894 15.0501 18.7917 11 18.7917C6.94994 18.7917 3.66669 17.2894 3.66669 15.4363C3.66669 15.0154 3.83609 14.6126 4.14541 14.2413C5.44887 15.3018 8.02949 16.024 11.0001 16.024Z"
                fill="currentColor" />
        </g>
      </svg>
    </button>
  )
}

export default MaxBet
