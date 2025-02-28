import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserState } from './types'

const initialState: UserState = {
  authorization: false,
  gameId: '',
  nickname: 'username',
  token: '',
}

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setAuthorization: (state) => {
      state.authorization = true
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
  },
})

export const { setAuthorization, setToken } = userSlice.actions
export default userSlice.reducer
