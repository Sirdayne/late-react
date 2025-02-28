import axios from 'axios'

import { TIMEOUT } from '../constants'
import { FairResponse } from '../types'
import { getServerUrl, getToken } from '../utils'

const getFairnessList = (offset = 1, limit = 10): Promise<FairResponse> => {
  return axios
    .get<FairResponse>(`/v1/api/fairness/history?offset=${offset}&limit=${limit}`, {
      baseURL: getServerUrl(),
      // withCredentials: true,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + getToken(),
        'Content-Type': 'application/json',
      },
      timeout: TIMEOUT,
    })
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

export default getFairnessList
