import '../../../assets/styles/Honesty/Honesty.scss'
import '../../../assets/styles/Honesty/HonestyTabs.scss'
import arrowBack from '../../../assets/img/arrowBack.svg'
import { closeHonesty } from '../../../state/slices/dialogSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { useL10n } from '@apis-games-front/use-assets'
import HonestyVerification from './HonestyVerification'
import HonestySeedsForm from './HonestySeedsForm'
import { getFairnessTab } from '../../../state/selectors/fairnessSelectors'
import { setFairnessTab } from '../../../state/slices/fairnessSlice'

function HonestyTabs({ selectViewSeed }) {
  const MAIN_MENU_HONESTY = useL10n(`MainMenu.HONESTY`)
  const HONESTY_VERIFICATION = useL10n(`Honesty.VERIFICATION`)
  const HONESTY_SEEDS = useL10n(`Honesty.SEEDS`)
  const tab = useSelector(getFairnessTab)
  const dispatch = useDispatch()

  const setTab  = useCallback((item) => {
      dispatch(setFairnessTab(item))
    },
    [dispatch]
  )

  return (
    <div className="honesty-container">
      <div className="honesty-container-close">
        <div className="honesty-close" onClick={() => dispatch(closeHonesty())}>
          <img src={arrowBack} alt="Icon back" />
        </div>
      </div>
      <div className="honesty-title">{MAIN_MENU_HONESTY}</div>
      <div className="honesty-tabs">
        <div className={tab === 'verification' ? 'honesty-tab honesty-tab_active' : 'honesty-tab'} onClick={() => setTab('verification')}>{HONESTY_VERIFICATION}</div>
        <div className={tab === 'seeds' ? 'honesty-tab honesty-tab_active' : 'honesty-tab'} onClick={() => setTab('seeds')}>{HONESTY_SEEDS}</div>
      </div>
      {tab === 'verification' && <HonestyVerification selectViewSeed={selectViewSeed} />}
      {tab === 'seeds' && <HonestySeedsForm />}
    </div>
  )
}

export default HonestyTabs
