import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../types'

const getInterface = (state: RootState) => state.interface
export const getInterfaceDisabled = createSelector([getInterface], (reaction) => reaction.disabled)
export const getSoundMute = createSelector([getInterface], (reaction) => reaction.muteSound)
export const getMusicMute = createSelector([getInterface], (reaction) => reaction.muteMusic)
export const getIsMobile = createSelector([getInterface], (reaction) => reaction.isMobile)
export const getAnimatedField = createSelector([getInterface], (reaction) => reaction.animatedField)
export const getBigWinAnimated = createSelector([getInterface], (reaction) => reaction.bigWinAnimated)
