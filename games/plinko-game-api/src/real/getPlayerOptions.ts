import axios from 'axios'

import { TIMEOUT } from '../constants'
import { PlayerOptionsResponse, PlayerOptionsData } from '../types'
import { getServerUrl, getToken } from '../utils'

const getPlayerOptions = (request: PlayerOptionsData): Promise<PlayerOptionsResponse> => {
  console.log('patchPlayerOptions', request)
  return axios
    .patch<PlayerOptionsResponse>('/v1/api/players/options',
      request, {
      baseURL: getServerUrl(),
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + getToken(),
        'Content-Type': 'application/json',
      },
      timeout: TIMEOUT,
    })
    .then((response) => {
      return response.data as PlayerOptionsResponse
    })
    .catch((err) => {
      console.log('err', err.toString())

      // setSentryErrorStatus(span)
      const action: PlayerOptionsResponse = {
        statusCode: err.toString(),
        success: false,
      }
      return action
    })
    .finally(() => {
      // finishSentryEvent(span, transaction)
    })
}
export default getPlayerOptions
