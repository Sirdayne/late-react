import axios from 'axios'

import { TIMEOUT } from '../constants'
import { FairRequestData, FairResponse } from '../types'
import { getServerUrl, getToken } from '../utils'

const getFairnessGame = (request: FairRequestData): Promise<FairResponse> => {
  return axios
    .post<FairResponse>(
      '/v1/api/fairness/plinko',
      request,
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

export default getFairnessGame
