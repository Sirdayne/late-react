import { useCallback, useEffect, useRef } from 'react'
import '../../../assets/styles/Modals/ModalBets.scss'
import Btn from '../ui/Btn'
import { useDispatch, useSelector } from 'react-redux'
import { closeMaxBet } from '../../../state/slices/dialogSlice'
import {
  getBalance,
  getBetmax,
  getBetValues,
  getCurrency,
  getDenominator,
} from '../../../state/selectors/balanceSelectors'
import { setBet } from '../../../state/slices/balanceSlice'
import { useL10n } from '@apis-games-front/use-assets'
import { getGameFieldRight } from '../../../state/selectors/gameFieldPositionSelectors'

function ModalBets() {
  const dispatch = useDispatch()
  const modalRef = useRef(null)
  const modalOverlayRef = useRef(null)
  const currency = useSelector(getCurrency)
  const balance = useSelector(getBalance)
  const betmax = useSelector(getBetmax)
  const betValues = useSelector(getBetValues)
  const denominator = useSelector(getDenominator)
  const right = useSelector(getGameFieldRight)

  const AUTOPLAY_BET = useL10n(`Autoplay.BET`)
  const AUTOPLAY_CLOSE = useL10n(`Autoplay.CLOSE`)

  const setBetByItem = useCallback((betValue) => {
    const lowest = Math.min(balance, betmax, betValue)
    dispatch(setBet(lowest))
    dispatch(closeMaxBet())
  }, [dispatch, betmax])

  const setMaxBet = () => {
    const lowest = Math.min(balance, betmax)
    dispatch(setBet(lowest))
    dispatch(closeMaxBet())
  }

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target) && modalOverlayRef.current.contains(e.target)) {
      dispatch(closeMaxBet())
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const MAX_BET = useL10n(`SettingsPanel.MAX_BET`)

  return (
    <div className={!right ? 'modal-bets-overlay modal-bets-overlay-right' : 'modal-bets-overlay'} ref={modalOverlayRef}>
      <div className="modal-bets" ref={modalRef}>
        <div className="modal-bets-title">{AUTOPLAY_BET} {currency}</div>
        <div className="modal-bets-container">
          {betValues.map(betValue => (
            <div
              className="modal-bets-item"
              key={betValue}
              onClick={() => setBetByItem(betValue)}
            >
              {betValue / denominator}
            </div>
          ))}
        </div>
        <div className="modal-bets-container-max">
          <div className="modal-bets-item modal-bets-item-max" onClick={() => setMaxBet()}>
            {MAX_BET}
          </div>
        </div>
        <div className="modal-bets-btn">
          <Btn className="btn-outline modal-btn-cancel" onClick={() => dispatch(closeMaxBet())}>
            {AUTOPLAY_CLOSE}
          </Btn>
        </div>
      </div>
    </div>
  )
}

export default ModalBets
