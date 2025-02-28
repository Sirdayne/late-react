import { createSlice } from '@reduxjs/toolkit'

import { GameState, GameStateState } from './types'

const initialState: GameStateState = {
  state: GameState.Init,
}

const gameSlice = createSlice({
  initialState,
  name: 'game',
  reducers: {
    completeState: () => undefined,
    gotoAutoplayAsync: (state) => {
      state.state = GameState.Autoplay
    },
    gotoBetAsync: (state) => {
      state.state = GameState.Bet
    },
    gotoErrorAsync: (state) => {
      state.state = GameState.Init
    },
    gotoFinishAsync: (state) => {
      state.state = GameState.Finish
    },
    gotoGameAsync: (state) => {
      state.state = GameState.Game
    },
    gotoIdleAsync: (state) => {
      state.state = GameState.Idle
    },
    gotoInitAsync: (state) => {
      state.state = GameState.Init
    },
    gotoLoadPathAsync: (state) => {
      state.state = GameState.LoadPath
    },

  },
})

export const {
  completeState,
  gotoAutoplayAsync,
  gotoBetAsync,
  gotoErrorAsync,
  gotoFinishAsync,
  gotoGameAsync,
  gotoIdleAsync,
  gotoInitAsync,
  gotoLoadPathAsync,
} = gameSlice.actions
export default gameSlice.reducer
