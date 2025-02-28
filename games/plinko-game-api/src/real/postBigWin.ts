import axios from 'axios'

import { TIMEOUT } from '../constants'
import { BigWinData, BigWinResponse } from '../types'
import { getServerUrl, getToken } from '../utils'

const postBigWin = (request: BigWinData): Promise<BigWinResponse> => {
  console.log('postBigWin', request)
  return axios
    .post<BigWinResponse>('/v1/api/action/plinko-big-win',
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
      return response.data as BigWinResponse
    })
    .catch((err) => {
      console.log('err', err.toString())
      const action: BigWinResponse = {
        statusCode: err.toString(),
        success: false,
      }
      return action
    })
    .finally(() => {
      // finishSentryEvent(span, transaction)
    })
}
export default postBigWin
