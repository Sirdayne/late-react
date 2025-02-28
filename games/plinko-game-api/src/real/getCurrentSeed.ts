import axios from 'axios'

import { TIMEOUT } from '../constants'
import { FairResponse } from '../types'
import { getServerUrl, getToken } from '../utils'

const getCurrentSeed = (): Promise<FairResponse> => {
  return axios
    .get<FairResponse>(
      '/v1/api/seeds',
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
      return response.data as FairResponse
    })
    .catch((err) => {
      const action: FairResponse = {
        statusCode: err,
        success: false,
      }
      throw action
    })
}

export default getCurrentSeed
