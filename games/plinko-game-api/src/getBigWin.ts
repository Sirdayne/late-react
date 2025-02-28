import { getBigWin as mockBigWin } from './mock/getBigWin'
import realGetBigWin from './real/getBigWin'
import { BigWinData, BigWinResponse } from './types'
import { isMock } from './utils'

const getBigWin = (request: BigWinData): Promise<BigWinResponse> => {
  return (isMock() ? mockBigWin : realGetBigWin)(request)
}

export default getBigWin
