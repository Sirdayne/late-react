import { Howler } from 'howler'

let mutted = false
export const set = (value: boolean): void => {
  mutted = value
  Howler.mute(value)
}

export const get = (): boolean => {
  return mutted
}
