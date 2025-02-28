import axios from 'axios'

import { TIMEOUT } from '../constants'
import { InitResponse } from '../types'
import { getBaseUrl, getToken } from '../utils'

const getInit = (): Promise<InitResponse> => {
  return axios
    .get<InitResponse>('api/v1/init', {
      baseURL: getBaseUrl(),
      // withCredentials: true,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + getToken(),
        'Content-Type': 'application/json',
      },
      timeout: TIMEOUT,
    })
    .then((response) => {
      return response.data as InitResponse
    })
    .catch((err) => {
      const action: InitResponse = {
        statusCode: err,
        success: false,
      }
      throw action
    })
}

export { getInit }
