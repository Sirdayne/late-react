import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { InterfaceState } from './types'

const params = new URLSearchParams(window.location.search)
const interfaceState: InterfaceState = {
  animatedField: true,
  bigWinAnimated: true,
  disabled: false,
  isMobile: params.has('ismobile') ? true : false,
  muteMusic: false,
  muteSound: false,
}

const interfaceSlice = createSlice({
  initialState: interfaceState,
  name: 'interface',
  reducers: {
    setAnimatedField: (state, action: PayloadAction<boolean>) => {
      state.animatedField = action.payload
    },
    setBigWinAnimated: (state, action: PayloadAction<boolean>) => {
      state.bigWinAnimated = action.payload
    },
    setInterfaceDisabled: (state, action: PayloadAction<boolean>) => {
      state.disabled = action.payload
    },
    setMuteMusic: (state) => {
      state.muteMusic = true
    },
    setMuteSound: (state) => {
      state.muteSound = true
    },
    setUnMuteMusic: (state) => {
      state.muteMusic = false
    },
    setUnMuteSound: (state) => {
      state.muteSound = false
    },
  },
})

export const {
  setAnimatedField,
  setBigWinAnimated,
  setInterfaceDisabled,
  setMuteMusic,
  setMuteSound,
  setUnMuteMusic,
  setUnMuteSound,
} = interfaceSlice.actions
export default interfaceSlice.reducer
