import { Container, Graphics, PixiRef, Sprite, Text } from '@pixi/react'
import { useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'

import { getRows } from '../../state/selectors/playgroundSelector'
import {
  colorRange,
  COLORS,
  HISTORY_GAP,
  HISTORY_ITEM_VIEW_COUNT,
  TEXT_STYLE_HISTORY,
  ASSETS_HISTORY_BIG_WIN,
} from './constants'
import { getUseTextures } from '@apis-games-front/use-assets'

const { useTextures } = getUseTextures([ASSETS_HISTORY_BIG_WIN])

export default function({ id, index, isBigWin, multiplier }: {
  id: number
  index: number
  isBigWin: boolean
  multiplier: number
}) {
  const itemRef = useRef<PixiRef<typeof Container>>(null)
  const grRef = useRef<PixiRef<typeof Graphics>>(null)
  const [bigWinTexture] = useTextures()
  const rows: number = useSelector(getRows)
  const color = useMemo(() => colorRange(rows, id), [rows, id])

  useEffect(() => {
    const container = itemRef.current
    if (container) {
      container.alpha = 0
      container.y = -HISTORY_GAP
      gsap.to(container, {
        alpha: 1,
        duration: 0.4,
        ease: 'none',
        y: HISTORY_GAP * index,
      })
      return () => {
        gsap.killTweensOf(container)
      }
    }
  }, [])

  useEffect(() => {
    const container = itemRef.current
    if (container) {
      gsap.to(container, {
        alpha: index > HISTORY_ITEM_VIEW_COUNT - 1 ? 0 : 1,
        duration: 0.4,
        ease: 'none',
        y: HISTORY_GAP * index,
      })
      return () => {
        gsap.killTweensOf(container)
      }
    }
  }, [index])

  useEffect(() => {
    const gr = grRef.current
    const width = 20
    const height = 50
    if (gr) {
      gr.clear()
      gr.beginFill(0xffffff)
      gr.drawRoundedRect(-width / 2, -height / 2, width, height, 15)
      gr.endFill()
    }
  }, [])
  return (
    <Container ref={itemRef}>
      {!isBigWin ? (
        <Graphics ref={grRef} tint={COLORS[color]} scale={0.5} />
      ) : (
        <Sprite anchor={0.5} texture={bigWinTexture} scale={1} />
      )}
      <Text
        x={-13}
        text={`${multiplier.toString()}×`}
        anchor={[1, 0.5]}
        scale={0.5}
        style={TEXT_STYLE_HISTORY}
        tint={COLORS[color]}
      />
    </Container>
  )
}
