import '../../../assets/styles/Settings/Settings.scss'
import { useL10n } from '@apis-games-front/use-assets'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import closeIcon from '../../../assets/img/close.svg'
import gameFieldIcon from '../../../assets/img/gameField.svg'
import gameFieldCheckMarkIcon from '../../../assets/img/gameFieldCheckMark.svg'
import infoIcon from '../../../assets/img/info.svg'
import settingIcon from '../../../assets/img/settingHonesty.svg'
import soundIcon from '../../../assets/img/sound.svg'
import { getGameFieldIsAnimating, getGameFieldRight } from '../../../state/selectors/gameFieldPositionSelectors'
import { getAnimatedField, getBigWinAnimated } from '../../../state/selectors/interfaceSelectors'
import { closeSettings, openAboutGame, openHonesty } from '../../../state/slices/dialogSlice'
import { setLeft, setRight } from '../../../state/slices/gameFieldPositionSlice'
import { setAnimatedField, setBigWinAnimated } from '../../../state/slices/interfaceSlice'
import SettingsItem from './SettingsItem'
import Toggle from '../ui/Toggle'

function Settings() {
  const dispatch = useDispatch()
  const right = useSelector(getGameFieldRight)
  const isAnimating = useSelector(getGameFieldIsAnimating)
  const fieldAnimation = useSelector(getAnimatedField)
  const bigwinAnimation = useSelector(getBigWinAnimated)
  const [isGameField, setIsGameField] = useState(window.matchMedia('(orientation: landscape)').matches)
  const MAIN_MENU_SETTINGS = useL10n(`MainMenu.SETTINGS`)
  const SETTINGS_INFORMATION = useL10n(`SettingsPanel.INFORMATION`)
  const SETTINGS_GAME_FIELD = useL10n(`SettingsPanel.GAME_FIELD`)
  const SETTINGS_RIGHT = useL10n(`SettingsPanel.RIGHT`)
  const SETTINGS_LEFT = useL10n(`SettingsPanel.LEFT`)
  const MAIN_MENU_HONESTY = useL10n(`MainMenu.HONESTY`)
  const SETTINGS_ABOUT_GAME = useL10n(`SettingsRules.ABOUT_GAME`)

  // const onFieldAnimation = useCallback(
  //   (value: boolean) => {
  //     dispatch(setAnimatedField(value))
  //   },
  //   [dispatch],
  // )
  //
  // const onBigwinAnimation = useCallback(
  //   (value: boolean) => {
  //     dispatch(setBigWinAnimated(value))
  //   },
  //   [dispatch],
  // )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(orientation: landscape)')
    const handleOrientation = (e) => {
      const landscape = e.matches
      if (landscape) {
        setIsGameField(true)
      } else {
        setIsGameField(false)
      }
    }
    mediaQuery.addEventListener('change', handleOrientation)

    return () => {
      mediaQuery.removeEventListener('change', handleOrientation)
    }
  }, [])

  return (
    <div
      className={
        !right && isAnimating
          ? 'settings settings-right settings-animate'
          : right && isAnimating
            ? 'settings settings-animate'
            : !right && !isAnimating
              ? 'settings settings-right'
              : 'settings'
      }
    >
      <div className="settings-navigation">
        <div className="settings-navigation-close" onClick={() => dispatch(closeSettings())}>
          <img src={closeIcon} alt="Settings close" />
        </div>
      </div>
      <div className="settings-container">
        <div className="settings-title">{MAIN_MENU_SETTINGS}</div>
        <div onClick={() => dispatch(openHonesty())}>
          <SettingsItem title={MAIN_MENU_HONESTY} icon={settingIcon}></SettingsItem>
        </div>
        <div onClick={() => dispatch(openAboutGame())}>
          <SettingsItem title={SETTINGS_ABOUT_GAME} icon={infoIcon}></SettingsItem>
        </div>

        {isGameField && (
          <SettingsItem title={SETTINGS_GAME_FIELD} icon={gameFieldIcon}>
            <div className="settings-under-game-interface">
              <div className="settings-game-interface" onClick={() => dispatch(setRight())}>
                <div className="settings-game-interface-text">{SETTINGS_RIGHT}</div>
                {right && <img src={gameFieldCheckMarkIcon} alt="Checkmark Icon" />}
              </div>
              <div className="settings-game-interface" onClick={() => dispatch(setLeft())}>
                <div className="settings-game-interface-text">{SETTINGS_LEFT}</div>
                {!right && <img src={gameFieldCheckMarkIcon} alt="Checkmark Icon" />}
              </div>
            </div>
          </SettingsItem>
        )}
        {/*<SettingsItem title="Анимации" icon={soundIcon}>*/}
        {/*  <div className="settings-under-game-interface">*/}
            {/*<div className="settings-game-interface">*/}
            {/*  <div className="settings-game-interface-text">Epic Win анимация</div>*/}
            {/*  <Toggle value={bigwinAnimation} onChange={onBigwinAnimation} />*/}
            {/*</div>*/}
            {/*<div className="settings-game-interface">*/}
            {/*  <div className="settings-game-interface-text">{SETTINGS_RULES_ANIMATION_FIELD}</div>*/}
            {/*  <Toggle value={fieldAnimation} onChange={onFieldAnimation} />*/}
            {/*</div>*/}
        {/*  </div>*/}
        {/*</SettingsItem>*/}
      </div>
    </div>
  )
}

export default Settings
