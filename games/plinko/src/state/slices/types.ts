import { b } from 'vite/dist/node/types.d-aGj9QkWt'

export type ErrorState = {
  active: boolean
  errorData: string
}

export type InterfaceState = {
  animatedField: boolean
  bigWinAnimated: boolean
  disabled: boolean
  isMobile: boolean
  muteMusic: boolean
  muteSound: boolean
}

export type OverlayState = {
  active: boolean
}

export enum GameState {
  Autoplay = 'Autoplay',
  Bet = 'Bet',
  Finish = 'Finish',
  Game = 'Game',
  Idle = 'Idle',
  Init = 'Init',
  LoadPath = 'LoadPath',
}

export type GameStateState = {
  state: GameState
}
export type UserState = {
  authorization: boolean
  gameId: string
  nickname: string
  token: string
}

export type SceneType = 'error' | 'game_in' | 'game' | 'menu' | 'none' | 'pause'
export type SceneState = {
  currentScene: SceneType
}

export type Ball = {
  bigWinMultiplier: number
  id: string
  isBigWin: boolean
  multiplier: number
  pathData: string
  win: number
}
export type HistoryData = {
  id: number
  index: number
  isBigWin: boolean
  multiplier: number
}
export type BalanceHistory = {
  ballId: string
  win: number
}
export type BalanceState = {
  balance: number
  balanceHistory: BalanceHistory[]
  balanceProgress: number
  bet: number
  currency: string
  denominator: number
  rounding: number
  step: number
  betStep: number
  betmin: number
  betmax: number
  betValues: number[]
}
export type PayoutsData = {
  payouts: number[]
  risk: string
  rows: number
}
export type PlaygroundState = {
  balls: Ball[]
  bigWinActive: boolean
  bigWinStartAnimation: boolean
  bigWinValue: string
  history: HistoryData[]
  historyIndex: number
  path: Record<string, string[]>
  pathData: string
  payouts: number[]
  payoutsData: PayoutsData[]
  risk: string
  rows: number
  sensorIndex: number
  timesAvr: number
  timestamps: number[]
}
