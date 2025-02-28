import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../types'

const getDialog = (state: RootState) => state.dialog
export const getDialogSettings = createSelector([getDialog], (dialog) => dialog.settings)
export const getDialogMaxBet = createSelector([getDialog], (dialog) => dialog.maxBet)
export const getHonesty = createSelector([getDialog], (dialog) => dialog.honesty)
export const getDialogAutoplay = createSelector([getDialog], (dialog) => dialog.autoplay)
export const getDialogAboutGame = createSelector([getDialog], (dialog) => dialog.aboutGame)
export const getDialogFairnessVerification = createSelector([getDialog], (dialog) => dialog.fairnessVerification)
