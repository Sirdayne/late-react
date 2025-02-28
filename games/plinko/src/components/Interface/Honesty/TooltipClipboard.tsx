import '../../../assets/styles/Honesty/TooltipClipboard.scss'
import copyInput from '../../../assets/img/copyInput.svg'
import { useState } from 'react'
import tooltipArrow from '../../../assets/img/tooltipArrow.svg'

function TooltipClipboard({ copyText, copyLabel = '' }) {
  const [showTooltip, setShowTooltip] = useState(false)

  const copyToClipboard = () => {
    setShowTooltip(true)
    handleCopy()
    setTimeout(() => {
      setShowTooltip(false)
    }, 1000)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="tooltip-clipboard" onClick={copyToClipboard}>

      {showTooltip && <div className="tooltip-clipboard-arrow">
        <img src={tooltipArrow} alt="Tooltip Arrow" />
      </div>}

      <div className="tooltip-clipboard-img">
        <img src={copyInput} alt="Info icon" />
      </div>

      {showTooltip && <div className="tooltip-clipboard-hint">
        <div className="tooltip-clipboard-hint-copy">
          {copyLabel}
        </div>
      </div>}
    </div>
  )
}

export default TooltipClipboard
