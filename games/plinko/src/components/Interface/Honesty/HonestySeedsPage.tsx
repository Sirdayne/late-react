import '../../../assets/styles/Honesty/Honesty.scss'
import '../../../assets/styles/Honesty/HonestySeed.scss'
import '../../../assets/styles/Honesty/HonestyFormField.scss'
import arrowBack from '../../../assets/img/arrowBack.svg'
import chevronRight from '../../../assets/img/chevronRight.svg'
import copyInput from '../../../assets/img/copyInput.svg'
import { closeHonesty } from '../../../state/slices/dialogSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import Btn from '../ui/Btn'
import Tooltip from './Tooltip'
import { InputClipboard } from './InputClipboard'
import { useL10n } from '@apis-games-front/use-assets'
import Input from '../ui/Input'

function HonestySeedsPage({ selectSeed }) {
  const dispatch = useDispatch()
  const [clientSeed, setClientSeed] = useState('zaVgqBkl-S')
  const [serverSeed, setServerSeed] = useState('9391ce7384e06c2ef065e14ac689aeff')
  const [numBets, setNumBets] = useState(0)
  const [newClientSeed, setNewClientSeed] = useState('zaVgqBkl-S')

  const MAIN_MENU_HONESTY = useL10n(`MainMenu.HONESTY`)
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
  const PREVIOUS_PAIR_SEED = useL10n(`Honesty.PREVIOUS_PAIR_SEED`)
  const HONESTY_MAIN_INFO = useL10n(`Honesty.HONESTY_MAIN_INFO`)
  const HONESTY_MAIN_INFO_TWO = useL10n(`Honesty.HONESTY_MAIN_INFO_TWO`)
  const HONESTY_CHANGE = useL10n(`Honesty.CHANGE`)
  const HONESTY_VERIFICATION = useL10n(`Honesty.VERIFICATION`)
  const HONESTY_CREATED = useL10n(`Honesty.CREATED`)
  const HONESTY_NUM_BETS = useL10n(`Honesty.NUM_BETS`)

  const onChange = () => {
    console.log('New Client Seed', newClientSeed)
  }

  return (
    <div className="honesty-container">
      <div className="honesty-container-close">
        <div className="honesty-close" onClick={() => dispatch(closeHonesty())}>
          <img src={arrowBack} alt="Icon back" />
        </div>
      </div>
      <div className="honesty-title">{MAIN_MENU_HONESTY}</div>
      <div className="honesty-subtitle">{HONESTY_PAIR_SEEDS} #03</div>
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
          <InputClipboard value={clientSeed} onChange={setClientSeed} icon={copyInput} />
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
          <InputClipboard value={serverSeed} onChange={setServerSeed} icon={copyInput} />
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
          <Input value={numBets} type="number" onChange={setNumBets} />
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
      <Btn className="honesty-button-change-seed" onClick={() => onChange()}>{HONESTY_CHANGE}</Btn>

      <div className="honesty-subtitle honesty-subtitle_margin-top">{PREVIOUS_PAIR_SEED}</div>
      <div className="honesty-text">
        {HONESTY_MAIN_INFO}
      </div>
      <div className="honesty-text honesty-text_margin">
        {HONESTY_MAIN_INFO_TWO}
      </div>

      <div className="honesty-seed">
        <div className="honesty-seed-row">
          <div className="honesty-seed-item">
            {HONESTY_PAIR_SEEDS} #01
          </div>
          <div className="honesty-seed-item">
            <Btn className="honesty-seed-btn" onClick={() => selectSeed(1)}>
              {HONESTY_VERIFICATION}
              <img src={chevronRight} alt="Icon right" />
            </Btn>
          </div>
        </div>
        <div className="honesty-seed-row">
          <div className="honesty-seed-text">
            {HONESTY_CREATED}
          </div>
          <div className="honesty-seed-item">
            1.11.2024
          </div>
        </div>
        <div className="honesty-seed-row">
          <div className="honesty-seed-text">
            {HONESTY_NUM_BETS}
          </div>
          <div className="honesty-seed-item">
            100
          </div>
        </div>
      </div>

      <div className="honesty-seed">
        <div className="honesty-seed-row">
          <div className="honesty-seed-item">
            {HONESTY_PAIR_SEEDS} #02
          </div>
          <div className="honesty-seed-item">
            <Btn className="honesty-seed-btn" onClick={() => selectSeed(2)}>
              {HONESTY_VERIFICATION}
              <img src={chevronRight} alt="Icon right" />
            </Btn>
          </div>
        </div>
        <div className="honesty-seed-row">
          <div className="honesty-seed-text">
            {HONESTY_CREATED}
          </div>
          <div className="honesty-seed-item">
            31.10.2024
          </div>
        </div>
        <div className="honesty-seed-row">
          <div className="honesty-seed-text">
            {HONESTY_NUM_BETS}
          </div>
          <div className="honesty-seed-item">
            10
          </div>
        </div>
      </div>
    </div>
  )
}

export default HonestySeedsPage
