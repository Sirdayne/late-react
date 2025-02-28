import { postBigWin as mockBigWin } from './mock/postBigWin'
import realPostBigWin from './real/postBigWin'
import { BigWinData, BigWinResponse } from './types'
import { isMock } from './utils'

const postBigWin = (request: BigWinData): Promise<BigWinResponse> => {
  return (isMock() ? mockBigWin : realPostBigWin)(request)
}

export default postBigWin
