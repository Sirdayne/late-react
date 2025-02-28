import { BetRequestData, BetResponse } from '../types'
import { account } from './getInit'
import jsonData from './mock_init.json'

const getTurn = (request: BetRequestData): Promise<BetResponse> => {
  const multipliers = jsonData.data.game.config.plinkoConfig.payoutConfigs.find(
    (value) => value.risk === request.risk && value.rows === request.rows,
  )
  const ballPosition = multipliers !== undefined ? Math.floor(Math.random() * multipliers.payouts.length) : 0
  const multiplier = multipliers !== undefined ? multipliers.payouts[ballPosition] : 0
  const win = request.amount * multiplier
  account.amount = account.amount + win - request.amount
  //{"success":true,"statusCode":"SUCCESS","data":{"amount":1,"win":1,"balance":5000,"result":{"ballPosition":2,"multiplier":1.1},"game":{"gameCode":"plinko","risk":"low","rows":8}}}

  const responce: BetResponse = {
    data: {
      balance: account.amount,
      betAmount: request.amount,
      // currency: account.currency,
      game: { gameCode: 'plinko', risk: request.risk, rows: request.rows },
      isRoundClosed: true,
      pendingWin: 0,
      result: {
        ballPosition: ballPosition,
        bigWinMultiplier: 0,
        fullPath: { pin: '010', type: 8, date: '' },
        isBigWin: false,
        multiplier: multiplier,
        path: [0, 1, 0],
      },
      roundId: 'DEMO_ROUND_ID',
      winAmount: win,
    },
    statusCode: 'SUCCESS',
    success: true,
  }

  return new Promise<BetResponse>((res) => {
    setTimeout(
      () => {
        res(responce)
      },
      Math.random() * 100 + 50,
    )
  })
}

export { getTurn }
