import '../../../assets/styles/ui/Volume.scss'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseBet, increaseBet, setStep } from '../../../state/slices/balanceSlice'

function VolumeBet({ disabled = false }) {
  const dispatch = useDispatch()
  const intervalRef = useRef<any>(null)

  const minusBet = () => {
    dispatch(decreaseBet())
  }

  const plusBet = () => {
    dispatch(increaseBet())
  }

  const startIncreasing = () => {
    if (!disabled) {
      intervalRef.current = setInterval(() => {
        dispatch(increaseBet())
      }, 100)
    }
  }

  const startDecreasing = () => {
    if (!disabled) {
      intervalRef.current = setInterval(() => {
        dispatch(decreaseBet())
      }, 100)
    }
  }

  const stopInterval = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    dispatch(setStep(0))
  }

  return (
    <div className="volume">
      <button
        onClick={minusBet}
        onPointerDown={startDecreasing}
        onPointerUp={stopInterval}
        onPointerLeave={stopInterval}
        disabled={disabled}
        className="volume-btn volume-btn-minus"
      >
        <div className="volume-btn-minus-line"></div>
      </button>
      <button
        onClick={plusBet}
        onPointerDown={startIncreasing}
        onPointerUp={stopInterval}
        onPointerLeave={stopInterval}
        disabled={disabled}
        className="volume-btn volume-btn-plus"
      >
        <div className="volume-btn-plus-line"></div>
        <div className="volume-btn-plus-line-vertical"></div>
      </button>
    </div>
  )
}

export default VolumeBet
