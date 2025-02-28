import '../../../assets/styles/Bet/Bet.scss'
import '../../../assets/styles/Bet/WalletForm.scss'
import '../../../assets/styles/Bet/Wallet.scss'
import '../../../assets/styles/Bet/FormField.scss'
import { useL10n } from '@apis-games-front/use-assets'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAlertValidation, getAlertValidationType } from '../../../state/selectors/alertValidationSelectors'
import {
  getBalance,
  getBet, getBetmin, getCurrency, getDenominator,
} from '../../../state/selectors/balanceSelectors'
import { getGameFieldRight } from '../../../state/selectors/gameFieldPositionSelectors'
import { isActiveBalls } from '../../../state/selectors/playgroundSelector'
import {
  openAlertLoadingValidation,
  openAlertValidation,
} from '../../../state/slices/alertValidationSlice'
import { gotoBetAsync, gotoFinishAsync, gotoLoadPathAsync } from '../../../state/slices/gameSlice'
import { setRiskState, setRowsState } from '../../../state/slices/playgroundSlice'
import Button from '../ui/Button'
import MaxBet from './MaxBet'
import VolumeBet from './VolumeBet'
import { getInterfaceDisabled } from '../../../state/selectors/interfaceSelectors'
import AutoplayButton from '../Autoplay/AutoplayButton'
import SelectRisk from './SelectRisk'
import SelectRows from './SelectRows'
import { getAutoplayRounds } from '../../../state/selectors/autoplaySelectors'
import { setAutoplayRounds } from '../../../state/slices/autoplaySlice'
import BetInput from './BetInput'
import BetBalance from './BetBalance'

type OptionData = {
  label: string
  value: string
}

const ROWS: OptionData[] = [
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
  { label: '13', value: '13' },
  { label: '14', value: '14' },
  { label: '15', value: '15' },
  { label: '16', value: '16' },
]

function Bet() {
  const dispatch = useDispatch()
  const right = useSelector(getGameFieldRight)
  const balance = useSelector(getBalance)
  const bet = useSelector(getBet)
  const betmin = useSelector(getBetmin)
  const currency = useSelector(getCurrency)
  const denominator = useSelector(getDenominator)
  const alertValidation = useSelector(getAlertValidation)
  const alertType = useSelector(getAlertValidationType)
  const [row, setRow] = useState<OptionData>({ label: '8', value: '8' })
  const [risk, setRisk] = useState<OptionData>({ label: 'Низкий', value: 'low' })
  const [disabledForm, setDisabledForm] = useState<boolean>(false)
  const activeBalls = useSelector(isActiveBalls)
  const isInterfaceDisabled = useSelector(getInterfaceDisabled)
  const rounds = useSelector(getAutoplayRounds)
  const ALERT_MAX_BET = useL10n(`Alert.MAX_BET`)
  const ALERT_MIN_BET = useL10n(`Alert.MIN_BET`)

  const isPlaying = useMemo(() => activeBalls || isInterfaceDisabled, [activeBalls, isInterfaceDisabled])
  const isAutoPlaying = useMemo(() => rounds > 0 || isInterfaceDisabled, [rounds, isInterfaceDisabled])

  const tryRound = () => {
    if (bet > balance) {
      showAlertValidationMax()
    } else if (bet < betmin) {
      showAlertValidationMin()
    } else {
      placeBet()
    }
  }

  const placeBet = useCallback(() => {
    dispatch(gotoBetAsync())
  }, [dispatch])

  const onBetButtonClick = useCallback(() => {
    if (rounds && rounds > 0) {
      dispatch(setAutoplayRounds(0))
      dispatch(gotoFinishAsync())
    } else {
      tryRound()
    }
  }, [dispatch, rounds, bet, balance, betmin])

  useEffect(() => {
    setDisabledForm(isPlaying)
  }, [isPlaying])

  const showAlertValidationMax  = useCallback(() => {
      dispatch(openAlertValidation(ALERT_MAX_BET))
    },
    [dispatch]
  )

  const showAlertValidationMin= useCallback(() => {
      const ALERT_MIN_TEXT = `${ALERT_MIN_BET} ${betmin / denominator} ${currency}`
      dispatch(openAlertValidation(ALERT_MIN_TEXT))
    },
    [dispatch]
  )

  const changeRow = useCallback(
    (data: OptionData) => {
      setRow(data)
      dispatch(setRowsState(parseInt(data.value)))
      dispatch(gotoLoadPathAsync())
    },
    [dispatch],
  )

  const changeRisk = useCallback(
    (data: OptionData) => {
      setRisk(data)
      dispatch(setRiskState(data.value))
    },
    [dispatch],
  )

  const FORM_BET = useL10n(`Form.BET`)
  const FORM_ROW = useL10n(`Form.ROW`)
  const FORM_RISK = useL10n(`Form.RISK`)
  const AUTOPLAY_STOP_AUTOPLAY = useL10n(`Autoplay.STOP_AUTOPLAY`)

  const risks = [
    { label: useL10n(`RiskLevel.LOW`), value: 'low' },
    { label: useL10n(`RiskLevel.MEDIUM`), value: 'medium' },
    { label: useL10n(`RiskLevel.HIGH`), value: 'high' },
  ]

  return (
    <div className={!right ? 'bet bet-right' : 'bet'}>
      <div className="bet-container">
        <div>
          <div className="wallet wallet-mobile">
            <BetBalance />
          </div>
        </div>

        <div className="wallet-form">
          <div className="wallet-form-row wallet-form-row_gap">
            <SelectRows label={FORM_ROW} disabled={isPlaying} values={ROWS} value={row}
                          onChange={changeRow}></SelectRows>

            <SelectRisk label={FORM_RISK} disabled={isPlaying} values={risks} value={risk}
                              onChange={changeRisk}></SelectRisk>

            <AutoplayButton disabled={rounds <= 0 && isPlaying} />
          </div>

          <div className="wallet-form-row wallet-form-row_gap wallet-form-row_margin">

            <div className="wallet-form-input">
              <BetInput disabled={isPlaying}
                        invalid={alertValidation && alertType === 'default'}
              />
            </div>

            <div className="wallet-form-volume">
              <VolumeBet disabled={isPlaying} />
            </div>

            <div className="wallet-form-volume">
              <MaxBet disabled={isPlaying} />
            </div>
          </div>

          <div>
            <div className="wallet wallet-desktop">
              <BetBalance />
            </div>
          </div>

          <Button isCancel={rounds && rounds > 0} disabled={isInterfaceDisabled} className="wallet-btn" onClick={onBetButtonClick}>
            {rounds && rounds > 0 ? AUTOPLAY_STOP_AUTOPLAY : FORM_BET}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Bet
