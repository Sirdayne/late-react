import { getPlayerOptions as mockGetPlayerOptions } from './mock/getPlayerOptions'
import realGetPlayerOptions from './real/getPlayerOptions'
import { PlayerOptionsResponse, PlayerOptionsData } from './types'
import { isMock } from './utils'

const getPlayerOptions = (request: PlayerOptionsData): Promise<PlayerOptionsResponse> => {
  return (isMock() ? mockGetPlayerOptions : realGetPlayerOptions)(request)
}

export default getPlayerOptions
