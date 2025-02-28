import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BalanceHistory, BalanceState } from './types'

const initialState: BalanceState = {
  balance: 1000,
  balanceHistory: [],
  balanceProgress: 0,
  bet: 100,
  betmax: 1000000,
  betmin: 10,
  currency: 'USD',
  denominator: 100,
  rounding: 2,
  step: 0,
  betStep: 0.1,
  betValues: []
}
const balanceSlice = createSlice({
  initialState,
  name: 'balance',
  reducers: {
    addBalanceHistory: (state, action: PayloadAction<BalanceHistory>) => {
      state.balanceHistory.push(action.payload)
      state.balanceProgress = state.balanceHistory.reduce((acc: number, { win }) => {
        return acc + win
      }, 0)
    },
    decreaseBet: (state) => {
      state.step += state.betStep
      const newBet = Number(state.bet) - state.step
      if (newBet > state.balance) {
        state.bet = state.balance
      } else if (newBet >= state.betmin) {
        state.bet = newBet
      } else {
        state.bet = state.betmin
      }
    },
    increaseBet: (state) => {
      state.step += state.betStep
      const newBet = Number(state.bet) + state.step
      const lowest = Math.min(state.balance, state.betmax)
      if (newBet > state.balance) {
        state.bet = state.balance
      } else if (newBet <= lowest) {
        state.bet = newBet
      } else {
        state.bet = lowest
      }
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload
    },
    setBet: (state, action: PayloadAction<number>) => {
      state.bet = action.payload
    },
    setBetmax: (state, action: PayloadAction<number>) => {
      state.betmax = action.payload
    },
    setBetmin: (state, action: PayloadAction<number>) => {
      state.betmin = action.payload
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload
    },
    setDenominator: (state, action: PayloadAction<number>) => {
      state.denominator = action.payload
    },
    setRounding: (state, action: PayloadAction<number>) => {
      state.rounding = action.payload
    },
    setStep: (state, action) => {
      state.step = action.payload
    },
    setBetStep: (state, action) => {
      state.betStep = action.payload
    },
    updateBalanceHistory: (state, action: PayloadAction<string>) => {
      const history = state.balanceHistory.filter((data) => data.ballId !== action.payload)
      state.balanceHistory = [...history]
      state.balanceProgress = history.reduce((acc: number, { win }) => {
        return acc + win
      }, 0)
    },
    setBetValues: (state, action: PayloadAction<number[]>) => {
      state.betValues = action.payload
    },
  },
})

export const {
  addBalanceHistory,
  decreaseBet,
  increaseBet,
  setBalance,
  setBet,
  setBetmax,
  setBetmin,
  setCurrency,
  setDenominator,
  setRounding,
  setStep,
  setBetStep,
  updateBalanceHistory,
  setBetValues
} = balanceSlice.actions

export default balanceSlice.reducer
