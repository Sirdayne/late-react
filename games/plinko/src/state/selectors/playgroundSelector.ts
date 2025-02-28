import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../types'

const getPlayground = (state: RootState) => state.playground
export const getHistory = createSelector([getPlayground], (playground) => playground.history)
export const getPath = createSelector([getPlayground], (playground) => playground.path)
export const getPathData = createSelector([getPlayground], (playground) => playground.pathData)
export const getBalls = createSelector([getPlayground], (playground) => playground.balls)
export const isActiveBalls = createSelector([getPlayground], (playground) => playground.balls.length > 0)
export const getRows = createSelector([getPlayground], (playground) => playground.rows)
export const getRisk = createSelector([getPlayground], (playground) => playground.risk)
export const getPayouts = createSelector([getPlayground], (playground) => playground.payouts)
export const getAvrTimes = createSelector([getPlayground], (playground) => playground.timesAvr)
export const getBigWinActive = createSelector([getPlayground], (playground) => playground.bigWinActive)
export const getBigWinStartAnimation = createSelector([getPlayground], (playground) => playground.bigWinStartAnimation)
export const getBigWinValue = createSelector([getPlayground], (playground) => playground.bigWinValue)
