import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PayoutsData, PlaygroundState } from './types'

const initialState: PlaygroundState = {
  balls: [],
  bigWinActive: false,
  bigWinStartAnimation: false,
  bigWinValue: '',
  history: [],
  historyIndex: 0,
  path: {},
  pathData: '',
  payouts: [12, 3.2, 1.6, 1.4, 1.1, 1, 0.4, 1, 1.1, 1.4, 1.6, 3.2, 12],
  payoutsData: [],
  risk: 'low',
  rows: 8,
  sensorIndex: 0,
  timesAvr: 10000,
  timestamps: [],
}
const playgroundSlice = createSlice({
  initialState,
  name: 'playground',
  reducers: {

    addBall: (state, action: PayloadAction<{
      ballId: string;
      bigWinMultiplier: number,
      isBigWin: boolean,
      multiplier: number;
      pathData: string;
      win: number
    }>) => {
      if (action.payload.isBigWin) {
        state.bigWinActive = true
        state.bigWinValue = `×${action.payload.bigWinMultiplier}`
      }
      const id = action.payload.ballId
      const index = Math.random() > 0.5
        ? state.payouts.indexOf(action.payload.multiplier)
        : state.payouts.lastIndexOf(action.payload.multiplier)
      const paths = state.path[`sensor_${index.toString(10)}`]
      if (paths.length > 0) {
        state.pathData = gsap.utils.random(paths)
      }
      state.balls.push({
        bigWinMultiplier: action.payload.bigWinMultiplier,
        id: id,
        isBigWin: action.payload.isBigWin,
        multiplier: action.payload.multiplier,
        pathData: state.pathData, //action.payload.pathData,
        win: action.payload.win,
      })
    },
    addHistory: (state, action: PayloadAction<{ isBigWin: boolean, multiplier: number }>) => {
      const index = state.historyIndex++
      const multiplier: number = action.payload.multiplier // state.payouts[action.payload]
      const id: number = action.payload.isBigWin ? 0 : state.payouts.indexOf(multiplier)
      const history = { id: id, index: index, isBigWin: action.payload.isBigWin, multiplier: multiplier }
      state.history.unshift(history)
    },
    addSensorIndex: (state) => {
      state.sensorIndex = (state.sensorIndex + 1) % (state.rows + 1)
    },
    addTimestamp: (state) => {
      state.timestamps.push(Date.now())
      if (state.timestamps.length > 5) {
        state.timestamps.shift()
      }
    },
    completeBigWin: (state) => {
      state.bigWinActive = false
    },
    generatePathData: (state) => {
      let exit = false
      while (!exit) {
        const paths = state.path[`sensor_${state.sensorIndex.toString(10)}`]
        if (paths.length > 0) {
          state.pathData = gsap.utils.random(paths)
          exit = true
        } else {
          state.sensorIndex = (state.sensorIndex + 1) % (state.rows + 1)
        }
      }
    },
    removeBall: (state, action: PayloadAction<string>) => {
      state.balls = [...state.balls.filter(({ id }) => id !== action.payload)]
    },
    setBigWinActive: (state) => {
      state.bigWinActive = true
    },
    setBigWinStartAnimation: (state, action: PayloadAction<boolean>) => {
      state.bigWinStartAnimation = action.payload
    },
    setPath: (state, action: PayloadAction<Record<string, string[]>>) => {
      state.path = action.payload
    },
    setPayoutsData: (state, action: PayloadAction<PayoutsData[]>) => {
      state.payoutsData = action.payload
      const payoutsValue = state.payoutsData.find(
        (item) => item.rows === state.rows && item.risk === state.risk,
      )
      if (payoutsValue) {
        state.payouts = payoutsValue.payouts
      }
    },
    setRiskState: (state, action: PayloadAction<string>) => {
      state.risk = action.payload
      const payoutsValue = state.payoutsData.find(
        (item) => item.rows === state.rows && item.risk == state.risk,
      )
      if (payoutsValue) {
        state.payouts = payoutsValue.payouts
      }
    },
    setRowsState: (state, action: PayloadAction<number>) => {
      state.rows = action.payload
      const payoutsValue = state.payoutsData.find(
        (item) => item.rows == state.rows && item.risk == state.risk,
      )
      if (payoutsValue) {
        state.payouts = payoutsValue.payouts
      }
    },
    setTimesAvr: (state) => {
      const time = Date.now()
      const times = state.timestamps
      if (times.length > 2) {
        const average = (array: number[]) => array.reduce((i: number, n: number) => i + n) / array.length
        state.timesAvr = time - average(times)
      }
    },
  },
})
export const {
  addBall,
  addHistory,
  addSensorIndex,
  addTimestamp,
  completeBigWin,
  generatePathData,
  removeBall,
  setBigWinActive,
  setBigWinStartAnimation,
  setPath,
  setPayoutsData,
  setRiskState,
  setRowsState,
  setTimesAvr,
} = playgroundSlice.actions
export default playgroundSlice.reducer
