import { getUseSpritesheets } from '@apis-games-front/use-assets'
import { Container, Graphics, PixiRef, Sprite, Text } from '@pixi/react'
import * as PIXI from 'pixi.js'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react'

import { ASSETS_IMAGE_PINS, colorRange, COLORS, TEXT_STYLE, TEXT_STYLE_16 } from './constants'
import { b } from 'vite/dist/node/types.d-aGj9QkWt'

const { useSpritesheets } = getUseSpritesheets(`field-0.json`)
type SensorProps = {
  index: number
  rows: number
  text: string
  visible: boolean
  x: number
  y: number
}
export type SensorGlow = {
  active: () => void
};
export default forwardRef(function({ index, rows, text, visible, x, y }: SensorProps, ref) {
  const { getTexture } = useSpritesheets()
  const texture = useMemo(() => getTexture(ASSETS_IMAGE_PINS[3]), [getTexture])

  const grRef = useRef<PixiRef<typeof Graphics>>(null)
  const contenterRef = useRef<PixiRef<typeof Container>>(null)
  const glowRef = useRef<PixiRef<typeof Sprite>>(null)
  const color = useMemo(() => COLORS[colorRange(rows, index)], [rows, index])

  useImperativeHandle(ref, () => ({
    active() {
      const sensor = contenterRef.current
      const glow = glowRef.current
      if (glow && sensor) {
        glow.visible = true
        gsap.to(sensor, {
          duration: 0.05,
          ease: 'none',
          onComplete: () => {
            gsap.to(sensor, {
              duration: 0.15,
              ease: 'none',
              onComplete: () => {
                glow.visible = false
              },
              y: y,
            })
          },
          y: y + 10,
        })
      }
    },
  }))

  useEffect(() => {
    const gr = grRef.current
    const width = 50
    const height = 20
    if (gr) {
      gr.clear()
      gr.beginFill(0xffffff)
      gr.drawRoundedRect(-width / 2, -height / 2, width, height, 15)
      gr.endFill()
    }
  }, [])
  return (
    <Container x={x} y={y} scale={0.6} ref={contenterRef} visible={visible}>
      <Sprite ref={glowRef} visible={false} tint={color} texture={texture} anchor={[0.5, 0.75]} />
      <Graphics ref={grRef} tint={color} />
      <Text
        anchor={0.5}
        text={text}
        tint={color}
        style={rows === 16 ? TEXT_STYLE_16 : TEXT_STYLE}
        x={0}
        y={rows === 16 ? 31 : 24}
      />
    </Container>
  )
})
