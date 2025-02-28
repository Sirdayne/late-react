import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../types'
const getFairnessSeedState = (state: RootState) => state.fairnessSeed
export const getFairnessSeed = createSelector([getFairnessSeedState], (dialog) => dialog.fairnessSeed)
export const getFairnessSeedLoading = createSelector([getFairnessSeedState], (dialog) => dialog.fairnessSeedLoading)
