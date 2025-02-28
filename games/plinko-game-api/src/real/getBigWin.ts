import axios from 'axios'

import { TIMEOUT } from '../constants'
import { GetBigWinResponse } from '../types'
import { getServerUrl, getToken } from '../utils'

const getBigWin = (): Promise<GetBigWinResponse> => {
  return axios
    .get<GetBigWinResponse>('v1/api/action/plinko-big-win', {
      baseURL: getServerUrl(),
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + getToken(),
        'Content-Type': 'application/json',
      },
      timeout: TIMEOUT,
    })
    .then((response) => {
      return response.data as GetBigWinResponse
    })
    .catch((err) => {
      const action = {
        data: false,
        statusCode: err,
        success: false,
      }
      throw action
    })
}

export default getBigWin
