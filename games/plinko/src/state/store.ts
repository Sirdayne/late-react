import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './rootReducer'
import rootSaga from './rootSaga'
import { socketMiddleware } from './middlewares/socketMiddleware'

const sagaMiddleware = createSagaMiddleware()

const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: false,
  }),
  sagaMiddleware,
  socketMiddleware,
]

export const store = configureStore({
  //devTools: process.env.NODE_ENV !== 'production',
  middleware,
  reducer: rootReducer,
})

sagaMiddleware.run(rootSaga)

export default store
