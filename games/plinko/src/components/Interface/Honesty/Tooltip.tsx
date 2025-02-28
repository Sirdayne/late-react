import '../../../assets/styles/Honesty/Tooltip.scss'
import infoTooltipIcon from '../../../assets/img/infoTooltipIcon.svg'
import tooltipArrow from '../../../assets/img/tooltipArrow.svg'
import { useState } from 'react'
import ReactDOM from 'react-dom'

function Tooltip({ children, tooltipId }) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="tooltip">

      <div className="tooltip-img"
           onMouseEnter={() => setShowTooltip(true)}
           onMouseLeave={() => setShowTooltip(false)}
      >
        <img src={infoTooltipIcon} alt="Info icon" />

        {showTooltip && <div className="tooltip-arrow">
          <img src={tooltipArrow} alt="Tooltip Arrow" />
        </div>}
      </div>

      {showTooltip &&
        ReactDOM.createPortal(
          children,
          document.getElementById(tooltipId)
        )}
    </div>
  )
}

export default Tooltip
