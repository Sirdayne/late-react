import '../../../assets/styles/Honesty/HonestySeedChip.scss'
import arrowLeft from '../../../assets/img/arrowLeft.svg'
import arrowRight from '../../../assets/img/arrowRight.svg'
import { useSelector } from 'react-redux'
import { getFairnessGameData } from '../../../state/selectors/fairnessGameSelectors'

function HonestySeedChip({ fairnessSeed, iterationMinus, iterationPlus }) {
  const fairnessGameData = useSelector(getFairnessGameData)

  return (
    <div className="honesty-seed-chip-border">
      {(fairnessSeed?.nextActionId || fairnessGameData?.iteration > 0) && <div className="honesty-seed-chip-arrow honesty-seed-chip-arrow_left">
        <img onClick={iterationMinus} src={arrowLeft} alt="Arrow Icon" />
      </div>}
      <div className="honesty-seed-chip-arrow honesty-seed-chip-arrow_right">
        <img onClick={iterationPlus} src={arrowRight} alt="Arrow Icon" />
      </div>
      <div className="honesty-seed-chip-container">
        <div className="honesty-seed-chip"></div>
        <div className="honesty-seed-chip-text">{fairnessSeed?.gameContext?.multiplier}×</div>
      </div>
    </div>
  )
}

export default HonestySeedChip
