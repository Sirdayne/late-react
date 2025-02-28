import { Middleware } from 'redux'
import { io, Socket } from 'socket.io-client'

import {
  setBalance,
  setBetmax,
  setBetmin,
  setCurrency,
  setDenominator,
  setRounding, setBetStep, setBetValues, setBet,
} from '../slices/balanceSlice'
import { setPayoutsData } from '../slices/playgroundSlice'
import { setAuthorization } from '../slices/userSlice'
import { RootState } from '../types'
import { gotoLoadPathAsync } from '../slices/gameSlice'
import { setMuteMusic, setMuteSound, setUnMuteMusic, setUnMuteSound } from '../slices/interfaceSlice'

const SERVER_URL = import.meta.env.VITE_SERVER_SOCKET
export const socketMiddleware: Middleware = (store) => {
  let socket: Socket

  return (next) => (action) => {
    const state = store.getState() as RootState
    const needInitSocket = !state.user.authorization && socket === undefined
    if (needInitSocket && state.user.token !== '') {
      console.log(`state.user.token:${state.user.token}`)
      socket = io(SERVER_URL, {
        auth: {
          token: state.user.token,
        },
        // withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        transports: ['websocket', 'polling'],
      })
      /**
       socket.on 'connect',-> console.log 'connected'
       socket.on 'reconnect',-> console.log 'reconnect'
       socket.on 'connecting',-> console.log 'connecting'
       socket.on 'reconnecting',-> console.log 'reconnecting'
       socket.on 'connect_failed',-> console.log 'connect failed'
       socket.on 'reconnect_failed',-> console.log 'reconnect failed'
       socket.on 'close',-> console.log 'close'
       socket.on 'disconnect',-> console.log 'disconnect'
       */

      socket.on('connect', () => {
        console.log(`.. ${SERVER_URL}  is  connect`)
        store.dispatch(setAuthorization())
      })

      socket.on('error', (data) => {
        console.log(`error:${JSON.stringify(data)} `)
      })
      socket.on('disconnect', (data) => {
        console.log(`disconnect:${data} `)
      })
      socket.on('authSuccess', (data) => {
        console.log(`authSuccess:${JSON.stringify(data)} `)
        // if (data) {
        store.dispatch(setPayoutsData(data?.game.config.plinkoConfig.payoutConfigs))
        store.dispatch(setRounding(data?.financial.currency.rounding))
        store.dispatch(setDenominator(data?.financial.currency.denominator))
        store.dispatch(setBalance(data?.player.balance.amount))
        store.dispatch(setCurrency(data?.financial.currency.code))

        store.dispatch(setBetmax(data?.financial.betLimits.max))
        store.dispatch(setBetmin(data?.financial.betLimits.min))
        store.dispatch(setBet(data?.financial.betLimits.min))
        store.dispatch(setBetStep(data?.financial.betLimits.step))
        store.dispatch(setBetValues(data.game.config.betValues))

        store.dispatch(!data?.player.options.isMusic ? setMuteMusic() : setUnMuteMusic())
        store.dispatch(!data?.player.options.isSound ? setMuteSound() : setUnMuteSound())

        store.dispatch(gotoLoadPathAsync())
        const progressBarContainerElement = document.querySelector('.progress-bar-container') as HTMLElement
        progressBarContainerElement.className += ' done'
        // }
      })
    }
    // to emit data to server
    /*if (actions.sendMessage.match(action) && socket) {
      socket.emit('ON_MESSAGE', action.payload)
    }*/
    next(action)
  }
}
