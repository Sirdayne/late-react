import '../../../assets/styles/Honesty/Honesty.scss'
import '../../../assets/styles/Honesty/HonestySeed.scss'
import '../../../assets/styles/Honesty/HonestyFormField.scss'
import arrowBack from '../../../assets/img/arrowBack.svg'
import loader from '../../../assets/img/loader.png'
import { useCallback, useEffect } from 'react'
import HonestySeedCalculation from './HonestySeedCalculation'
import HonestySeedChip from './HonestySeedChip'
import HonestySeedInfo from './HonestySeedInfo'
import HonestySeedGeneralInfo  from './HonestySeedGeneralInfo'
import { useL10n } from '@apis-games-front/use-assets'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchFairnessGame,
  setFairnessGameData,
  setFairnessGameDataIteration,
} from '../../../state/slices/fairnessGameSlice'
import { getFairnessGameData } from '../../../state/selectors/fairnessGameSelectors'
import HonestyFinalResult from './HonestyFinalResult'
import HonestySeedsBytes from './HonestySeedsBytes'
import { getFairnessSeed, getFairnessSeedLoading } from '../../../state/selectors/fairnessSeedSelectors'
import { fetchFairnessSeed } from '../../../state/slices/fairnessSeedSlice'
import { setSeedId } from '../../../state/slices/fairnessSlice'

function HonestySeed({ viewSeedId, selectViewSeed }) {
  const HONESTY_CALCULATION = useL10n(`Honesty.CALCULATION`)
  const LOADING_INFO = useL10n(`Honesty.LOADING_INFO`)
  const HONESTY_VERIFICATION = useL10n(`Honesty.VERIFICATION`)

  const dispatch = useDispatch()
  const fairnessSeed = useSelector(getFairnessSeed)
  const isLoading = useSelector(getFairnessSeedLoading)
  const fairnessGameData = useSelector(getFairnessGameData)

  const iterationMinus  = useCallback(() => {
      if (fairnessSeed && fairnessSeed.nextActionId) {
        dispatch(setSeedId(fairnessSeed.nextActionId))
        selectViewSeed(fairnessSeed.nextActionId)
      } else {
        const iteration = fairnessGameData.iteration
        if (iteration > 0) {
          dispatch(setFairnessGameDataIteration(iteration - 1))
          dispatch(fetchFairnessGame())
        }
      }
    },
    [dispatch, fairnessGameData]
  )

  const iterationPlus  = useCallback(() => {
      if (fairnessSeed && fairnessSeed.previousActionId) {
        dispatch(setSeedId(fairnessSeed.previousActionId))
        selectViewSeed(fairnessSeed.previousActionId)
      } else {
        const iteration = fairnessGameData.iteration
        dispatch(setFairnessGameDataIteration(iteration + 1))
        dispatch(fetchFairnessGame())
      }
    },
    [dispatch, fairnessGameData]
  )

  useEffect(() => {
    console.log(viewSeedId, ' SEED ID')
    if (viewSeedId) {
      dispatch(fetchFairnessSeed())
    }
  }, [dispatch, viewSeedId])

  useEffect(() => {
    if (fairnessSeed) {
      const payload = {
        lastActionId: viewSeedId,
        serverSeed: fairnessSeed.serverSeed,
        serverSeedHash: fairnessSeed.serverSeedHash,
        clientSeed: fairnessSeed.clientSeed,
        gameCode: fairnessSeed.gameCode ? fairnessSeed.gameCode : fairnessSeed.gameSubType,
        iteration: fairnessSeed.iterations,
        risk: fairnessSeed?.gameContext?.payout?.risk,
        rows: fairnessSeed?.gameContext?.payout?.rows
      }
      dispatch(setFairnessGameData(payload))
    }
  }, [dispatch, fairnessSeed])

  return (
    <div className="honesty-container">
      <div className="honesty-container-close">
        <div className="honesty-close" onClick={() => selectViewSeed('')}>
          <img src={arrowBack} alt="Icon back" />
        </div>
      </div>

      <div className="honesty-title">{HONESTY_VERIFICATION}</div>

      {isLoading && <div className="honesty-loader-container">
        <div className="honesty-loader">
          <div className="honesty-loader-row">
            <div className="honesty-loader-img">
              <img src={loader} alt="Loader" />
            </div>
          </div>
          <div className="honesty-loader-row">
            <div className="honesty-loader-text">
              {LOADING_INFO}
            </div>
          </div>
        </div>
      </div>}

      {!isLoading && <div className="honesty-seed-content">
        <HonestySeedChip fairnessSeed={fairnessSeed} iterationMinus={iterationMinus} iterationPlus={iterationPlus} />

        <HonestySeedGeneralInfo />

        <HonestySeedInfo />

        {/*<div className="honesty-form-fields">*/}
        {/*  <div className="honesty-form-field honesty-form-field-full">*/}
        {/*    <div className="honesty-form-field-label">*/}
        {/*      <span>{NUM_BET}</span>*/}
        {/*    </div>*/}
        {/*    <div className="honesty-form-field-content">*/}
        {/*      <Input value={numBet} onChange={setNumBet} />*/}
        {/*    </div>*/}
        {/*  </div>*/}

        {/*  <div className="honesty-form-field honesty-form-field_volume">*/}
        {/*    <Volume*/}
        {/*      onMinus={() => setNumBet((prev) => prev - 1)}*/}
        {/*      onPlus={() => setNumBet((prev) => prev + 1)}></Volume>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="honesty-subtitle honesty-subtitle_margin-top">{HONESTY_CALCULATION}</div>

        <HonestyFinalResult />

        <HonestySeedsBytes />

        <HonestySeedCalculation />
      </div>}
    </div>
  )
}

export default HonestySeed
