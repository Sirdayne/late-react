export type FairRequestData = {
  clientSeed: string
  gameCode: string
  iteration: number
  risk: string
  rows: number
  serverSeed: string
}
export type BetRequestData = {
  amount: number
  currency: string
  risk: string
  rows: number
}
export type BetData = {
  balance: number
  betAmount: number
  // currency: string
  game: {
    gameCode: string
    risk: string
    rows: number
  }
  isRoundClosed: boolean
  pendingWin: number
  result: {
    ballPosition: number
    bigWinMultiplier: number
    fullPath: {
      date: string
      pin: string
      type: 8
    }
    isBigWin: boolean
    multiplier: number
    path: number[]
  }
  roundId: string
  // multiplier: number
  winAmount: number
}
export type BetResponse = {
  data?: BetData
  statusCode: string
  success: boolean
}
export type InitData = {
  context: {
    roundId: string
  }
  financial: Financial
  game: {
    config: {
      betstep: number
      betValues: number[]
      maxBet: number
      minBet: number
      plinkoConfig: {
        payoutConfigs: {
          payouts: number[]
          risk: string
          rows: number
        }[]
      }
    }
    gameCode: string
    name: string
    subType: string
    type: string
  }
  gameSeeds: SeedData
  jwt?: JWTData
  player: {
    balance: Balance
    nickName: string
    options: {
      isMusic: boolean
      isSound: boolean
      risk?: number
    }
  }
}
export type JWTData = {
  access: {
    expiresIn: number
    token: string
    type: string
  }
}
export type InitResponse = {
  data?: InitData
  statusCode: string
  success: boolean
}

export type SeedData = {
  current: Seed
  next: Seed
}

export type FairListData = {
  betAmount: number
  clientSeed: string
  multiplier: number
  serverSeed: string
  serverSeedHash: string
  time: string
  winAmount: number
  isRevealed: boolean
}[]
export type FairItemData = {
  betAmount: number
  winAmount: number
  gameName: string
  gameSubType: string
  clientSeed: string
  serverSeed: string
  serverSeedHash: string
  iterations: number
  gameContext: FairGameData
  previousActionId: string
  nextActionId: string
}
export type FairGameData = {
  ballPosition: number
  bigWinMultiplier: number
  isBigWin: boolean
  multiplier: number
  path: number[]
}
export type FairResponse = {
  data?: FairGameData | FairListData | SeedData | FairItemData
  statusCode: string
  success: boolean
}
export type FairHistory = {
  data: FairGameData | FairListData | SeedData
  total: number
}
export type Seed = {
  clientSeed: string
  iteration?: number
  serverSeedHash: string
}
export type Balance = {
  amount: number
  currency: string
}
export type Financial = {
  betLimits: {
    max: number
    min: number
    step: number
  }
  currency: {
    code: string
    denominator: number
    rounding: number
    symbol: string
  }
}
export type Account = {
  balance: number
  currency: string
  nickName: string
  rounding: number
}

export type BigWinData = {
  enabled: boolean
}

export type BigWinResponse = {
  data?: boolean
  statusCode: string
  success: boolean
}

export type GetBigWinResponse = {
  data: any
  statusCode: string
  success: boolean
}
export type PlayerOptionsData = {
  isMusic: boolean
  isSound: boolean
  risk?: number
}
export type PlayerOptionsResponse = {
  data?: boolean
  statusCode: string
  success: boolean
}
