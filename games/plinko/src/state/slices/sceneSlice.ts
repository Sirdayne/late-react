import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SceneState, SceneType } from './types'

const initialState: SceneState = {
  currentScene: 'none',
}
const sceneSlice = createSlice({
  initialState,
  name: 'scene',
  reducers: {
    setScene: (state, action: PayloadAction<SceneType>) => {
      state.currentScene = action.payload
    },
  },
})
export const { setScene } = sceneSlice.actions
export default sceneSlice.reducer
