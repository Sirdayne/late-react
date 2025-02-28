import { Howl } from 'howler'

export const cache: Record<string, Howl> = {}

export function getHowl(url: string): Howl {
  if (cache[url] === undefined) {
    const sound = new Howl({
      preload: true,
      src: [url],
    })
    cache[url] = sound

    return sound
  } else {
    return cache[url]
  }
}
