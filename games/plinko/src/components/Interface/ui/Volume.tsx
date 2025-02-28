import '../../../assets/styles/ui/Volume.scss'
import { useRef } from 'react'

function Volume({ disabled = false, onMinus, onPlus}) {
  const intervalRef = useRef<any>(null)

  const startIncreasing = () => {
    if (!disabled) {
      intervalRef.current = setInterval(() => {
        onPlus()
      }, 100)
    }
  }

  const startDecreasing = () => {
    if (!disabled) {
      intervalRef.current = setInterval(() => {
        onMinus()
      }, 100)
    }
  }

  const stopInterval = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  return (
    <div className="volume">
      <button
        onPointerDown={startDecreasing}
        onPointerUp={stopInterval}
        onPointerLeave={stopInterval}
        onClick={onMinus}
        disabled={disabled}
        className="volume-btn volume-btn-minus"
      >
        <div className="volume-btn-minus-line"></div>
      </button>
      <button
        onPointerDown={startIncreasing}
        onPointerUp={stopInterval}
        onPointerLeave={stopInterval}
        onClick={onPlus}
        disabled={disabled}
        className="volume-btn volume-btn-plus"
      >
        <div className="volume-btn-plus-line"></div>
        <div className="volume-btn-plus-line-vertical"></div>
      </button>
    </div>
  )
}

export default Volume
