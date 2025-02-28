import { takeEvery, call, select } from 'redux-saga/effects'
import { getMusicMute, getSoundMute } from '../selectors/interfaceSelectors'
import { setMuteMusic, setMuteSound, setUnMuteMusic, setUnMuteSound } from '../slices/interfaceSlice'
import { BetResponse, getPlayerOptions } from '@apis-games-front/plinko-game-api'

function* handlePlayerOptionsUpdate() {
  try {
    console.log(`handlePlayerOptionsUpdate `)
    const muteMusic: string = yield select(getSoundMute)
    const muteSound: string = yield select(getMusicMute)

    const playerOptions = {
      isMusic: !muteMusic,
      isSound: !muteSound,
      risk: '1',
    }

    try {
      const response: BetResponse = yield call(getPlayerOptions, playerOptions)
      console.log(`Player options updated successfully: ${JSON.stringify(response)}`)
    } catch (error) {
      console.error('Failed to update player options:', error)
    }
  } catch (error) {
    console.error('Failed to update player options:', error)
  }
}

export function* playerOptionsSaga() {
  yield takeEvery(setMuteMusic.type, handlePlayerOptionsUpdate)
  yield takeEvery(setMuteSound.type, handlePlayerOptionsUpdate)
  yield takeEvery(setUnMuteMusic.type, handlePlayerOptionsUpdate)
  yield takeEvery(setUnMuteSound.type, handlePlayerOptionsUpdate)
}

export default playerOptionsSaga
