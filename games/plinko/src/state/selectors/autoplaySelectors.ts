import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../types'

const getAutoplay = (state: RootState) => state.autoplay
export const getAutoplayRounds = createSelector([getAutoplay], (dialog) => dialog.rounds)
export const getAutoplayMaxRounds = createSelector([getAutoplay], (dialog) => dialog.maxRounds)
export const getAutoplaySpeed = createSelector([getAutoplay], (dialog) => dialog.speed)
export const getStopAutoplayOnBigWIn = createSelector([getAutoplay], (dialog) => dialog.stopOnBigWin)
