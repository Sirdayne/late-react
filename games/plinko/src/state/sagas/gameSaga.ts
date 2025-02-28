import { Task } from 'redux-saga'
import { cancel, fork, put, take } from 'redux-saga/effects'

import { gotoFinishAsync, gotoGameAsync, gotoIdleAsync, gotoInitAsync, gotoLoadPathAsync } from '../slices/gameSlice'
import { setScene } from '../slices/sceneSlice'

function* gotoGame() {
  yield put(setScene('game'))
  yield put(gotoIdleAsync())
}

function* gameSaga() {
  while (true) {
    yield take(gotoGameAsync.type)
    const gotoGameTask: Task = yield fork(gotoGame)

    yield take([gotoInitAsync.type, gotoIdleAsync.type, gotoFinishAsync.type, gotoLoadPathAsync.type])
    yield cancel(gotoGameTask)
  }
}

export default gameSaga
