import { call, put, takeLatest } from 'redux-saga/effects'
import { getCurrentSeed } from '@apis-games-front/plinko-game-api'
import { fetchCurrentSeed, setRegenerationSeedData } from '../slices/regenerationSeedsSlice'

function* fetchCurrentSeedSaga() {
  try {
    const response = yield call(getCurrentSeed)
    yield put(setRegenerationSeedData(response.data))
  } catch (error) {
    console.log('Regeneration seeds error: ' , error)
  }
}

export function* watchCurrentSeed() {
  yield takeLatest(fetchCurrentSeed.type, fetchCurrentSeedSaga)
}
export default watchCurrentSeed
