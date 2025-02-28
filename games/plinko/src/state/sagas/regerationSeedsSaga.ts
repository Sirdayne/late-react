import { call, put, select, takeLatest } from 'redux-saga/effects'
import { regenerationSeed } from '@apis-games-front/plinko-game-api'
import { fetchRegenerationSeeds, setRegenerationSeedData } from '../slices/regenerationSeedsSlice'
import { getRegenerationNewClientSeed } from '../selectors/regenerationSeedsSelectors'

function* fetchRegenerationSeedsSaga() {
  try {
    const newClientSeed: string = yield select(getRegenerationNewClientSeed)
    const response = yield call(regenerationSeed, newClientSeed)
    yield put(setRegenerationSeedData(response.data))
  } catch (error) {
    console.log('Regeneration seeds error: ' , error)
  }
}

export function* watchRegenerationSeeds() {
  yield takeLatest(fetchRegenerationSeeds.type, fetchRegenerationSeedsSaga)
}
export default watchRegenerationSeeds
