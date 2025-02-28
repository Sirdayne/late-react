import { SimpleSpine } from '@apis-games-front/spine'
import { getUseSpine, getUseTextures } from '@apis-games-front/use-assets'
import useResize from '@apis-games-front/use-resize'
import { Container, Graphics, PixiRef, Sprite } from '@pixi/react'
import { Spine } from 'pixi-spine'
import { useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'

import { getAnimatedField, getBigWinAnimated, getIsMobile } from '../../state/selectors/interfaceSelectors'
import { getAvrTimes, getBigWinActive, getBigWinStartAnimation } from '../../state/selectors/playgroundSelector'

const { useSpine } = getUseSpine({
  background: 'plinko_bg.json',
  bot: 'plinko_lightning_bot.json',
  top: 'plinko_lightning_top.json',
})
const { useTextures } = getUseTextures([`back/left.png`, `back/right.png`])
export default function() {
  const [leftTexture, rightTexture] = useTextures()
  const { background, bot, top } = useSpine()
  const arvTime = useSelector(getAvrTimes)
  const fieldAnimation = useSelector(getAnimatedField)
  const bigwinAnimation = useSelector(getBigWinAnimated)
  const bigWinStartAnimation = useSelector(getBigWinStartAnimation)

  const isMobile = useSelector(getIsMobile)
  const isBigWinActive = useSelector(getBigWinActive)
  const graphRef = useRef<PixiRef<typeof Graphics>>(null)
  const containerRef = useRef<PixiRef<typeof Container>>(null)
  const backRef = useRef<Spine>(null)
  const topRef = useRef<Spine>(null)
  const botRef = useRef<Spine>(null)
  const shine1Ref = useRef<PixiRef<typeof Sprite>>(null)
  const shine0Ref = useRef<PixiRef<typeof Sprite>>(null)
  const { height, width } = useResize()

  useEffect(() => {
    const gr = graphRef.current
    if (gr !== null) {
      gr.clear()
      gr.beginFill(0xffffff)
      gr.drawRoundedRect(0, 0, width, height, 24)
      gr.endFill()
    }
  }, [width, height, background])

  useEffect(() => {
    const animation = backRef.current
    if (animation !== null) {
      animation.state.setEmptyAnimation(0, 0)
      animation.state.addAnimation(0, 'BG', fieldAnimation, 0)
    }
  }, [background, fieldAnimation])

  useEffect(() => {
    const animationBot = botRef.current
    const animationTop = topRef.current
    if (animationBot !== null && animationTop !== null) {
      animationTop.state.setEmptyAnimation(0, 0)
      animationBot.state.setEmptyAnimation(0, 0)
      if (isBigWinActive && !bigWinStartAnimation) {
        animationTop.state.timeScale = 1
        animationBot.state.timeScale = 1
        animationTop.state.addAnimation(0, 'BG_Lightning_Top', true, 0)
        animationBot.state.addAnimation(0, 'BG_Lightning_Bot', true, 0)
      }
    }
  }, [bot, top, isBigWinActive, bigWinStartAnimation])

  useEffect(() => {
    const shine0 = shine0Ref.current
    const shine1 = shine1Ref.current
    if (shine0 && shine1) {
      shine0.visible = fieldAnimation
      shine1.visible = fieldAnimation
    }
  }, [fieldAnimation])
  useEffect(() => {
    const transparence = gsap.utils.mapRange(100, 1000, 1, 0, gsap.utils.clamp(100, 1000, arvTime))
    const shine0 = shine0Ref.current
    const shine1 = shine1Ref.current
    if (shine0 && shine1 && shine0.visible) {
      gsap.to(shine0, { duration: 1.5, ease: 'none', pixi: { alpha: transparence } })
      gsap.to(shine1, { duration: 1.5, ease: 'none', pixi: { alpha: transparence } })
      return () => {
        gsap.killTweensOf(shine0)
        gsap.killTweensOf(shine1)
      }
    }
  }, [arvTime])

  useEffect(() => {
    if (containerRef.current && graphRef.current) {
      containerRef.current.mask = graphRef.current
    }
  }, [])

  const delta = useMemo(() => (Math.max(width, height) / 340), [width, height])

  return (
    <Container ref={containerRef}>
      <SimpleSpine
        ref={backRef}
        anchor={0.5}
        spineData={background}
        position={[width / 2, height / 2]}
        width={width}
        height={height}
      />
      <SimpleSpine
        ref={topRef}
        anchor={0.5}
        spineData={top}
        position={[width - 170 * delta, 170 * delta]}
        scale={delta}
      />
      <SimpleSpine
        ref={botRef}
        anchor={0.5}
        spineData={bot}
        position={[170 * delta, height - 170 * delta]}
        scale={delta}
      />
      <Sprite ref={shine1Ref} texture={leftTexture} anchor={[0, 1]} y={height} scale={isMobile ? 0.35 : 0.45} />
      <Sprite ref={shine0Ref} texture={rightTexture} anchor={[1, 0]} x={width} scale={isMobile ? 0.35 : 0.45} />
      <Graphics ref={graphRef} />
    </Container>
  )
}
