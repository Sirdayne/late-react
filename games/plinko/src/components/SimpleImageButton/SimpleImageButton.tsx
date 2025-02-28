import parsePoint from '@apis-games-front/parse-point'
import { _ReactPixi, Container, Sprite } from '@pixi/react'
import * as PIXI from 'pixi.js'
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { getInterfaceDisabled } from '../../state/selectors/interfaceSelectors'
import { SimpleImageButtonProps } from './types'
import { ButtonState } from './types'
// eslint-disable-next-line complexity
export default forwardRef(function(
  {
    active,
    align = 'center',
    alpha = 1,
    children,
    disableVisualChangeOnDeactivation = false,
    disableVisualChangeScale = false,
    flipTextureHorizontal = false,
    hitAreaHeight,
    hitAreaWidth,
    texture = PIXI.Texture.EMPTY,
    hoverTexture = texture,
    ignoreInterfaceDisabled = false,
    onTap,
    pivot = [texture.width / 2, texture.height / 2],
    position = [0, 0],
    scale = 1,
    textureTint = 0xffffff,
    valign = 'center',
    visible = true,
    x,
    y,
  }: SimpleImageButtonProps,
  ref: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) {
  const isMounted = useRef(true)
  useEffect(
    () => () => {
      isMounted.current = false
    },
    [],
  )
  const [state, setState] = useState(ButtonState.Idle)

  let disabled = useSelector(getInterfaceDisabled)
  if (ignoreInterfaceDisabled) {
    disabled = false
  }

  const onPointerTap = useCallback(
    (error: PIXI.FederatedPointerEvent) => {
      setState(ButtonState.Press)
      if (onTap) {
        onTap(error)
      }
    },
    [onTap],
  )

  const onPointerOver = useCallback(() => {
    setState(ButtonState.Over)
  }, [])
  const onPointerOut = useCallback(() => {
    setState(ButtonState.Idle)
  }, [])

  const getHitArea = useCallback(() => {
    const width = hitAreaWidth !== undefined ? hitAreaWidth : texture.width
    const height = hitAreaHeight !== undefined ? hitAreaHeight : texture.height

    return new PIXI.Rectangle(-width / 2, -height / 2, width, height)
  }, [hitAreaWidth, hitAreaHeight, texture])

  const contPivot: _ReactPixi.PointLike = useMemo(
    () => [
      texture.width * { center: 0, left: -0.5, right: 0.5 }[align],
      texture.height * { bottom: 0.5, center: 0, top: -0.5 }[valign],
    ],
    [align, valign, texture],
  )

  const contRef = useRef<PIXI.Container>(null)
  useEffect(() => {

    const cont = contRef.current as PIXI.Container
    if (cont !== null) {
      const s = {
        [ButtonState.Idle]: scale,
        [ButtonState.Over]: scale * (disableVisualChangeScale ? 1 : 1.1),
        [ButtonState.Press]: scale * (disableVisualChangeScale ? 1 : 0.9),
        [ButtonState.Unpress]: scale,
      }[state]
      const duration = {
        [ButtonState.Idle]: 0.1,
        [ButtonState.Over]: 0.2,
        [ButtonState.Press]: 0.1,
        [ButtonState.Unpress]: 0.3,
      }[state]
      const ease = {
        [ButtonState.Idle]: 'Circ.easeOut',
        [ButtonState.Over]: 'Circ.easeOut',
        [ButtonState.Press]: 'Back.easeOut',
        [ButtonState.Unpress]: 'Back.easeOut',
      }[state]

      try {
        gsap.to(cont, {
          duration,
          ease,
          onComplete: () => {
            if (isMounted.current) {
              if (state === ButtonState.Press) {
                setState(ButtonState.Unpress)
              } else if (state === ButtonState.Unpress) {
                setState(ButtonState.Idle)
              }
            }
          },
          pixi: { scale: s },
        })
      } catch (error) {
        throw new Error(` error:${error}`)
      }
    }

    return () => {
      if (cont !== null) {
        gsap.killTweensOf(cont)
      }
    }
  }, [state, scale, disableVisualChangeScale])

  useEffect(() => {
    try {
      const cont = contRef.current as PIXI.Container
      cont.alpha = disableVisualChangeOnDeactivation ? 1 : active ? 1 : 0.5
    } catch (error) {
      throw new Error(` error:${error}`)
    }
  }, [active, disableVisualChangeOnDeactivation])

  const [posX, posY] = parsePoint(position)

  return (
    <Container
      x={x !== undefined ? x : posX}
      y={y !== undefined ? y : posY}
      pivot={contPivot}
      visible={visible}
      alpha={disableVisualChangeOnDeactivation ? alpha : active ? alpha : 0.3}
    >
      <Container
        ref={contRef}
        interactive={active && !disabled}
        cursor={active ? 'pointer' : 'default'}
        pointerover={onPointerOver}
        pointerout={onPointerOut}
        pointertap={onPointerTap}
        hitArea={getHitArea()}
      >
        <Container ref={ref}>
          <Sprite
            scale={[flipTextureHorizontal ? -1 : 1, 1]}
            pivot={pivot}
            texture={ButtonState.Over === state ? hoverTexture : texture}
            tint={textureTint}
          ></Sprite>
          {children}
        </Container>
      </Container>
    </Container>
  )
})
