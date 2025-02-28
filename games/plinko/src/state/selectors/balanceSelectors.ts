import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../types'

const getBetState = (state: RootState) => state.balance
export const getBet = createSelector([getBetState], (balance) => balance.bet)
export const getBetmax = createSelector([getBetState], (balance) => balance.betmax)
export const getBetmin = createSelector([getBetState], (balance) => balance.betmin)
export const getBalance = createSelector([getBetState], (balance) => balance.balance - balance.balanceProgress)
export const getBalanceStrong = createSelector([getBetState], (balance) => balance.balance)
export const getBalanceHistory = createSelector([getBetState], (playground) => playground.balanceHistory)
export const getCurrency = createSelector([getBetState], (balance) => balance.currency)
export const getRounding = createSelector([getBetState], (balance) => balance.rounding)
export const getDenominator = createSelector([getBetState], (balance) => balance.denominator)
export const getStep = createSelector([getBetState], (balance) => balance.step)
export const getBetValues = createSelector([getBetState], (balance) => balance.betValues)
export const getBetStep = createSelector([getBetState], (balance) => balance.betStep)
