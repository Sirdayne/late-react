import { useCallback, useEffect, useRef, useState } from 'react'
import '../../../assets/styles/Autoplay/ModalAutoplay.scss'
import Btn from '../ui/Btn'
import { useDispatch, useSelector } from 'react-redux'
import { closeAutoplay } from '../../../state/slices/dialogSlice'
import { useL10n } from '@apis-games-front/use-assets'
import { getGameFieldRight } from '../../../state/selectors/gameFieldPositionSelectors'
import Volume from '../ui/Volume'
import RangeSlider from './RangeSlider'
import Checkbox from '../ui/Checkbox'
import InfinityRounds from './InfinityRounds'
import {
  getAutoplayMaxRounds,
  getAutoplaySpeed,
  getStopAutoplayOnBigWIn,
} from '../../../state/selectors/autoplaySelectors'
import {
  setAutoplayMaxRounds,
  setAutoplayRounds,
  setAutoplaySpeed,
  setStopAutoplayOnBigWIn,
} from '../../../state/slices/autoplaySlice'
import InputRounds from './InputRounds'
import { setBet } from '../../../state/slices/balanceSlice'
import { getBet, getBetStep, getDenominator } from '../../../state/selectors/balanceSelectors'
import { gotoAutoplayAsync } from '../../../state/slices/gameSlice'
import InputBetAutoplay from './InputBetAutoplay'
import { useRounding } from '../hooks/useRounding'
import { useCheckMinMaxBet } from '../hooks/useCheckMinMaxBet'

function ModalAutoplay() {
  const MAX_ROUNDS = 99999
  const DEFAULT_ROUNDS = 10
  const dispatch = useDispatch()
  const modalRef = useRef(null)
  const modalOverlayRef = useRef(null)
  const denominator = useSelector(getDenominator)
  const right = useSelector(getGameFieldRight)
  const [betValue, setBetValue] = useState(1)
  const speed = useSelector(getAutoplaySpeed)
  const stopAutoplay = useSelector(getStopAutoplayOnBigWIn)
  const maxRounds = useSelector(getAutoplayMaxRounds)
  const bet = useSelector(getBet)
  const betStep = useSelector(getBetStep)
  const [inputRounds, setInputRounds] = useState(0)
  const betSteps = [{ label: '1/2', val: 0.5 }, { label: '1/4', val: 0.25 }, { label: 'x2', val: 2 }, { label: 'x4', val: 4 }]
  const roundSteps = [10, 20, 50, 100]
  const formatRounding = useRounding()
  const checkMinMaxBet = useCheckMinMaxBet()
  const AUTOPLAY_AUTOPLAY = useL10n(`Autoplay.AUTOPLAY`)
  const AUTOPLAY_BET = useL10n(`Autoplay.BET`)
  const AUTOPLAY_SPEED_AUTOPLAY = useL10n(`Autoplay.SPEED_AUTOPLAY`)
  const AUTOPLAY_NUM_BALLS = useL10n(`Autoplay.NUM_BALLS`)
  const AUTOPLAY_STOP_EPIC_WIN = useL10n(`Autoplay.STOP_EPIC_WIN`)
  const AUTOPLAY_START = useL10n(`Autoplay.START`)
  const AUTOPLAY_CLOSE = useL10n(`Autoplay.CLOSE`)

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target) && modalOverlayRef.current.contains(e.target)) {
      dispatch(closeAutoplay())
    }
  }

  useEffect(() => {
    setInputRounds(maxRounds && maxRounds > 0 ? maxRounds : DEFAULT_ROUNDS)
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    const betValue = formatRounding(bet / denominator)
    setBetValue(betValue)
  }, [bet])

  const setStopAutoplayOnBigWin = useCallback((value) => {
    dispatch(setStopAutoplayOnBigWIn(value))
  }, [dispatch])

  const handleChangeSpeed = useCallback((value) => {
    dispatch(setAutoplaySpeed(value))
  }, [dispatch])

  const handleSetInfinityRounds = useCallback(() => {
    setInputRounds(inputRounds !== Infinity ? Infinity : 0)
  }, [inputRounds])

  const closeAutoplayModal = useCallback(() => {
    dispatch(setAutoplayRounds(0))
    dispatch(setAutoplayMaxRounds(0))
    dispatch(closeAutoplay())
  }, [dispatch])

  const startAutoplay = useCallback(() => {
    dispatch(setAutoplayRounds(Number(inputRounds)))
    dispatch(setAutoplayMaxRounds(Number(inputRounds)))
    dispatch(setBet(betValue * denominator))
    dispatch(gotoAutoplayAsync())
    dispatch(closeAutoplay())
  }, [dispatch, betValue, denominator, inputRounds])

  const plusBet = useCallback(() => {
    setBetValue(prev => {
      const newBet = prev + betStep / denominator
      const roundedBet = formatRounding(String(newBet))
      return Number(checkMinMaxBet(Number(roundedBet)))
    })
  }, [betStep, denominator, formatRounding, checkMinMaxBet])

  const minusBet = useCallback(() => {
    setBetValue(prev => {
      const newBet = prev - betStep / denominator
      const roundedBet = formatRounding(String(newBet))
      return Number(checkMinMaxBet(Number(roundedBet)))
    })
  }, [betStep, denominator, formatRounding, checkMinMaxBet])

  const multiplyBet = (val) => {
    const newBetValue = Number(betValue) * val
    const formatBet = checkMinMaxBet(formatRounding(String(newBetValue)))
    setBetValue(Number(formatBet))
  }

  const minusInputRounds = useCallback(() => {
    setInputRounds(prev => {
      if (prev === Infinity) {
        return MAX_ROUNDS
      }
      return prev - 1 <= 0 ? 0 : prev - 1
    })
  }, [])

  const plusInputRounds = useCallback(() => {
    setInputRounds(prev => {
      if (prev === Infinity) {
        return MAX_ROUNDS
      }
      if (prev >= MAX_ROUNDS) {
        return Infinity
      }
      return prev + 1
    })
  }, [])

  const addInputRounds = (step) => {
    if (inputRounds && inputRounds === Infinity) {
      setInputRounds(step)
    } else if (inputRounds >= MAX_ROUNDS) {
      setInputRounds(Infinity)
    } else {
      setInputRounds(Number(inputRounds) + step)
    }
  }

  return (
    <div className={!right ? 'modal-autoplay-overlay modal-autoplay-overlay-right' : 'modal-autoplay-overlay'} ref={modalOverlayRef}>
      <div className="modal-autoplay" ref={modalRef}>
        <div className="modal-autoplay-title">{AUTOPLAY_AUTOPLAY}</div>
        <div className="modal-autoplay-container">
          <div className="modal-autoplay-subtitle">{AUTOPLAY_BET}</div>
          <div className="modal-autoplay-row modal-autoplay-form">
            <div className="modal-autoplay-form-input">
              <InputBetAutoplay
                 betValue={betValue}
                 setBetValue={setBetValue}
              />
            </div>
            <div className="modal-autoplay-form-volume">
              <Volume
                disabled={false}
                onMinus={minusBet}
                onPlus={plusBet}
              />
            </div>
          </div>
          <div className="modal-autoplay-steps">
          {betSteps.map(betStep => (
              <div
                className="modal-autoplay-step"
                key={betStep.val}
                onClick={() => multiplyBet(betStep.val)}
              >
                {betStep.label}
              </div>
            ))}
          </div>
          <div className="modal-autoplay-subtitle">{AUTOPLAY_SPEED_AUTOPLAY}</div>
          <div className="modal-autoplay-range">
            <RangeSlider value={speed} onChange={handleChangeSpeed} />
          </div>
          <div className="modal-autoplay-subtitle">{AUTOPLAY_NUM_BALLS}</div>
          <div className="modal-autoplay-row modal-autoplay-form">
            <div className="modal-autoplay-form-input">
              <InputRounds maxRounds={MAX_ROUNDS}
                           inputRounds={inputRounds}
                           setInputRounds={setInputRounds}
              />
            </div>
            <div className="modal-autoplay-form-volume">
              <Volume
                onMinus={minusInputRounds}
                onPlus={plusInputRounds}
              />
            </div>
            <InfinityRounds value={inputRounds && inputRounds === Infinity} onChange={handleSetInfinityRounds}/>
          </div>
          <div className="modal-autoplay-steps">
            {roundSteps.map(roundStep => (
              <div
                className="modal-autoplay-step"
                key={roundStep}
                onClick={() => addInputRounds(roundStep)}
              >
                +{roundStep}
              </div>
            ))}
          </div>
        </div>
        <div className="modal-autoplay-checkbox">
          <Checkbox value={stopAutoplay}
                    onChange={setStopAutoplayOnBigWin}
                    label={AUTOPLAY_STOP_EPIC_WIN}
          />
        </div>
        <div className="modal-autoplay-btn">
          <Btn disabled={inputRounds <= 0} className="modal-autoplay-btn-start" onClick={() => startAutoplay()}>{AUTOPLAY_START}</Btn>
        </div>
        <div className="modal-autoplay-btn">
          <Btn className="btn-outline modal-autoplay-btn-cancel" onClick={() => closeAutoplayModal()}>
            {AUTOPLAY_CLOSE}
          </Btn>
        </div>
      </div>
    </div>
  )
}

export default ModalAutoplay
