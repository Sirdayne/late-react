import FontFaceObserver from 'fontfaceobserver'
import { useEffect, useRef, useState } from 'react'

import PixiLoaderStatusEmitter, { EVENT_ERROR, EVENT_PROGRESS, EVENT_SUCCESS } from './PixiLoaderStatusEmitter'

function reload() {
  if (process.env.NODE_ENV == null || process.env.NODE_ENV === 'development') {
    throw new Error('проверь. не все загружается')
  } else {
    document.location.reload()
  }
}

export default function usePreloader(fonts?: string | string[]): number {
  const [progress, setProgress] = useState(0)
  const [fontIsLoaded, setFontIsLoaded] = useState(false)
  const [assetsIsLoaded, setAssetsIsLoaded] = useState(false)

  const fontsRef = useRef(fonts)

  useEffect(() => {
    const fonts = fontsRef.current
    if (fonts !== undefined) {
      Promise.all(
        (Array.isArray(fonts) ? fonts : [fonts]).map((fontName) => new FontFaceObserver(fontName).load(null, 60000)),
      ).then(
        () => {
          setFontIsLoaded(true)
        },
        () => {
          reload()
        },
      )
    } else {
      setFontIsLoaded(true)
    }
    const emitter = PixiLoaderStatusEmitter.getInstance()
    emitter.on(EVENT_SUCCESS, () => {
      setProgress(100)
      setAssetsIsLoaded(true)
    })
    emitter.on(EVENT_ERROR, () => {
      reload()
    })
    emitter.on(EVENT_PROGRESS, (progress: number) => {
      setProgress(progress)
    })
    emitter.status()
    return () => {
      emitter.off(EVENT_SUCCESS)
      emitter.off(EVENT_ERROR)
      emitter.off(EVENT_PROGRESS)
    }
  }, [])

  return fontIsLoaded && assetsIsLoaded ? 100 : Math.min(progress, 99)
}
