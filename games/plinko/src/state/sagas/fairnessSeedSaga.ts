import { call, put, select, takeLatest } from 'redux-saga/effects'
import { getFairnessSeedId } from '../selectors/fairnessSelectors'
import { getFairness } from '@apis-games-front/plinko-game-api'
import { fetchFairnessSeed, setFairnessSeed } from '../slices/fairnessSeedSlice'

function* fetchFairnessSeedSaga() {
  try {
    const seedId: string = yield select(getFairnessSeedId)
    const response = yield call(getFairness, seedId)
    yield put(setFairnessSeed(response.data))
  } catch (error) {
    yield put(setFairnessSeed(null))
  }
}

export function* watchFairnessSeed() {
  yield takeLatest(fetchFairnessSeed.type, fetchFairnessSeedSaga)
}

export default watchFairnessSeed
