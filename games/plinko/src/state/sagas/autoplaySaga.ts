import { Task } from 'redux-saga'
import { cancel, delay, fork, put, select, take } from 'redux-saga/effects'

import { getAutoplayRounds, getAutoplaySpeed, getStopAutoplayOnBigWIn } from '../selectors/autoplaySelectors'
import { getBalanceStrong, getBet } from '../selectors/balanceSelectors'
import { getBigWinActive } from '../selectors/playgroundSelector'
import { setAutoplayRounds } from '../slices/autoplaySlice'
import { gotoAutoplayAsync, gotoBetAsync, gotoFinishAsync } from '../slices/gameSlice'
import { completeBigWin } from '../slices/playgroundSlice'

const MAX_DELAY = 2000
const MIN_DELAY = 150

function* autoplayGame() {
  const speed: number = yield select(getAutoplaySpeed)
  const autoplayCount: number = yield select(getAutoplayRounds)
  const stopAutoplayBigWin: boolean = yield select(getStopAutoplayOnBigWIn)
  yield delay(300) // pause before start autoplay
  const bet: number = yield select(getBet)
  let balance: number = yield select(getBalanceStrong)
  const timeDelay = gsap.utils.mapRange(0, 100, MAX_DELAY, MIN_DELAY, speed) // inverted
  for (let i = 0; i <= autoplayCount; i++) {
    balance = yield select(getBalanceStrong)
    if (bet > balance) {
      yield put(setAutoplayRounds(0))
      yield put(gotoFinishAsync())
      return
    }
    yield put(gotoBetAsync())
    if (autoplayCount !== Infinity) {
      yield put(setAutoplayRounds(autoplayCount - i))
    }
    yield delay(timeDelay)
    const bigWinActive: boolean = yield select(getBigWinActive)
    if (bigWinActive) {
      if (stopAutoplayBigWin) {
        yield put(setAutoplayRounds(0))
        yield put(gotoFinishAsync())
        return
      }
      yield take(completeBigWin)
    }
  }
  yield put(setAutoplayRounds(0))
  yield put(gotoFinishAsync())
}

function* autoplaySaga() {
  while (true) {
    yield take(gotoAutoplayAsync.type)
    const gotoAutoPlayTask: Task = yield fork(autoplayGame)

    yield take([gotoFinishAsync.type])
    yield cancel(gotoAutoPlayTask)
  }
}

export default autoplaySaga
