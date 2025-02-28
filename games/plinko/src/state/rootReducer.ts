import { combineReducers } from '@reduxjs/toolkit'

import gameSliceReducer from './slices/gameSlice'
import interfaceSliceReducer from './slices/interfaceSlice'
import playgroundSliceReducer from './slices/playgroundSlice'
import sceneSliceReducer from './slices/sceneSlice'
import alertValidationReducer from './slices/alertValidationSlice'
import gameFieldReducer from './slices/gameFieldPositionSlice'
import dialogReducer from './slices/dialogSlice'
import balanceReducer from './slices/balanceSlice'
import userReducer from './slices/userSlice'
import autoplayReducer from './slices/autoplaySlice'
import fairnessReducer from './slices/fairnessSlice'
import fairnessSeedReducer from './slices/fairnessSeedSlice'
import fairnessListReducer from './slices/fairnessListSlice'
import fairnessGameReducer from './slices/fairnessGameSlice'
import regenerationSeedsReducer from './slices/regenerationSeedsSlice'

const rootReducer = combineReducers({
  alertValidation: alertValidationReducer,
  balance: balanceReducer,
  dialog: dialogReducer,
  game: gameSliceReducer,
  gameFieldPosition: gameFieldReducer,
  interface: interfaceSliceReducer,
  playground: playgroundSliceReducer,
  scene: sceneSliceReducer,
  user: userReducer,
  autoplay: autoplayReducer,
  fairness: fairnessReducer,
  fairnessSeed: fairnessSeedReducer,
  fairnessList: fairnessListReducer,
  fairnessGame: fairnessGameReducer,
  regenerationSeeds: regenerationSeedsReducer
})

export default rootReducer
