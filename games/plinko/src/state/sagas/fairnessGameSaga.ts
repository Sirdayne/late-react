import { call, put, select, takeLatest } from 'redux-saga/effects'
import { getFairnessGame } from '@apis-games-front/plinko-game-api'
import { fetchFairnessGame } from '../slices/fairnessGameSlice'
import { getFairnessGameData } from '../selectors/fairnessGameSelectors'
import { setFairnessSeed, setFairnessSeedLoading } from '../slices/fairnessSeedSlice'

function* fetchFairnessGameSaga() {
  try {
    yield put(setFairnessSeedLoading(true))
    const fairnessGameData: string = yield select(getFairnessGameData)
    const response = yield call(getFairnessGame, fairnessGameData)
    yield put(setFairnessSeed(response.data))
  } catch (error) {
    yield put(setFairnessSeedLoading(false))
  }
}

export function* watchFairnessGame() {
  yield takeLatest(fetchFairnessGame.type, fetchFairnessGameSaga)
}

export default watchFairnessGame
