import wait from '@apis-games-front/wait'
import { Task } from 'redux-saga'
import { call, cancel, fork, put, take } from 'redux-saga/effects'

import { gotoErrorAsync, gotoFinishAsync, gotoGameAsync, gotoIdleAsync, gotoInitAsync } from '../slices/gameSlice'
import { setInterfaceDisabled } from '../slices/interfaceSlice'

function* gotoFinish() {
  yield put(setInterfaceDisabled(true))
  // yield call(wait, 4000)
  yield put(setInterfaceDisabled(false))
}

function* finishSaga() {
  while (true) {
    yield take(gotoFinishAsync.type)
    const gotoFinishTask: Task = yield fork(gotoFinish)

    yield take([gotoInitAsync.type, gotoErrorAsync.type, gotoIdleAsync.type, gotoGameAsync.type])
    yield cancel(gotoFinishTask)
  }
}

export default finishSaga
