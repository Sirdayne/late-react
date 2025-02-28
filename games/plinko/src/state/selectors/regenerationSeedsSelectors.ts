import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../types'
const getRegenerationSeeds = (state: RootState) => state.regenerationSeeds
export const getRegenerationClientSeed = createSelector([getRegenerationSeeds], (dialog) => dialog.clientSeed)
export const getRegenerationServerSeedHash = createSelector([getRegenerationSeeds], (dialog) => dialog.serverSeedHash)
export const getRegenerationIteration = createSelector([getRegenerationSeeds], (dialog) => dialog.iteration)
export const getRegenerationNewClientSeed = createSelector([getRegenerationSeeds], (dialog) => dialog.newClientSeed)
export const getRegenerationSeedsLoading = createSelector([getRegenerationSeeds], (dialog) => dialog.regenerationSeedsLoading)
