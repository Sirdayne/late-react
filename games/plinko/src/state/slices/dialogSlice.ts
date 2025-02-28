import { createSlice } from '@reduxjs/toolkit'

const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    settings: false,
    maxBet: false,
    honesty: false,
    autoplay: false,
    aboutGame: false,
    fairnessVerification: false
  },
  reducers: {
    closeMaxBet: (state) => {
      state.maxBet = false
    },
    closeSettings: (state) => {
      state.settings = false
    },
    openMaxBet: (state) => {
      state.maxBet = true
    },
    openSettings: (state) => {
      state.settings = true
    },
    toggleMaxBet: (state) => {
      state.maxBet = !state.maxBet
    },
    openHonesty: (state) => {
      state.honesty = true
    },
    closeHonesty: (state) => {
      state.honesty = false
    },
    openAutoplay: (state) => {
      state.autoplay = true
    },
    closeAutoplay: (state) => {
      state.autoplay = false
    },
    openAboutGame: (state) => {
      state.aboutGame = true
    },
    closeAboutGame: (state) => {
      state.aboutGame = false
    },
    openFairnessVerification: (state) => {
      state.fairnessVerification = true
    },
    closeFairnessVerification: (state) => {
      state.fairnessVerification = false
    },
  },
})

export const { openSettings, closeSettings, openMaxBet, closeMaxBet, toggleMaxBet, openHonesty, closeHonesty, openAutoplay, closeAutoplay, openAboutGame, closeAboutGame, openFairnessVerification, closeFairnessVerification } = dialogSlice.actions
export default dialogSlice.reducer
