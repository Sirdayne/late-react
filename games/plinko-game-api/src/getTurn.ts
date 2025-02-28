import { getTurn as mockGetTurn } from './mock/getTurn'
import realGetTurn from './real/getTurn'
import { BetRequestData, BetResponse } from './types'
import { isMock } from './utils'

const getTurn = (request: BetRequestData): Promise<BetResponse> => {
  return (isMock() ? mockGetTurn : realGetTurn)(request)
}

export default getTurn
