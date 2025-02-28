import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FairGameData, FairListData } from '@apis-games-front/plinko-game-api'
import { useProcessedFairnessList } from '../../components/Interface/Honesty/hooks/useFairness'

const fairnessListSlice = createSlice({
  initialState: {
    page: 1,
    total: 0,
    perPage: 10,
    list: [],
    listLoading: false,
  },
  name: 'fairnessList',
  reducers: {
    fetchFairnessList: (state) => {
      state.listLoading = true
    },
    setFairnessList: (state, action: PayloadAction<FairGameData | FairListData>) => {
      state.listLoading = false
      state.list = useProcessedFairnessList(action.payload)
    },
    setFairnessListPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setFairnessListTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload
    },
  },
})

export const { fetchFairnessList, setFairnessList, setFairnessListPage, setFairnessListTotal } = fairnessListSlice.actions
export default fairnessListSlice.reducer
