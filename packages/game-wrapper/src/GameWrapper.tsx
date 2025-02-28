import { usePreloader } from '@apis-games-front/use-assets'
import useResize from '@apis-games-front/use-resize'
import { Stage } from '@pixi/react'
import { gsap } from 'gsap'
import * as PIXI from 'pixi.js'
import { Suspense, useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { clearInterval, setInterval } from 'worker-timers'

import { GameWrapperProps } from './types'
PIXI.settings.ROUND_PIXELS = true
PIXI.settings.RESOLUTION = 2
// PIXI.utils.clearTextureCache()
// PIXI.Cache.reset()
const canvasView = document.createElement('canvas')
// const canvasView = gameView.createElement('canvas')
const options = {
  antialias: true,
  autoDensity: true,
  backgroundColor: 0x000000,
  resolution: 2.5,
  view: canvasView,
}
console.log(`window.devicePixelRatio:${window.devicePixelRatio} PIXI option ${JSON.stringify(options)}`)
console.log(`PIXI.settings: ${JSON.stringify(PIXI.settings)}`)

//Math.min(2, window.devicePixelRatio),

function onMount(app: PIXI.Application) {
  useResize.renderer.set(app.renderer)

  let timerId: number | undefined
  const onChange = () => {
    if (timerId != null) {
      clearInterval(timerId)
    }
    timerId = undefined
    if (document.hidden) {
      gsap.ticker.lagSmoothing(0)
      timerId = setInterval(() => {
        gsap.ticker.tick()
        app.ticker.update()
        PIXI.Ticker.shared.update()
      }, 40)
    } else {
      gsap.ticker.lagSmoothing(500, 33)
    }
  }
  document.addEventListener('visibilitychange', onChange)
  onChange()
}

export default function({
                          backgroundColor = 0x000000,
                          children,
                          fonts,
                          onLoaded,
                          onProgress,
                          store,
                        }: GameWrapperProps) {

  options.backgroundColor = backgroundColor

  const progress = usePreloader(fonts)
  const [active, setActive] = useState(false)

  useEffect(() => {
    onProgress(progress)

    if (progress === 100) {
      const gameView = document.querySelector('.game-container') as HTMLElement
      if (gameView !== null) {
        gameView.appendChild(canvasView)
      }
      // document.body.appendChild(canvasView)
      setActive(true)
      onLoaded()
    }
  }, [progress, onLoaded, onProgress])

  return (
    <>
      {active && (
        <Stage options={options} onMount={onMount}>
          <Provider store={store}>
            <Suspense fallback={null}>{children}</Suspense>
          </Provider>
        </Stage>
      )}
    </>
  )
}
