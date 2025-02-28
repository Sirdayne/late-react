import { call, put, select, takeLatest } from 'redux-saga/effects'
import { getFairnessList } from '@apis-games-front/plinko-game-api'
import { getFairnessListPage, getFairnessListPerPage } from '../selectors/fairnessListSelectors'
import { fetchFairnessList, setFairnessList, setFairnessListTotal } from '../slices/fairnessListSlice'

function* fetchFairnessListSaga() {
  try {
    const page: number = yield select(getFairnessListPage)
    const perPage: number = yield select(getFairnessListPerPage)
    const offsetPage = page - 1
    const response = yield call(getFairnessList, offsetPage, perPage)
    yield put(setFairnessList(response.data.history))
    yield put(setFairnessListTotal(response.data.total))
  } catch (error) {
    yield put(setFairnessList([]))
    yield put(setFairnessListTotal(0))
  }
}

export function* watchFairnessList() {
  yield takeLatest(fetchFairnessList.type, fetchFairnessListSaga)
}

export default watchFairnessList
