import { BetResponse, getTurn } from '@apis-games-front/plinko-game-api'
import { call, delay, fork, put, select, take } from 'redux-saga/effects'
import { getBalanceStrong, getBet, getCurrency } from '../selectors/balanceSelectors'
import { getBigWinActive, getRisk, getRows } from '../selectors/playgroundSelector'
import { addBalanceHistory, setBalance } from '../slices/balanceSlice'
import { gotoBetAsync, gotoIdleAsync } from '../slices/gameSlice'
import { addBall, addTimestamp, setBigWinActive, setTimesAvr } from '../slices/playgroundSlice'
import { setScene } from '../slices/sceneSlice'
import { setInterfaceDisabled } from '../slices/interfaceSlice'

function generateGUID() {
  let guid = ''
  for (let i = 0; i < 16; i++) {
    guid += Math.floor(Math.random() * 16).toString(16)
  }
  return guid
}

function* betGame() {
  const activeBigWin: boolean = yield select(getBigWinActive)
  if (activeBigWin) {
    return
  }
  const bet: number = yield select(getBet)
  let balance: number = yield select(getBalanceStrong)
  yield put(setBalance(balance - bet))
  const rows: number = yield select(getRows)
  const risk: string = yield select(getRisk)
  const currency: string = yield select(getCurrency)
  yield put(gotoIdleAsync())
  try {
    const response: BetResponse = yield call(getTurn, {
      amount: bet,
      currency: currency,
      risk: risk,
      rows: rows,
    })
    console.log(`getTurn ..... continue`)
    yield put(addTimestamp())
    yield put(setTimesAvr())
    //console.log(`response:${JSON.stringify(response)}`)
    if (response.success) {
      console.log(JSON.stringify(response))
      const ballId = generateGUID()
      const data = response.data
      if (data) {
        if (data.result.isBigWin === true) {
          yield put(setBigWinActive())
          yield put(setInterfaceDisabled(true))
          yield delay(3000)
        }
        yield put(addBalanceHistory({ ballId: ballId, win: data.winAmount }))
        yield put(setBalance(data.balance))
        yield put(
          addBall({
            ballId: ballId,
            bigWinMultiplier: data.result.bigWinMultiplier,
            isBigWin: data.result.isBigWin,
            multiplier: data.result.multiplier,
            pathData: '', //data.result.fullPath.date,
            win: data.winAmount,
          }),
        )
        if (data.result.isBigWin === true) {
          yield delay(4000)
          yield put(setInterfaceDisabled(false))
        }
      }
      // yield delay(30)
    } else {
      console.warn(` response NOTsuccess : ${JSON.stringify(response)}`)
      balance = yield select(getBalanceStrong)
      yield put(setBalance(balance + bet))
      yield put(setScene('error'))
    }
  } catch (error) {
    balance = yield select(getBalanceStrong)
    yield put(setBalance(balance + bet))
    console.error(error)
    yield put(setScene('error'))
  }
}

function* betSaga() {
  while (true) {
    yield take(gotoBetAsync.type)
    yield fork(betGame)
  }
}

export default betSaga
