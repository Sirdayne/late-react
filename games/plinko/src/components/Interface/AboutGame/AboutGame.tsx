import '../../../assets/styles/AboutGame/AboutGame.scss'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGameFieldRight } from '../../../state/selectors/gameFieldPositionSelectors'
import { closeAboutGame } from '../../../state/slices/dialogSlice'
import arrowBack from '../../../assets/img/arrowBack.svg'
import rulesImg1 from '../../../assets/img/rulesImg1.svg'
import rulesImg2 from '../../../assets/img/rulesImg2.svg'
import rulesImg3 from '../../../assets/img/rulesImg3.svg'
import rulesImg4 from '../../../assets/img/rulesImg4.svg'
import apisGamesLogo from '../../../assets/img/apisGames.svg'
import SettingsSpoilerId from '../Settings/SettingsSpoilerId'
import { useL10n } from '@apis-games-front/use-assets'
import SettingsRulesRow from '../Settings/SettingsRulesRow'

function AboutGame() {
  const right = useSelector(getGameFieldRight)
  const [openedId, setOpenedId] = useState(0)
  const dispatch = useDispatch()

  const SETTINGS_ABOUT_GAME = useL10n(`SettingsRules.ABOUT_GAME`)
  const SETTINGS_ABOUT_GAME_INFO = useL10n(`SettingsRules.ABOUT_GAME_INFO`)
  const SETTINGS_ACTUAL_WINNING = useL10n(`SettingsRules.ACTUAL_WINNING`)
  const SETTINGS_GAME_VERSION = useL10n(`SettingsRules.GAME_VERSION`)
  const SETTINGS_SPECIFY_DESIRED_BET = useL10n(`SettingsRules.SPECIFY_DESIRED_BET`)
  const SETTINGS_SELECT_NUM_ROWS = useL10n(`SettingsRules.SELECT_NUM_ROWS`)
  const SETTINGS_SET_RISK_LVL = useL10n(`SettingsRules.SET_RISK_LVL`)
  const SETTINGS_CLICK_BET_BTN = useL10n(`SettingsRules.CLICK_BET_BTN`)
  const SETTINGS_EACH_BET_LAUNCHES = useL10n(`SettingsRules.EACH_BET_LAUNCHES`)

  const SETTINGS_GAME_FIELD_MADE_FORM = useL10n(`SettingsRules.GAME_FIELD_MADE_FORM`)
  const SETTINGS_ACTUAL_SUM_WIN_FORMULA = useL10n(`SettingsRules.ACTUAL_SUM_WIN_FORMULA`)
  const SETTINGS_BET = useL10n(`SettingsRules.BET`)
  const SETTINGS_ADJUST_BET_SIZE = useL10n(`SettingsRules.ADJUST_BET_SIZE`)
  const SETTINGS_RISK = useL10n(`SettingsRules.RISK`)
  const SETTINGS_CHANGING_RISK_LVL = useL10n(`SettingsRules.CHANGING_RISK_LVL`)
  const SETTINGS_AUTOPLAY = useL10n(`SettingsRules.AUTOPLAY`)
  const SETTINGS_USE_AUTOPLAY_MODE = useL10n(`SettingsRules.USE_AUTOPLAY_MODE`)
  const SETTINGS_RTP = useL10n(`SettingsRules.RTP`)
  const SETTINGS_THEORETICAL_RTP_IN_GAME = useL10n(`SettingsRules.THEORETICAL_RTP_IN_GAME`)
  const SETTINGS_EPIC_WIN = useL10n(`SettingsRules.EPIC_WIN`)
  const SETTINGS_RARE_EVENT_IN_GAME = useL10n(`SettingsRules.RARE_EVENT_IN_GAME`)
  const SETTINGS_CONNECTION_DOWN = useL10n(`SettingsRules.CONNECTION_DOWN`)
  const SETTINGS_IF_CONNECTION_LOST = useL10n(`SettingsRules.IF_CONNECTION_LOST`)
  const SETTINGS_LIMITS = useL10n(`SettingsRules.LIMITS`)
  const MIN_BET_INFO = useL10n(`SettingsRules.MIN_BET_INFO`)
  const MAX_BET_INFO = useL10n(`SettingsRules.MAX_BET_INFO`)
  const MAX_WIN_INFO = useL10n(`SettingsRules.MAX_WIN_INFO`)
  const SETTINGS_DESCRIPTION = useL10n(`SettingsRules.DESCRIPTION`)
  const SETTINGS_HOW_TO_PLAY = useL10n(`SettingsRules.HOW_TO_PLAY`)
  const SETTINGS_PANEL_RULES = useL10n(`SettingsPanel.RULES`)

  return (
    <div className={!right ? 'about-game about-game-right' : 'about-game'}>
      <div className="about-game-container">
        <div className="about-game-container-close">
          <div className="about-game-close" onClick={() => dispatch(closeAboutGame())}>
            <img src={arrowBack} alt="Icon back" />
          </div>
        </div>
        <div className="about-game-title">{SETTINGS_ABOUT_GAME}</div>
        <div>
          <SettingsSpoilerId
            title={SETTINGS_DESCRIPTION}
            id={1}
            openedId={openedId}
            setOpenedId={setOpenedId}
          >
            <div className="about-game-under">
              <div className="about-game-under-text">
                {SETTINGS_ABOUT_GAME_INFO}
              </div>
              <div className="about-game-under-logo">
                <img src={apisGamesLogo} alt="Apis Games Icon" />
                <span>{SETTINGS_GAME_VERSION}: ХХХ</span>
              </div>
            </div>
          </SettingsSpoilerId>
          {openedId !== 1 && openedId !== 2 && <div className="about-game-separator"></div>}
          <SettingsSpoilerId
            title={SETTINGS_HOW_TO_PLAY}
            id={2}
            openedId={openedId}
            setOpenedId={setOpenedId}
          >
            <div className="about-game-under">
              <div className="about-game-under-text">
                <ul>
                  <li>
                    {SETTINGS_SPECIFY_DESIRED_BET}
                  </li>
                  <li>
                    {SETTINGS_SELECT_NUM_ROWS}
                  </li>
                  <li>
                    {SETTINGS_SET_RISK_LVL}
                  </li>
                  <li>
                    {SETTINGS_CLICK_BET_BTN}
                  </li>
                  <li>
                    {SETTINGS_EACH_BET_LAUNCHES}
                  </li>
                </ul>
              </div>
            </div>
          </SettingsSpoilerId>
          {openedId !== 2 && openedId !== 3 && <div className="about-game-separator"></div>}
          <SettingsSpoilerId
            title={SETTINGS_PANEL_RULES}
            id={3}
            openedId={openedId}
            setOpenedId={setOpenedId}
          >
            <div className="about-game-under">
              <div className="about-game-under-row">
                {SETTINGS_GAME_FIELD_MADE_FORM}
              </div>
              <div className="about-game-under-row about-game-under-row_margin_bottom">
                <SettingsRulesRow htmlString={SETTINGS_ACTUAL_SUM_WIN_FORMULA} />
              </div>
              <div className="about-game-under-title about-game-under-title_margin-0">{SETTINGS_BET}</div>
              <div className="about-game-under-row">
                {SETTINGS_ADJUST_BET_SIZE}
              </div>
              <div className="about-game-under-img">
                <img src={rulesImg1} alt="Rules Image" />
              </div>

              <div className="about-game-under-title">{SETTINGS_RISK}</div>
              <div className="about-game-under-row">
                {SETTINGS_CHANGING_RISK_LVL}
              </div>
              <div className="about-game-under-img">
                <img src={rulesImg2} alt="Rules Image" />
              </div>

              <div className="about-game-under-title">{SETTINGS_AUTOPLAY}</div>
              <div className="about-game-under-row">
                {SETTINGS_USE_AUTOPLAY_MODE}
              </div>
              <div className="about-game-under-img">
                <img src={rulesImg3} alt="Rules Image" />
              </div>

              <div className="about-game-under-title">{SETTINGS_RTP}</div>
              <div className="about-game-under-row">
                {SETTINGS_THEORETICAL_RTP_IN_GAME}
              </div>

              <div className="about-game-under-title">{SETTINGS_EPIC_WIN}</div>
              <div className="about-game-under-row">
                {SETTINGS_RARE_EVENT_IN_GAME}
              </div>
              <div className="about-game-under-img">
                <img src={rulesImg4} alt="Rules Image" />
              </div>

              <div className="about-game-under-title">{SETTINGS_CONNECTION_DOWN}</div>
              <div className="about-game-under-row">
                {SETTINGS_IF_CONNECTION_LOST}
              </div>
            </div>
          </SettingsSpoilerId>
          {openedId !== 3 && openedId !== 4 && <div className="about-game-separator"></div>}
          <SettingsSpoilerId
            title={SETTINGS_LIMITS}
            id={4}
            openedId={openedId}
            setOpenedId={setOpenedId}
          >
            <div className="about-game-under">
              <div className="about-game-under-text">
                <ul>
                  <li>
                    {MIN_BET_INFO}
                  </li>
                  <li>
                    {MAX_BET_INFO}
                  </li>
                  <li>
                    {MAX_WIN_INFO}
                  </li>
                </ul>
              </div>
            </div>
          </SettingsSpoilerId>
        </div>
      </div>
    </div>
  )
}

export default AboutGame
