import '../../../assets/styles/Honesty/HonestySeed.scss'
import { useL10n } from '@apis-games-front/use-assets'
import { useSelector } from 'react-redux'
import HonestySeedInfoClipboard from './HonestySeedInfoClipboard'
import { getFairnessSeed } from '../../../state/selectors/fairnessSeedSelectors'

function HonestySeedInfo() {
  const HONESTY_GAME = useL10n(`Honesty.GAME`)
  const CLIENT_SEED = useL10n(`Honesty.CLIENT_SEED`)
  const SERVER_SEED_HASH = useL10n(`Honesty.SERVER_SEED_HASH`)
  const SERVER_SEED = useL10n(`Honesty.SERVER_SEED`)
  const NUM_BET_PAIR_SEED = useL10n(`Honesty.NUM_BET_PAIR_SEED`)
  const FORM_RISK = useL10n(`Form.RISK`)
  const RISK_HIGH = useL10n(`RiskLevel.HIGH`)
  const FORM_ROW = useL10n(`Form.ROW`)
  const HONESTY_ACTIVE_SEED_COPIED = useL10n(`Honesty.ACTIVE_SEED_COPIED`)
  const HONESTY_SERVER_SEED_HASH_COPIED = useL10n(`Honesty.ACTIVE_SERVER_HASH_COPIED`)
  const HONESTY_SERVER_SEED_COPIED = useL10n(`Honesty.ACTIVE_SERVER_SEED_COPIED`)

  const fairnessSeed = useSelector(getFairnessSeed)

  return (
    <>
      {fairnessSeed && <div className="honesty-seed honesty-seed-info">
        <div className="honesty-seed-row">
          <div className="honesty-seed-text">
            {HONESTY_GAME}
          </div>
          <div className="honesty-seed-item">
            {fairnessSeed.gameName}
          </div>
        </div>
        <div className="honesty-seed-row">
          <div className="honesty-seed-text">
            {CLIENT_SEED}
          </div>
          <div className="honesty-seed-clipboard">
            <span className="honesty-seed-truncate">{fairnessSeed.clientSeed}</span>
            <HonestySeedInfoClipboard copyText={fairnessSeed.clientSeed} copyLabel={HONESTY_ACTIVE_SEED_COPIED} />
          </div>
        </div>
        <div className="honesty-seed-row">
          <div className="honesty-seed-text">
            {SERVER_SEED_HASH}
          </div>
          <div className="honesty-seed-clipboard">
            <span className="honesty-seed-truncate">{fairnessSeed.serverSeedHash}</span>
            <HonestySeedInfoClipboard copyText={fairnessSeed.serverSeedHash} copyLabel={HONESTY_SERVER_SEED_HASH_COPIED} />
          </div>
        </div>
        <div className="honesty-seed-row">
          <div className="honesty-seed-text">
            {SERVER_SEED}
          </div>
          <div className="honesty-seed-clipboard">
            <span className="honesty-seed-truncate">{fairnessSeed.serverSeed}</span>
            <HonestySeedInfoClipboard copyText={fairnessSeed.serverSeed} copyLabel={HONESTY_SERVER_SEED_COPIED} />
          </div>
        </div>
        <div className="honesty-seed-row">
          <div className="honesty-seed-text">
            {NUM_BET_PAIR_SEED}
          </div>
          <div className="honesty-seed-item">
            {fairnessSeed.iterations}
          </div>
        </div>
        <div className="honesty-seed-row">
          <div className="honesty-seed-text">
            {FORM_RISK}
          </div>
          <div className="honesty-seed-item">
            {fairnessSeed?.gameContext?.payout?.risk}
          </div>
        </div>
        <div className="honesty-seed-row">
          <div className="honesty-seed-text">
            {FORM_ROW}
          </div>
          <div className="honesty-seed-item">
            {fairnessSeed?.gameContext?.payout?.rows}
          </div>
        </div>
      </div>}
    </>
  )
}

export default HonestySeedInfo
