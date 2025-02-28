import { BigWinData, BigWinResponse } from '../types'

const postBigWin = (request: BigWinData): Promise<BigWinResponse> => {

  const response: BigWinResponse = {
    data: true,
    statusCode: 'SUCCESS',
    success: true,
  }

  return new Promise<BigWinResponse>((res) => {
    setTimeout(
      () => {
        res(response)
      },
      Math.random() * 100 + 50,
    )
  })
}

export { postBigWin }
