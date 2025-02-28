import { useRef } from "react"
import "../../../assets/styles/Autoplay/RangeSlider.scss"

interface RangeSliderProps {
  value: number
  onChange: (newValue: number) => void
}

function RangeSlider({ value, onChange }: RangeSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null)

  const updateValue = (clientX: number) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const newValue = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    onChange(newValue)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return
    updateValue(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    updateValue(e.touches[0].clientX)
  }

  return (
    <div className="range-slider"
         onMouseDown={(e) => updateValue(e.clientX)}
         onMouseMove={handleMouseMove}
         onTouchStart={(e) => updateValue(e.touches[0].clientX)}
         onTouchMove={handleTouchMove}>
      <div
        className="range-slider-track"
        ref={sliderRef}
      >
        <div className="range-slider-fill" style={{ width: `${value}%` }} />
        <div className="range-slider-thumb" style={{ left: `${value}%` }} />
      </div>
    </div>
  )
}

export default RangeSlider
