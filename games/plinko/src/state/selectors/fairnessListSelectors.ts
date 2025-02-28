import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../types'
const getFairnessListState = (state: RootState) => state.fairnessList
export const getFairnessList = createSelector([getFairnessListState], (dialog) => dialog.list)
export const getFairnessListLoading = createSelector([getFairnessListState], (dialog) => dialog.listLoading)
export const getFairnessListPage = createSelector([getFairnessListState], (dialog) => dialog.page)
export const getFairnessListPerPage = createSelector([getFairnessListState], (dialog) => dialog.perPage)
export const getFairnessListTotal = createSelector([getFairnessListState], (dialog) => dialog.total)
