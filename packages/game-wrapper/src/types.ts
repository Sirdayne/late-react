import { AnyAction, Store } from '@reduxjs/toolkit'

export type GameWrapperProps = {
  backgroundColor?: number
  children: any
  fonts?: string[]
  onLoaded: () => void
  onProgress: (progress: number) => void
  store: Store<any, AnyAction>
}
