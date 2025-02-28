import { getInit as mockGetInit } from './mock/getInit'
import { getInit as realGetInit } from './real/getInit'
import { InitResponse } from './types'
import { isMock } from './utils'

const getState = (): Promise<InitResponse> => {
  return (isMock() ? mockGetInit : realGetInit)()
}

export default getState
