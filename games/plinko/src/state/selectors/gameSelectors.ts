import { createSelector } from '@reduxjs/toolkit'

import { GameState } from '../slices/types'
import { RootState } from '../types'

export const getGame = (state: RootState) => state.game
export const getGameState = (state: RootState) => state.game.state

export const gameStateIsInit = createSelector([getGameState], (state) => state === GameState.Init)
export const gameStateIsIdle = createSelector([getGameState], (state) => state === GameState.Idle)
export const gameStateIsInitOrIdle = createSelector(
  [getGameState],
  (state) => state === GameState.Idle || state === GameState.Init,
)
export const gameStateIsBet = createSelector([getGame], (game) => game.state === GameState.Bet)
export const gameStateIsFinish = createSelector([getGame], (game) => game.state === GameState.Finish)
