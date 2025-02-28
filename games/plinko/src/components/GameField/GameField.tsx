import { getUseSounds, getUseSpritesheets } from '@apis-games-front/use-assets'
import useResize from '@apis-games-front/use-resize'
import { BitmapText, Container, ParticleContainer, PixiRef, Sprite } from '@pixi/react'
import * as PIXI from 'pixi.js'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SOUNDS } from '../../constants'
import { gameStateIsBet } from '../../state/selectors/gameSelectors'
import { getIsMobile, getMusicMute, getSoundMute } from '../../state/selectors/interfaceSelectors'
import { getBalls, getBigWinActive, getPayouts, getRows } from '../../state/selectors/playgroundSelector'
import { setBigWinStartAnimation } from '../../state/slices/playgroundSlice'
import { Ball } from '../../state/slices/types'
import BigWin from '../BigWin'
import BallView from './BallView'
import { ASSETS_IMAGE_PINS, PIN_GAP_X, PIN_GAP_Y, PIN_START } from './constants'
import HistoryView from './HistoryView'
import SensorView, { SensorGlow } from './SensorView'

const pinsCount = (rows: number): number => ((rows + 2) * (rows + 2 + 1)) / 2 - 3
const { useSpritesheets } = getUseSpritesheets(`field-0.json`)

type PinsType = null | PIXI.Container
const { useSounds } = getUseSounds({
  ballBWSound: SOUNDS.soundBWBall,
  ballFallBWSound: SOUNDS.soundBWBallFall,
  betSound: SOUNDS.soundBet,
  lightningBWSound: SOUNDS.soundBWLightning,
  mainSound: SOUNDS.soundMain,
  pinSound: SOUNDS.soundPin,

  pocketSound: SOUNDS.soundPocket,
  pocketSoundH: SOUNDS.soundPocketH,
  pocketSoundM: SOUNDS.soundPocketM,
  thundeBWSound: SOUNDS.soundBWThunder,
})
export default memo(function() {
  const { getTexture } = useSpritesheets()
  const [pinGlowTexture, pinTexture] = useMemo(
    () => [getTexture(ASSETS_IMAGE_PINS[0]), getTexture(ASSETS_IMAGE_PINS[1])],
    [getTexture],
  )
  const {
    ballBWSound,
    ballFallBWSound,
    betSound,
    lightningBWSound,
    mainSound,
    pinSound,
    pocketSound,
    pocketSoundH,
    pocketSoundM,
    thundeBWSound, // lightningBWSound, thundeBWSound,
  } = useSounds()
  const { aspect, height, width } = useResize()
  // const showBigWin = false
  const pinsRef = useRef<PinsType[]>([])
  const sensorRef = useRef<SensorGlow[]>([])
  const [showBigWin, setShowBigWin] = useState(false)
  const ballsData: Ball[] = useSelector(getBalls)
  const payouts: number[] = useSelector(getPayouts)
  const isBetStart = useSelector(gameStateIsBet)
  const rows: number = useSelector(getRows)
  const isMobile: boolean = useSelector(getIsMobile) || PIXI.utils.isMobile.any
  const isBigWinActive = useSelector(getBigWinActive)
  const dispatch = useDispatch()
  const muteMusic: boolean = useSelector(getMusicMute)
  const muteSound: boolean = useSelector(getSoundMute)

  useEffect(() => {
    if (isBetStart && !muteSound) {
      betSound.play()
    }
  }, [isBetStart, betSound, muteSound])

  useEffect(() => {
    if (!isBigWinActive) {
      setShowBigWin(false)
    } else {
      //earthquakeBWSound, lightningBWSound, thundeBWSound
      if (!muteSound) {
        thundeBWSound.play()
        lightningBWSound.play()
      }
    }
  }, [isBigWinActive, lightningBWSound, thundeBWSound, muteSound])

  useEffect(() => {
    mainSound.play({ loop: true, volume: 0.2 })
    return () => {
      mainSound.stop()
    }
  }, [mainSound])

  useEffect(() => {
    if (!muteMusic) {
      if (!mainSound.isPlaying) {
        mainSound.resume()
      }
    } else {
      mainSound.pause()
    }
  }, [mainSound, muteMusic])

  const [pins, pinsGlow, sensors] = useMemo(() => {
    const arr = [...Array(pinsCount(rows) + rows + 1).keys()]
    let x = 0
    let y = 0
    let col = 0
    let limit = PIN_START
    let shift = 0
    const pinsData: JSX.Element[] = []
    const pinsGlow: JSX.Element[] = []
    const sensorsData: number[] = []
    let sensorsPositionY = 0

    pinTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR
    // pinTexture.baseTexture.resolution = 0.5

    arr.forEach((value) => {
      if (value < shift + limit) {
        x = (value - shift) * PIN_GAP_X
      } else {
        x = 0
        shift = value
        limit++
        col++
      }
      x -= (limit * PIN_GAP_X) / 2
      y = col * PIN_GAP_Y
      const isSensor = arr.length - value <= rows + 1
      if (!isSensor) {
        pinsGlow.push(
          <Sprite
            alpha={0}
            anchor={[0.5, 0.5]}
            key={value}
            ref={(el) => (pinsRef.current[value] = el)}
            texture={pinGlowTexture}
            visible={false}
            x={x}
            y={y}
          />,
        )
        pinsData.push(
          <Sprite
            anchor={0.5}
            key={value}
            alpha={showBigWin && value < 52 ? 0 : 1}
            texture={pinTexture}
            scale={0.125}
            x={x}
            y={y}
          />,
        )
      } else {
        sensorsData.push(x + 36)
        if (sensorsPositionY === 0) sensorsPositionY = y - PIN_GAP_Y * 0.3
      }
    })
    const sensors = sensorsData.map((value, index) => {
      return (
        <SensorView
          key={index}
          ref={(el: SensorGlow) => (sensorRef.current[index] = el)}
          y={sensorsPositionY}
          text={`${payouts[index]}${payouts[index] <= 999 ? '×' : ' '}`}
          x={value}
          visible={!showBigWin}
          index={index}
          rows={rows}
        />
      )
    })
    return [pinsData, pinsGlow, sensors]
  }, [rows, payouts, pinTexture, pinGlowTexture, showBigWin])

  const onCollision = useCallback(
    (id: string, isBigWin: boolean) => {
      const collision = id.split('_')
      if (collision[0] === 'sensor') {
        const sensor = sensorRef.current[parseInt(collision[1])]
        if (sensor !== null) {
          if (!muteSound) {
            const sensorIndex = parseInt(collision[1])
            // eslint-disable-next-line max-depth
            if (isBigWin) ballFallBWSound.play()
            else if (payouts[sensorIndex] === Math.max(...payouts)) {
              pocketSoundH.play()
            } else if (payouts[sensorIndex] === Math.min(...payouts)) {
              pocketSound.play()
            } else {
              pocketSoundM.play()
            }
          }
          sensor.active()
        }
        if (isBigWin) {
          setShowBigWin(true)
          //setBigWinStartAnimation
          dispatch(setBigWinStartAnimation(true))
        }
      }
      if (collision[0] === 'pin') {
        const pinIndex = parseInt(collision[1])
        const pin = pinsRef.current[pinIndex]
        if (pin !== undefined && pin !== null) {
          if (!muteSound) {
            if (isBigWin) ballBWSound.play()
            else pinSound.play()
          }
          pin.alpha = 1
          pin.scale.set(0.1)
          gsap.to(pin.scale, {
            duration: 0.3,
            ease: 'none',
            x: 0.75,
            y: 0.75,
          })
          gsap.to(pin, {
            alpha: 0,
            delay: 0.2,
            duration: 0.2,
            ease: 'none',
          })
        }
      }
    },
    [
      dispatch,
      rows,
      payouts,
      pinsRef.current,
      pinSound,
      pocketSound,
      ballBWSound,
      ballFallBWSound,
      pocketSoundH,
      pocketSoundM,
      muteSound,
      sensorRef.current,
    ],
  )

  const ballsView = useMemo(
    () =>
      ballsData.map((ball) => (
        <BallView
          key={ball.id}
          pathsData={ball.pathData}
          id={ball.id}
          bigWinMultiplier={ball.bigWinMultiplier}
          isBigWin={ball.isBigWin}
          multiplier={ball.multiplier}
          onCollision={onCollision}
        />
      )),
    [rows, ballsData, onCollision],
  )
  const scaleOldRef = useRef<number>(1)
  const scale = useMemo(() => {
    let sc = scaleOldRef.current
    const WIDTH = rows * 37 + (isMobile ? 100 : 50)
    {
      // console.log(` w: ${width} h: ${height}   WIDTH:${WIDTH} `)
      if (width > WIDTH && height > WIDTH) {
        sc = 1
      } else if (width < height && width < WIDTH) {
        sc = width / WIDTH
      } else {
        sc = height / WIDTH
      }
    }
    scaleOldRef.current = sc
    // console.log(`sc: ${sc}`)
    return sc
    /*if (isMobile) {
      /!* if (rows === 8) return 0.78
       if (rows === 10) return 0.73
       if (rows === 12) return 0.627
       if (rows === 14) return 0.565
       if (rows === 16) return 0.5
       else*!/
      return gsap.utils.mapRange(8, 16, 0.9, 0.53, rows) * Math.min(1, aspect)
      // return gsap.utils.mapRange(8, 16, 0.78, 0.5, rows) * Math.min(1, aspect)
    } else {
      return gsap.utils.mapRange(8, 16, isMobile ? 0.78 : 1, isMobile ? 0.5 : 0.8, rows) * Math.min(1, aspect)
    }*/
  }, [rows, isMobile, width, height])
  const gapTop = useMemo(() => height / 2 - (rows * PIN_GAP_Y * scale) / 2, [rows, scale, height, isMobile])
  return (
    <>
      <Container scale={scale} x={width / 2 + (isMobile ? 18 : 20) * scale} y={gapTop}>
        {sensors}
        <ParticleContainer properties={{ alpha: true, rotation: true, scale: true, uvs: true }}>
          {pinsGlow}
          {pins}
          {ballsView}
        </ParticleContainer>
        <BigWin active={showBigWin} />
        {/*<BitmapText text={'12EPIC WIN'}       style={{ fontName: font, fontSize: fontSize }} />*/}
      </Container>
      <HistoryView visible={!showBigWin} />
    </>
  )
})
