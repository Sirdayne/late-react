import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const fairnessSlice = createSlice({
  initialState: {
    seedId: '',
    tab: 'verification',
  },
  name: 'fairness',
  reducers: {
    setFairnessTab: (state, action: PayloadAction<string>) => {
      state.tab = action.payload
    },
    setSeedId: (state, action: PayloadAction<string>) => {
      state.seedId = action.payload
    },
  },
})

export const { setFairnessTab, setSeedId } = fairnessSlice.actions
export default fairnessSlice.reducer
