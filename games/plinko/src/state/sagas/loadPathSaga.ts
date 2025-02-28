import wait from '@apis-games-front/wait'
import { call, fork, put, select, take } from 'redux-saga/effects'

import { version } from '../../../package.json'
import { getRows } from '../selectors/playgroundSelector'
import { completeState, gotoGameAsync, gotoLoadPathAsync } from '../slices/gameSlice'
import { setPath } from '../slices/playgroundSlice'
import { setInterfaceDisabled } from '../slices/interfaceSlice'

type FileData = {
  name: string
  sensors: Record<string, string[]>
}

async function getPaths(rows: number): Promise<FileData> {
  return await fetch(`./assets/data/rows_${rows.toString()}.json?n=${version}`).then((response) => response.json())
}

function* gotoLoad() {
  const rows: number = yield select(getRows)
  yield put(setInterfaceDisabled(true))
  const data: FileData = yield call(getPaths, rows)
  console.log(`load complete: ${JSON.stringify(data.name)}`)
  yield put(setPath(data.sensors))
  yield put(setInterfaceDisabled(false))

  yield put(completeState())
  yield call(wait, 200)

  yield put(gotoGameAsync())
}

function* loadPathSaga() {
  while (true) {
    yield take(gotoLoadPathAsync.type)
    yield fork(gotoLoad)
    // const gotoLoadTask: Task = yield fork(gotoLoad)
    // yield take([gotoGameAsync.type, gotoIdleAsync.type])
    // yield cancel(gotoLoadTask)
  }
}

export default loadPathSaga
