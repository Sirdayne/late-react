import './assets/styles/App.scss'

import GameWrapper from '@apis-games-front/game-wrapper'
import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Main from './components/Interface/Main'
import Settings from './components/Interface/Settings/Settings'
import SceneManager from './components/SceneManager'
import { ALL_FONTS } from './constants'
import { getAlertValidation } from './state/selectors/alertValidationSelectors'
import {
  getDialogAboutGame,
  getDialogAutoplay, getDialogFairnessVerification,
  getDialogMaxBet,
  getDialogSettings,
  getHonesty,
} from './state/selectors/dialogSelectors'
import { gotoInitAsync } from './state/slices/gameSlice'
import store from './state/store'
import AlertValidation from './components/Interface/Modals/AlertValidation'
import Honesty from './components/Interface/Honesty/Honesty'
import ModalBets from './components/Interface/Modals/ModalBets'
import ModalAutoplay from './components/Interface/Autoplay/ModalAutoplay'
import AboutGame from './components/Interface/AboutGame/AboutGame'
import { useL10n } from '@apis-games-front/use-assets'
import useMessageHandler from './useMessageHandler'
import ModalFairnessVerification from './components/Interface/Modals/ModalFairnessVerification'

function App() {
  const dialogMaxBet = useSelector(getDialogMaxBet)
  const dialogSettings = useSelector(getDialogSettings)
  const dialogHonesty = useSelector(getHonesty)
  const alertValidation = useSelector(getAlertValidation)
  const dialogAutoplay = useSelector(getDialogAutoplay)
  const dialogAboutGame = useSelector(getDialogAboutGame)
  const dialogFairnessVerification = useSelector(getDialogFairnessVerification)

  useMessageHandler()
  // const loadedRef = useRef(false)

  /* useEffect(() => {
     //если игра в iframe  скрыть preloader
     if (window.location !== window.parent.location) {
       const progressBarLine = document.querySelector('.progress-bar') as HTMLElement
       progressBarLine.style.display = 'none'
     }
   }, [])
 */

  const start = useCallback(() => {
    // if (loadedRef.current) {
    /* const progressBarContainerElement = document.querySelector('.progress-bar-container') as HTMLElement
    progressBarContainerElement.className += ' done'*/
    //чтобы можно было использовать dispatch на уровень выше
    store.dispatch(gotoInitAsync())
    // }
  }, [])

  const onLoaded = useCallback(() => {
    console.log(`onLoaded complete.....`)
    // loadedRef.current = true
    start()
  }, [start])

  const onProgress = useCallback((progress: number) => {
    const progressBarLine = document.querySelector('.progress-bar') as HTMLElement
    progressBarLine.style.width = Math.round(progress) + '%'
    console.log(`progress load:${progress}`)
    const progressRect: SVGRectElement = document.querySelector('#mask_rect') as SVGRectElement
    if (progressRect !== null) {
      const progressPos = gsap.utils.mapRange(0, 100, 0, 720, progress)
      progressRect.setAttribute('width', progressPos.toString(10))
    }
  }, [])

  return (
    <div className="app">
      <Main />
      <GameWrapper
        store={store}
        onLoaded={onLoaded}
        onProgress={onProgress}
        fonts={ALL_FONTS}
        backgroundColor={0x131629}
      >
        <SceneManager />
      </GameWrapper>
      {dialogSettings && <Settings />}
      {dialogHonesty && <Honesty />}
      {dialogMaxBet && <ModalBets />}
      {dialogFairnessVerification && <ModalFairnessVerification />}
      {alertValidation && <AlertValidation />}
      {dialogAutoplay && <ModalAutoplay />}
      {dialogAboutGame && <AboutGame />}
    </div>
  )
}

export default App
