import { takeEvery, call, select } from 'redux-saga/effects'
import { getBigWinAnimated } from '../selectors/interfaceSelectors'
import { setBigWinAnimated } from '../slices/interfaceSlice'
import { BigWinData, BigWinResponse, postBigWin } from '@apis-games-front/plinko-game-api'

function* handleBigWinPost() {
  try {
    const enabled: boolean = yield select(getBigWinAnimated)

    const data: BigWinData = {
      enabled
    }

    try {
      const response: BigWinResponse = yield call(postBigWin, data)
      console.log(`Big Win setting updated successfully: ${JSON.stringify(response)}`)
    } catch (error) {
      console.error('Failed to update Big Win setting:', error)
    }
  } catch (error) {
    console.error('Failed to update Big Win setting:', error)
  }
}

export function* bigWinSaga() {
  yield takeEvery(setBigWinAnimated.type, handleBigWinPost)
}

export default bigWinSaga
