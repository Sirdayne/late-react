import '../../../assets/styles/Honesty/HonestySeedInfoClipboard.scss'
import copyInput from '../../../assets/img/copyInput.svg'
import { useState } from 'react'
import tooltipArrow from '../../../assets/img/tooltipArrow.svg'

function HonestySeedInfoClipboard({ copyText, copyLabel }) {
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
    <div className="honesty-seed-info-clipboard">
      <img src={copyInput} alt="Copy icon" onClick={copyToClipboard} />

      {showTooltip && <div className="honesty-seed-info-clipboard-arrow">
        <img src={tooltipArrow} alt="Tooltip Arrow" />
      </div>}

      {showTooltip && <div className="honesty-seed-info-clipboard-hint">
        <div className="honesty-seed-info-clipboard-hint-copy">
          {copyLabel}
        </div>
      </div>}
    </div>
  )
}

export default HonestySeedInfoClipboard
