import { all } from 'redux-saga/effects'

import autoplaySaga from './sagas/autoplaySaga'
import betSaga from './sagas/betSaga'
import finishSaga from './sagas/finishSaga'
import gameSaga from './sagas/gameSaga'
import idleSaga from './sagas/idleSaga'
import initSaga from './sagas/initSaga'
import watchAlertValidationSaga from './sagas/alertValidationSaga'
import loadPathSaga from './sagas/loadPathSaga'
import gameFieldPositionSaga from './sagas/gameFieldPositionSaga'
import bigWinSaga from './sagas/bigWinSaga'
import playerOptionsSaga from './sagas/playerOptionsSaga'
import watchFairnessListSaga from './sagas/fairnessListSaga'
import watchFairnessSeedSaga from './sagas/fairnessSeedSaga'
import watchRegenerationSeedsSaga from './sagas/regerationSeedsSaga'
import fairnessGameSaga from './sagas/fairnessGameSaga'
import watchCurrentSeedSaga from './sagas/currentSeedSaga'

export default function* rootSaga() {
  yield all([
    autoplaySaga(),
    betSaga(),
    initSaga(),
    idleSaga(),
    gameSaga(),
    playerOptionsSaga(),
    finishSaga(),
    loadPathSaga(),
    watchAlertValidationSaga(),
    gameFieldPositionSaga(),
    bigWinSaga(),
    watchFairnessListSaga(),
    watchFairnessSeedSaga(),
    watchRegenerationSeedsSaga(),
    fairnessGameSaga(),
    watchCurrentSeedSaga(),
  ])
}
