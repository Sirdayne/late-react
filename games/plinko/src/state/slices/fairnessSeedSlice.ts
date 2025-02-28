import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FairItemData } from '@apis-games-front/plinko-game-api'

const fairnessSeedSlice = createSlice({
  initialState: {
    fairnessSeed: null,
    fairnessSeedLoading: false
  },
  name: 'fairnessSeed',
  reducers: {
    fetchFairnessSeed: (state) => {
      state.fairnessSeedLoading = true
    },
    setFairnessSeed: (state, action: PayloadAction<FairItemData>) => {
      state.fairnessSeedLoading = false
      state.fairnessSeed = action.payload
    },
    setFairnessSeedLoading: (state, action: PayloadAction<boolean>) => {
      state.fairnessSeedLoading = action.payload
    },
  },
})

export const { fetchFairnessSeed, setFairnessSeed, setFairnessSeedLoading } = fairnessSeedSlice.actions
export default fairnessSeedSlice.reducer
