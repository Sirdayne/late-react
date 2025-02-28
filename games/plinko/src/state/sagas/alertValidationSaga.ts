import { delay, put, select, takeLatest } from 'redux-saga/effects'

import { closeAlertValidation, openAlertValidation } from '../slices/alertValidationSlice'
import { getAlertValidationDelay } from '../selectors/alertValidationSelectors'

function* handleOpenAlertValidation() {
  const delayValue: number = yield select(getAlertValidationDelay)
  if (delayValue > 0) {
    yield delay(delayValue)
    yield put(closeAlertValidation())
  }
}

export function* watchAlertValidationSaga() {
  yield takeLatest(openAlertValidation.type, handleOpenAlertValidation)
}

export default watchAlertValidationSaga
