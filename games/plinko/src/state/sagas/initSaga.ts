import {
  getInit,
  InitResponse,
  setServerUrl,
  setToken as setTokenAPI,
  GetBigWinResponse,
  getBigWin,
} from '@apis-games-front/plinko-game-api'
import { Task } from 'redux-saga'
import { call, cancel, fork, put, take } from 'redux-saga/effects'

import { setBalance, setBetmax, setBetmin, setCurrency, setDenominator, setRounding } from '../slices/balanceSlice'
import {
  completeState,
  gotoFinishAsync,
  gotoGameAsync,
  gotoIdleAsync,
  gotoInitAsync,
  gotoLoadPathAsync,
} from '../slices/gameSlice'
import { setPayoutsData } from '../slices/playgroundSlice'
import { setToken } from '../slices/userSlice'
import { setBigWinAnimated } from '../slices/interfaceSlice'

const SERVER_API = import.meta.env.VITE_SERVER_API
const MOCK = import.meta.env.VITE_MOCK

function* gotoInit() {
  console.log(`..init`)
  const loaderData = sessionStorage.getItem('loaderData')
  try {
    const response: InitResponse = loaderData !== null ? JSON.parse(loaderData) : JSON.parse(MOCK)
    yield call(setTokenAPI, response.data?.jwt?.access.token || 'not')
    yield put(setToken(response.data?.jwt?.access.token || ''))
    yield call(setServerUrl, SERVER_API)
    const bigWinResponse: GetBigWinResponse = yield call(getBigWin)
    const bigWinData = bigWinResponse.data
    if (bigWinData !== undefined) {
      yield put(setBigWinAnimated(bigWinData.enabled))
    }
  } catch (error) {
    console.warn(`TOKEN not set; MOCK env not found; use default mock server; error: ${error}`)
    const response: InitResponse = yield call(getInit)
    const initData = response.data
    if (initData !== undefined) {
      yield put(setPayoutsData(initData.game.config.plinkoConfig.payoutConfigs))
      yield put(setRounding(initData.financial.currency.rounding))
      yield put(setDenominator(initData.financial.currency.denominator))
      yield put(setBalance(initData.player.balance.amount))
      yield put(setCurrency(initData.player.balance.currency))
      yield put(setBetmax(initData.game.config.maxBet))
      yield put(setBetmin(initData.game.config.minBet))
    }
    yield put(gotoLoadPathAsync())
    yield take(completeState)
  }

  yield put(gotoGameAsync())
}

function* initSaga() {
  while (true) {
    yield take(gotoInitAsync.type)
    const gotoInitTask: Task = yield fork(gotoInit)

    yield take([gotoGameAsync.type, gotoIdleAsync.type, gotoFinishAsync.type])
    yield cancel(gotoInitTask)
  }
}

export default initSaga
