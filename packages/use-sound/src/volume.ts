import { Howler } from 'howler'

export const set = (value: number): void => {
  Howler.volume(value)
}

export const get = (): number => {
  return Howler.volume()
}
