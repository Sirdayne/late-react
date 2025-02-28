import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const gameFieldPositionSlice = createSlice({
  initialState: {
    right: true,
    isAnimating: false
  },
  name: 'gameFieldPosition',
  reducers: {
    setLeft: (state) => {
      state.right = false
    },
    setRight: (state) => {
      state.right = true
    },
    setAnimating: (state, action: PayloadAction<boolean>) => {
      state.isAnimating = action.payload
    },
  },
})

export const { setLeft, setRight, setAnimating } = gameFieldPositionSlice.actions
export default gameFieldPositionSlice.reducer
