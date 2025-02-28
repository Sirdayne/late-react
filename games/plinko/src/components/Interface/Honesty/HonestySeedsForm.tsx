import '../../../assets/styles/Honesty/Honesty.scss'
import '../../../assets/styles/Honesty/HonestySeed.scss'
import '../../../assets/styles/Honesty/HonestyFormField.scss'
import copyInput from '../../../assets/img/copyInput.svg'
import { useEffect, useState } from 'react'
import Btn from '../ui/Btn'
import Tooltip from './Tooltip'
import { InputClipboard } from './InputClipboard'
import { useL10n } from '@apis-games-front/use-assets'
import Input from '../ui/Input'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCurrentSeed,
  fetchRegenerationSeeds,
  setRegenerationNewClientSeed,
} from '../../../state/slices/regenerationSeedsSlice'
import {
  getRegenerationClientSeed, getRegenerationIteration, getRegenerationNewClientSeed,
  getRegenerationSeedsLoading, getRegenerationServerSeedHash,
} from '../../../state/selectors/regenerationSeedsSelectors'

function HonestySeedsForm() {
  const [clientSeed, setClientSeed] = useState('')
  const [serverSeedHash, setServerSeedHash] = useState('')
  const [numBets, setNumBets] = useState(0)
  const [newClientSeed, setNewClientSeed] = useState('')
  const regenerationSeedsLoading = useSelector(getRegenerationSeedsLoading)
  const regenerationClientSeed = useSelector(getRegenerationClientSeed)
  const regenerationServerSeedHash = useSelector(getRegenerationServerSeedHash)
  const regenerationIteration = useSelector(getRegenerationIteration)
  const regenerationNewClientSeed = useSelector(getRegenerationNewClientSeed)
  const dispatch = useDispatch()

  const HONESTY_PAIR_SEEDS = useL10n(`Honesty.PAIR_SEEDS`)
  const ACTIVE_CLIENT_SEED = useL10n(`Honesty.ACTIVE_CLIENT_SEED`)
  const WHAT_ACTIVE_CLIENT_SEED = useL10n(`Honesty.WHAT_ACTIVE_CLIENT_SEED`)
  const CLIENT_SEED_INFO = useL10n(`Honesty.CLIENT_SEED_INFO`)
  const IMPORTANT_TO_KNOW = useL10n(`Honesty.IMPORTANT_TO_KNOW`)
  const RESULTS_INFO_ALL = useL10n(`Honesty.RESULTS_INFO_ALL`)
  const QUESTION_ONE = useL10n(`Honesty.QUESTION_ONE`)
  const ANSWER_ONE = useL10n(`Honesty.ANSWER_ONE`)
  const ACTIVE_SERVER_SEED_HASHED = useL10n(`Honesty.ACTIVE_SERVER_SEED_HASHED`)
  const QUESTION_TWO = useL10n(`Honesty.QUESTION_TWO`)
  const ANSWER_TWO = useL10n(`Honesty.ANSWER_TWO`)
  const QUESTION_THREE = useL10n(`Honesty.QUESTION_THREE`)
  const ANSWER_THREE = useL10n(`Honesty.ANSWER_THREE`)
  const QUESTION_FOUR = useL10n(`Honesty.QUESTION_FOUR`)
  const ANSWER_FOUR = useL10n(`Honesty.ANSWER_FOUR`)
  const NUM_BETS_MADE_PAIR_SEEDS = useL10n(`Honesty.NUM_BETS_MADE_PAIR_SEEDS`)
  const QUESTION_FIVE = useL10n(`Honesty.QUESTION_FIVE`)
  const ANSWER_FIVE = useL10n(`Honesty.ANSWER_FIVE`)
  const CHANGE_PAIR_SEEDS = useL10n(`Honesty.CHANGE_PAIR_SEEDS`)
  const NEW_CLIENT_SEED = useL10n(`Honesty.NEW_CLIENT_SEED`)
  const HONESTY_CHANGE = useL10n(`Honesty.CHANGE`)
  const HONESTY_ACTIVE_SEEDS = useL10n(`Honesty.ACTIVE_SEEDS`)
  const HONESTY_ACTIVE_SEED_COPIED = useL10n(`Honesty.ACTIVE_SEED_COPIED`)
  const HONESTY_SERVER_SEED_HASH_COPIED = useL10n(`Honesty.ACTIVE_SERVER_HASH_COPIED`)

  useEffect(() => {
    dispatch(fetchCurrentSeed())
  }, [])

  useEffect(() => {
    if (regenerationClientSeed) {
      setClientSeed(regenerationClientSeed)
    }
  }, [regenerationClientSeed])

  useEffect(() => {
    if (regenerationServerSeedHash) {
      setServerSeedHash(regenerationServerSeedHash)
    }
  }, [regenerationServerSeedHash])

  useEffect(() => {
    if (regenerationIteration) {
      setNumBets(regenerationIteration)
    }
  }, [regenerationIteration])

  useEffect(() => {
    if (regenerationNewClientSeed) {
      setNewClientSeed(regenerationNewClientSeed)
    }
  }, [regenerationNewClientSeed])

  const onChange = () => {
    dispatch(setRegenerationNewClientSeed(newClientSeed))
    dispatch(fetchRegenerationSeeds())
  }

  return (
    <div className="honesty-seeds-form">
      <div className="honesty-subtitle">{HONESTY_ACTIVE_SEEDS}</div>
      <div className="honesty-form-field">
        <div className="honesty-form-field-label">
          <span>{ACTIVE_CLIENT_SEED}</span>
          <Tooltip tooltipId="honesty-tooltip-current">
            <div className="tooltip-hint">
              <div className="tooltip-hint-title">
                {WHAT_ACTIVE_CLIENT_SEED}
              </div>
              <div className="tooltip-hint-text">
                {CLIENT_SEED_INFO}
              </div>

              <div className="tooltip-hint-title">
                {IMPORTANT_TO_KNOW}:
              </div>
              <div className="tooltip-hint-text">
                {RESULTS_INFO_ALL}
              </div>

              <div className="tooltip-hint-title">
                {QUESTION_ONE}
              </div>
              <div className="tooltip-hint-text">
                {ANSWER_ONE}
              </div>
            </div>
          </Tooltip>
        </div>
        <div id="honesty-tooltip-current" className="honesty-tooltip-root"></div>
        <div className="honesty-form-field-content">
          <InputClipboard disabled={true} value={clientSeed} onChange={setClientSeed} icon={copyInput} copyLabel={HONESTY_ACTIVE_SEED_COPIED} />
        </div>
      </div>

      <div className="honesty-form-field">
        <div className="honesty-form-field-label">
          <span>{ACTIVE_SERVER_SEED_HASHED}</span>
          <Tooltip tooltipId="honesty-tooltip-server">
            <div className="tooltip-hint">
              <div className="tooltip-hint-title">
                {QUESTION_TWO}
              </div>
              <div className="tooltip-hint-text">
                {ANSWER_TWO}
              </div>
              <div className="tooltip-hint-title">
                {QUESTION_THREE}
              </div>
              <div className="tooltip-hint-text">
                {ANSWER_THREE}
              </div>
              <div className="tooltip-hint-title">
                {QUESTION_FOUR}
              </div>
              <div className="tooltip-hint-text">
                {ANSWER_FOUR}
              </div>
            </div>
          </Tooltip>
        </div>
        <div id="honesty-tooltip-server" className="honesty-tooltip-root"></div>
        <div className="honesty-form-field-content">
          <InputClipboard  disabled={true} value={serverSeedHash} onChange={setServerSeedHash} icon={copyInput} copyLabel={HONESTY_SERVER_SEED_HASH_COPIED} />
        </div>
      </div>

      <div className="honesty-form-field">
        <div className="honesty-form-field-label">
          <span>{NUM_BETS_MADE_PAIR_SEEDS}</span>
          <Tooltip tooltipId="honesty-tooltip-client">
            <div className="tooltip-hint">
              <div className="tooltip-hint-title">
                {QUESTION_FIVE}
              </div>
              <div className="tooltip-hint-text">
                {ANSWER_FIVE}
              </div>
            </div>
          </Tooltip>
        </div>
        <div id="honesty-tooltip-client" className="honesty-tooltip-root"></div>
        <div className="honesty-form-field-content">
          <Input value={numBets} type="number" onChange={setNumBets} disabled={true} />
        </div>
      </div>

      <div className="honesty-subtitle honesty-subtitle_margin-top">{CHANGE_PAIR_SEEDS}</div>
      <div className="honesty-form-field">
        <div className="honesty-form-field-label">
          <span>{NEW_CLIENT_SEED} <span className="honesty-form-field-required">*</span></span>
        </div>
        <div className="honesty-form-field-content">
          <Input value={newClientSeed} onChange={setNewClientSeed} />
        </div>
      </div>
      <Btn loading={regenerationSeedsLoading} className="honesty-button-change-seed" onClick={() => onChange()}>{HONESTY_CHANGE}</Btn>
    </div>
  )
}

export default HonestySeedsForm
