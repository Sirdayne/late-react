import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../types'
const getFairnessGame = (state: RootState) => state.fairnessGame
export const getFairnessGameData = createSelector([getFairnessGame], (dialog) => dialog.fairnessGameData)
