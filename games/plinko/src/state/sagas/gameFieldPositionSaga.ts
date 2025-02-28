import { put, takeLatest, delay, all } from 'redux-saga/effects'
import { setAnimating, setLeft, setRight } from '../slices/gameFieldPositionSlice'

function* handleAnimation() {
  yield put(setAnimating(true))
  yield delay(300)
  yield put(setAnimating(false))
}

function* gameFieldPositionSaga() {
  yield all([
    takeLatest(setRight.type, handleAnimation),
    takeLatest(setLeft.type, handleAnimation)
  ])
}

export default gameFieldPositionSaga
