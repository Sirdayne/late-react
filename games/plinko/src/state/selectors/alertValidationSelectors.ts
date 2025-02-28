import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../types'

const getAlert = (state: RootState) => state.alertValidation
export const getAlertValidation = createSelector([getAlert], (alert) => alert.alertValidation)
export const getAlertValidationDelay = createSelector([getAlert], (alert) => alert.delay)
export const getAlertValidationText = createSelector([getAlert], (alert) => alert.text)
export const getAlertValidationType = createSelector([getAlert], (alert) => alert.type)
