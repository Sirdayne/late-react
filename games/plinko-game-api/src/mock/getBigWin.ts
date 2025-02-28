import { BigWinData, GetBigWinResponse } from '../types'

const getBigWin = (request: BigWinData): Promise<GetBigWinResponse> => {

  const response: GetBigWinResponse = {
    data: {
      enabled: true
    },
    statusCode: 'SUCCESS',
    success: true,
  }

  return new Promise<GetBigWinResponse>((res) => {
    setTimeout(
      () => {
        res(response)
      },
      Math.random() * 100 + 50,
    )
  })
}

export { getBigWin }
