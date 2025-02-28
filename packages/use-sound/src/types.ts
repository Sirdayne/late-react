import { Howl } from 'howler'
import { MutableRefObject } from 'react'

export type PlayOptions = {
  interrupt?: boolean
  loop?: boolean
  // eslint-disable-next-line
  onComplete?: Function | null
  rate?: number
  volume?: number
}

export type PlayFunction = (options?: PlayOptions) => number

export type ReturnedValue = {
  isPlayingRef: MutableRefObject<boolean>
  pause: (id?: number) => void
  play: PlayFunction
  sound: Howl | null
  stop: (id?: number) => void
}

export type SoundProps = {
  loop?: boolean
  // eslint-disable-next-line
  onComplete?: Function | null
  rate?: number
  volume?: number
}
