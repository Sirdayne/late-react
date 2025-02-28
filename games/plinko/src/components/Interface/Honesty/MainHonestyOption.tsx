import '../../../assets/styles/Honesty/MainHonestyOption.scss'

import settingIcon from '../../../assets/img/setting.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getGameFieldRight } from '../../../state/selectors/gameFieldPositionSelectors'
import { useL10n } from '@apis-games-front/use-assets'
import { closeHonesty, openHonesty } from '../../../state/slices/dialogSlice'

function MainHonestyOption () {
  const right = useSelector(getGameFieldRight)
  const dispatch = useDispatch()

  const MAIN_MENU_HONESTY = useL10n(`MainMenu.HONESTY`)

  return (
    <div className={!right ? 'main-honesty-option main-honesty-option-right' : 'main-honesty-option'} onClick={() => dispatch(openHonesty())}>
      <img src={settingIcon} alt="Setting icon" />
      <span>{MAIN_MENU_HONESTY}</span>
    </div>
  )
}

export default MainHonestyOption
