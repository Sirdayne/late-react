import { Container, Sprite } from '@pixi/react'
import * as PIXI from 'pixi.js'
import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { getSceneCurrent } from '../../state/selectors/sceneSelector'
import Background from '../Background'
import GameField from '../GameField'
import SoundsView from '../SoundsView'

export default function () {
  const overlayRef = useRef<PIXI.Container>(null)
  const currentScene = useSelector(getSceneCurrent)
  const [scene, setScene] = useState(currentScene)

  useEffect(() => {
    const overlay = overlayRef.current as PIXI.Container
    const duration = 0.1
    overlay.interactive = true
    if (currentScene === 'pause' || currentScene === 'game_in') {
      setScene(currentScene)
      overlay.alpha = 0
      // clock.rotation = 0
      overlay.interactive = false
      globalThis.gsap.killTweensOf(overlay)
      return
    }
    globalThis.gsap.to(overlay, {
      duration: duration,
      ease: 'none',
      onComplete: () => {
        if (currentScene !== 'none') {
          setScene(currentScene)
          globalThis.gsap.to(overlay, {
            duration: duration,
            ease: 'none',
            onComplete: () => {
              overlay.interactive = false
            },
            pixi: { alpha: 0 },
          })
        }
      },
      pixi: { alpha: 1 },
    })

    return () => {
      globalThis.gsap.killTweensOf(overlay)
    }
  }, [currentScene])

  return (
    <>
      <Background />
      <GameField />
      <Container visible={scene === 'game' || scene === 'pause' || scene === 'game_in'}></Container>
      <Container ref={overlayRef}>
        <Sprite anchor={0.5} texture={PIXI.Texture.WHITE} tint={0x131629} width={3000} height={1500} />
      </Container>
      <SoundsView />
    </>
  )
}
