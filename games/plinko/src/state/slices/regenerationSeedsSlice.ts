import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Seed } from '@apis-games-front/plinko-game-api'

const regenerationSeedsSlice = createSlice({
  initialState: {
    clientSeed: '',
    serverSeedHash: '',
    iteration:'',
    newClientSeed: '',
    regenerationSeedsLoading: false
  },
  name: 'regenerationSeeds',
  reducers: {
    setRegenerationSeedData: (state, action: PayloadAction<Seed>) => {
      state.clientSeed = action.payload.current.clientSeed
      state.serverSeedHash = action.payload.current.serverSeedHash
      state.iteration = action.payload.current.iteration
      state.newClientSeed = action.payload.next.clientSeed
      state.regenerationSeedsLoading = false
    },
    setRegenerationNewClientSeed: (state, action: PayloadAction<string>) => {
      state.newClientSeed = action.payload
    },
    fetchRegenerationSeeds: (state) => {
      state.regenerationSeedsLoading = true
    },
    fetchCurrentSeed: (state) => {
      state.regenerationSeedsLoading = true
    },
  },
})

export const { setRegenerationNewClientSeed, fetchRegenerationSeeds , setRegenerationSeedData, fetchCurrentSeed} = regenerationSeedsSlice.actions
export default regenerationSeedsSlice.reducer
