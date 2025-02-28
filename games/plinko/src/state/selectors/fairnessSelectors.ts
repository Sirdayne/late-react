import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../types'
const getFairness = (state: RootState) => state.fairness
export const getFairnessSeedId = createSelector([getFairness], (dialog) => dialog.seedId)
export const getFairnessTab = createSelector([getFairness], (dialog) => dialog.tab)
