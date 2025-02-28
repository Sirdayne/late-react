import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../types'

const getScene = (state: RootState) => state.scene
export const getSceneCurrent = createSelector([getScene], (scene) => scene.currentScene)
