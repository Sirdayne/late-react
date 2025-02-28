import { PlayerOptionsData, PlayerOptionsResponse } from '../types'

const getPlayerOptions = (request: PlayerOptionsData): Promise<PlayerOptionsResponse> => {
  const response: PlayerOptionsResponse = {
    data: true,
    statusCode: 'SUCCESS',
    success: true,
  }

  return new Promise<PlayerOptionsResponse>((res) => {
    setTimeout(
      () => {
        res(response)
      },
      Math.random() * 100 + 50,
    )
  })
}

export { getPlayerOptions }
