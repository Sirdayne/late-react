import { Howl } from 'howler'
import { useCallback, useEffect, useMemo, useRef } from 'react'

import { getHowl } from './getHowl'
import { PlayFunction, PlayOptions, ReturnedValue, SoundProps } from './types'

function useSound(
  url?: string,
  { loop = false, onComplete = null, rate = 1, volume = 1 }: SoundProps = {},
): ReturnedValue {
  const isPlayingRef = useRef(false)
  const sound = useMemo<Howl | null>(() => (url !== undefined ? getHowl(url) : null), [url])
  const initProps = useRef<SoundProps>({ loop, onComplete, rate, volume })
  initProps.current.volume = volume
  initProps.current.rate = rate
  initProps.current.loop = loop
  initProps.current.onComplete = onComplete

  useEffect(() => {
    if (sound) {
      sound.volume(volume)
      sound.rate(rate)
      sound.loop(loop)
    }
  }, [sound, volume, rate, loop])

  const play = useCallback<PlayFunction>(
    (props: PlayOptions = {}): number => {
      const {
        interrupt = true,
        loop = false,
        onComplete = null,
        rate = 1,
        volume = 1,
      } = {
        ...initProps.current,
        ...props,
      }

      if (!sound) {
        return -1
      }

      if (interrupt) {
        sound.stop()
      }

      sound.volume(volume)
      sound.rate(rate)
      sound.loop(loop)

      const id = sound.play()

      sound.once('end', () => {
        if (!sound.playing()) {
          isPlayingRef.current = false
          if (onComplete !== null) {
            onComplete()
          }
        }
      })

      isPlayingRef.current = true

      return id
    },
    [sound],
  )

  const stop = useCallback(
    (id: number | undefined) => {
      if (sound) {
        sound.stop(id)
      }
      isPlayingRef.current = false
    },
    [sound],
  )

  const pause = useCallback(
    (id: number | undefined) => {
      if (sound) {
        sound.pause(id)
      }
      isPlayingRef.current = false
    },
    [sound],
  )

  return {
    isPlayingRef,
    pause,
    play,
    sound,
    stop,
  } as ReturnedValue
}

export default useSound
