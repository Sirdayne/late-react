import axios, { AxiosError } from 'axios'
import axiosRetry from 'axios-retry'

import { TIMEOUT } from '../constants'
import { BetRequestData, BetResponse } from '../types'
import { getServerUrl, getToken } from '../utils'

const getTurn = (request: BetRequestData): Promise<BetResponse> => {
  axiosRetry(axios, {
    retries: 5,
    retryDelay: (retryCount) => {
      return retryCount * 1000
    },
    onRetry: (retryCount, error, requestConfig) => {
      console.log(`retryCount ${retryCount} error ${error}`)
    },
    retryCondition: (error: AxiosError) => {
      console.log(`retries or not error: ${error}`)
      return (
        (error && error.response && (error.response.status === 500 || error.response.status === 404)) ||
        axiosRetry.isNetworkOrIdempotentRequestError(error)
      )
    },
  })

  return axios
    .post<BetResponse>(
      '/v1/api/action/play',
      { data: request, type: 'bet_and_finish' },
      {
        baseURL: getServerUrl(),
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + getToken(),
          'Content-Type': 'application/json',
        },
        timeout: TIMEOUT,
        // withCredentials: true,
      },
    )
    .then((response) => {
      const action: BetResponse = response.data as BetResponse
      window.postMessage({ type: 'bet:success', data: action }, '*')
      return action
    })
    .catch((err) => {
      console.log('err', err.toString())
      // setSentryErrorStatus(span)
      const action: BetResponse = {
        statusCode: err.toString(),
        success: false,
      }
      window.postMessage({ type: 'error', data: action }, '*')
      return action
    })
    .finally(() => {
      // finishSentryEvent(span, transaction)
    })
}
export default getTurn
