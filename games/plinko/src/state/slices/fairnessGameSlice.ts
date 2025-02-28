import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FairRequestData } from '@apis-games-front/plinko-game-api'

const fairnessGameSlice = createSlice({
  initialState: {
    fairnessGameData: null,
    fairnessGameLoading: false,
    fairnessGameIteration: null
  },
  name: 'fairnessGame',
  reducers: {
    setFairnessGameData: (state, action: PayloadAction<FairRequestData>) => {
      state.fairnessGameData = action.payload
    },
    fetchFairnessGame: (state) => {
      state.fairnessGameLoading = true
    },
    setFairnessGameDataIteration: (state, action: PayloadAction<number>) => {
      state.fairnessGameData.iteration = action.payload
    },
  },
})

export const { setFairnessGameData, fetchFairnessGame, setFairnessGameDataIteration } = fairnessGameSlice.actions
export default fairnessGameSlice.reducer
