import { Task } from 'redux-saga'
import { cancel, fork, take } from 'redux-saga/effects'

import { gotoBetAsync, gotoFinishAsync, gotoGameAsync, gotoIdleAsync, gotoInitAsync } from '../slices/gameSlice'

// import { setTimesAvr } from '../slices/playgroundSlice'

function* gotoIdle() {
  // yield put(setTimesAvr())
  console.log(`..idle`)
}

function* idleSaga() {
  while (true) {
    yield take(gotoIdleAsync.type)
    const gotoIdleTask: Task = yield fork(gotoIdle)

    yield take([gotoInitAsync.type, gotoGameAsync.type, gotoFinishAsync.type, gotoBetAsync.type])
    yield cancel(gotoIdleTask)
  }
}

export default idleSaga
