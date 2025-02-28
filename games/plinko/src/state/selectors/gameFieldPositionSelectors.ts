import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../types'

const getGameFieldPosition = (state: RootState) => state.gameFieldPosition
export const getGameFieldRight = createSelector([getGameFieldPosition], (gameField) => gameField.right)
export const getGameFieldIsAnimating = createSelector([getGameFieldPosition], (gameField) => gameField.isAnimating)
