import { Balance, InitResponse } from '../types'
import jsonData from './mock_init.json'

const account: Balance = {
  amount: 1000,
  currency: 'FUN',
}
jsonData.data.player.balance = account
const getInit = (): Promise<InitResponse> => {
  return new Promise<InitResponse>((res) => {
    setTimeout(
      () => {
        res(jsonData)
      },
      Math.random() * 100 + 50,
    )
  })
}
export { account, getInit }
