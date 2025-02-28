import axios from 'axios'

import { TIMEOUT } from '../constants'
import { FairResponse } from '../types'
import { getServerUrl, getToken } from '../utils'

const getFairness = (id: string): Promise<FairResponse> => {
  return axios
    .get<FairResponse>(`/v1/api/fairness?id=${id}`, {
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
      return response.data
    })
    .catch((err) => {
      const action: FairResponse = {
        statusCode: err,
        success: false,
      }
      throw action
    })
}

export default getFairness
