import { SimpleSpine } from '@apis-games-front/spine'
import { getUseBitmapFont, getUseSounds, getUseSpine } from '@apis-games-front/use-assets'
import { Spine } from 'pixi-spine'
import * as PIXI from 'pixi.js'
import { setTimeout } from 'worker-timers'
import { memo, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { completeBigWin, setBigWinStartAnimation } from '../../state/slices/playgroundSlice'
import { useApp } from '@pixi/react'
import { getBigWinValue } from '../../state/selectors/playgroundSelector'
import { SOUNDS } from '../../constants'
import { getSoundMute } from '../../state/selectors/interfaceSelectors'

const { useSpine } = getUseSpine({
  win: 'plinko_win.json',
})
const { useSounds } = getUseSounds({
  boomSound: SOUNDS.soundBWBoom,
  earthquakeSound: SOUNDS.soundBWEarthquake,
  flySound: SOUNDS.soundBWFly,
  textSound: SOUNDS.soundBWText,
})
const { useBitmapFonts } = getUseBitmapFont({
  fontBig: 'GR_BIG2.fnt',
})
export default memo(function({ active }: { active: boolean }) {
  const { win } = useSpine()
  const { earthquakeSound, flySound, boomSound, textSound } = useSounds()
  const { fontBig } = useBitmapFonts()
  const { renderer } = useApp()
  const value = useSelector(getBigWinValue)
  const muteSound: boolean = useSelector(getSoundMute)

  const dispatch = useDispatch()
  // const textRef = useRef<PIXI.BitmapText>(null)
  const refSpine = useRef<Spine>(null)
  const complete = useCallback(() => {
    dispatch(completeBigWin())
    dispatch(setBigWinStartAnimation(false))
  }, [dispatch])

  useEffect(() => {
    const animation = refSpine.current
    if (animation !== null && active) {
      animation.state.timeScale = 0.75
      animation.state.setAnimation(0, 'Win', false)
      // animation.hackTextureBySlotName('Text', PIXI.Texture.WHITE, new PIXI.Rectangle(0, 0, 300, 300));

      const tf = new PIXI.BitmapText(value, { fontName: fontBig, fontSize: 55 })
      const rect = new PIXI.Rectangle(0, 0, tf.width, tf.height * 1)
      const texture: PIXI.Texture = renderer.generateTexture(tf, {
        region: rect,
        resolution: 2.5,
        scaleMode: PIXI.SCALE_MODES.LINEAR,
      })
      animation.hackTextureBySlotName('Multi', texture, rect)
      const tf2 = new PIXI.BitmapText('EPIC WIN', { fontName: fontBig, fontSize: 22 })
      const rect2 = new PIXI.Rectangle(0, 0, tf2.width, tf2.height * 1)
      const texture2: PIXI.Texture = renderer.generateTexture(tf2, {
        region: rect2,
        resolution: 2.5,
        scaleMode: PIXI.SCALE_MODES.LINEAR,
      })
      animation.hackTextureBySlotName('Text', texture2, rect2)
      // animation.skeleton.findSlot('Multi').
      setTimeout(() => {
        if (!muteSound) {
          flySound.play()
        }
      }, 500)
      setTimeout(() => {
        if (!muteSound) {
          boomSound.play()
        }
      }, 1200)
      setTimeout(() => {
        if (!muteSound) {
          textSound.play()
        }
      }, 1700)
      if (!muteSound) {
        earthquakeSound.play()
      }
      setTimeout(complete, 4000)
    }
  }, [active, value, earthquakeSound, boomSound, flySound, textSound, muteSound])

  return (<SimpleSpine visible={active} ref={refSpine} anchor={0.5} spineData={win} y={137} x={-25} scale={1.245} />)
})
