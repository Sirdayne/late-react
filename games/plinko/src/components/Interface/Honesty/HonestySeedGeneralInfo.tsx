import '../../../assets/styles/Honesty/HonestySeed.scss'
import { useL10n } from '@apis-games-front/use-assets'
import { useSelector } from 'react-redux'
import useFormatTime from './hooks/useFairnessTime'
import { getDenominator } from '../../../state/selectors/balanceSelectors'
import { getFairnessSeed } from '../../../state/selectors/fairnessSeedSelectors'

function HonestySeedGeneralInfo() {
  const HONESTY_TIME = useL10n(`Honesty.TIME`)
  const FORM_BET = useL10n(`Form.BET`)
  const HONESTY_PROFIT = useL10n(`Honesty.PROFIT`)

  const fairnessSeed = useSelector(getFairnessSeed)
  const denominator = useSelector(getDenominator)
  const formatTime = useFormatTime()

  return (
    <>
      {fairnessSeed && <div className="honesty-seed honesty-seed-info">
        <div className="honesty-seed-row">
          <div className="honesty-seed-text">
            {HONESTY_TIME}
          </div>
          <div className="honesty-seed-item">
            {formatTime(fairnessSeed.data)}
          </div>
        </div>
        <div className="honesty-seed-row">
          <div className="honesty-seed-text">
            {FORM_BET}
          </div>
          <div className="honesty-seed-item">
            {fairnessSeed.betAmount / denominator}
          </div>
        </div>
        <div className="honesty-seed-row">
          <div className="honesty-seed-text">
            {HONESTY_PROFIT}
          </div>
          <div className="honesty-seed-item">
            {fairnessSeed.winAmount / denominator}
          </div>
        </div>
      </div>}
    </>
  )
}

export default HonestySeedGeneralInfo
