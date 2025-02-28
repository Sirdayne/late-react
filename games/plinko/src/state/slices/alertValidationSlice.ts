import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_DELAY = 3000
const LOADING_DELAY = 150000
const alertValidationSlice = createSlice({
  initialState: {
    alertValidation: false,
    delay: DEFAULT_DELAY,
    text: '',
    type: 'default'
  },
  name: 'alertValidation',
  reducers: {
    openAlertValidation: (state, action: PayloadAction<string>) => {
      state.text = action.payload
      state.type = 'default'
      state.alertValidation = true
    },
    openAlertLoadingValidation: (state, action: PayloadAction<string>) => {
      state.text = action.payload
      state.delay = LOADING_DELAY
      state.type = 'loading'
      state.alertValidation = true
    },
    closeAlertValidation: (state) => {
      state.alertValidation = false
    },
    setAlertText: (state, action: PayloadAction<string>) => {
      state.delay = DEFAULT_DELAY
      state.text = action.payload
    },
    setAlertValidationDelay: (state, action: PayloadAction<number>) => {
      state.delay = action.payload
    },
    setAlertType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
  },
})

export const { openAlertValidation, closeAlertValidation, setAlertText, setAlertValidationDelay, openAlertLoadingValidation, setAlertType} = alertValidationSlice.actions
export default alertValidationSlice.reducer
