import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const autoplaySlice = createSlice({
  name: 'autoplay',
  initialState: {
    maxRounds: 0,
    rounds: 0,
    speed: 50,
    stopOnBigWin: true,
  },
  reducers: {
    setAutoplayRounds: (state, action: PayloadAction<number>) => {
      state.rounds = action.payload
    },
    setAutoplayMaxRounds: (state, action: PayloadAction<number>) => {
      state.maxRounds = action.payload
    },
    setAutoplaySpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload
    },
    setStopAutoplayOnBigWIn: (state, action: PayloadAction<boolean>) => {
      state.stopOnBigWin = action.payload
    },
  },
})

export const { setAutoplayRounds, setAutoplayMaxRounds, setAutoplaySpeed, setStopAutoplayOnBigWIn } = autoplaySlice.actions
export default autoplaySlice.reducer
