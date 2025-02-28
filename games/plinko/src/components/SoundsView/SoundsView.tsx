import { _ReactPixi, Container, Sprite, Text } from '@pixi/react'
import * as PIXI from 'pixi.js'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { ASSETS_IMAGE_SOUNDS, TEXT_STYLE_SOUNDS } from './constants'
import PointLike = _ReactPixi.PointLike
import { getUseTextures, useL10n } from '@apis-games-front/use-assets'
import { useDispatch, useSelector } from 'react-redux'

import { getMusicMute, getSoundMute } from '../../state/selectors/interfaceSelectors'
import { setMuteMusic, setMuteSound, setUnMuteMusic, setUnMuteSound } from '../../state/slices/interfaceSlice'
import SimpleImageButton from '../SimpleImageButton'
import { sound } from '@pixi/sound'

const { useTextures } = getUseTextures(ASSETS_IMAGE_SOUNDS)

export default function() {
  const [
    panelTexture,
    btnOnTexture,
    btnOffTexture,
    btnHoverTexture,
    soundIconMainOnTexture,
    soundIconMainOffTexture,

    musicIconOnTexture,
    musicIconOffTexture,
    soundIconOnTexture,
    soundIconOffTexture,
  ] = useTextures()
  const dispatch = useDispatch()

  const [activePanel, setActivePanel] = useState(false)
  const muteMusic: boolean = useSelector(getMusicMute)
  const muteSound: boolean = useSelector(getSoundMute)
  const contPoint = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const position: PointLike = useMemo(() => {
    return [40, 40]
  }, [])

  const hidePanel = useCallback(
    (event: MouseEvent | PIXI.FederatedPointerEvent | PointerEvent) => {
      if (contPoint.current !== undefined) {
        const deltaX = Math.abs(contPoint.current.x - event.clientX)
        const deltaY = Math.abs(contPoint.current.y - event.clientY)
        if (deltaX > 15 || deltaY > 130 || (deltaX < 5 && deltaY > 130)) {
          setActivePanel(false)
          window.removeEventListener('click', hidePanel)
          window.removeEventListener('pointerdown', hidePanel)
        }
      }
    },
    [setActivePanel, position],
  )
  const resumePause = useCallback(() => {
    sound.unmuteAll()
  }, [])

  const startPause = useCallback(() => {
    sound.muteAll()
  }, [])
  const visibilityChange = useCallback(() => {
    if (document.hidden) {
      startPause()
    } else {
      resumePause()
    }
  }, [resumePause, resumePause])

  useEffect(() => {
    if (PIXI.utils.isMobile.apple.device) {
      window.addEventListener('focus', resumePause)
      window.addEventListener('blur', startPause)
    }
    window.addEventListener('visibilitychange', visibilityChange)
    return () => {
      window.removeEventListener('visibilitychange', visibilityChange)
      window.removeEventListener('focus', resumePause)
      window.removeEventListener('blur', startPause)
    }
  }, [])

  useEffect(() => {
    if (activePanel) {
      window.addEventListener('click', hidePanel)
      window.addEventListener('pointerdown', hidePanel)
    } else {
      window.removeEventListener('pointerdown', hidePanel)
      window.removeEventListener('click', hidePanel)
    }
    return () => {
      window.removeEventListener('click', hidePanel)
      window.removeEventListener('pointerdown', hidePanel)
    }
  }, [activePanel])

  const onTap = useCallback(
    (event: null | PIXI.FederatedPointerEvent | undefined) => {
      if (event !== null && event !== undefined) {
        contPoint.current.x = event.clientX
        contPoint.current.y = event.clientY
      }
      setActivePanel((value) => !value)
    },
    [setActivePanel],
  )

  const onTapMusic = useCallback(() => {
    dispatch(!muteMusic ? setMuteMusic() : setUnMuteMusic())
  }, [dispatch, muteMusic])

  const onTapSound = useCallback(() => {
    dispatch(!muteSound ? setMuteSound() : setUnMuteSound())
  }, [dispatch, muteSound])
  const TEXT_MUSIC = useL10n(`SoundPanel.MUSIC`)
  const TEXT_SOUND = useL10n(`SoundPanel.SOUND`)

  return (
    <Container position={position} scale={1}>
      <SimpleImageButton
        active
        disableVisualChangeOnDeactivation
        disableVisualChangeScale
        hoverTexture={activePanel ? btnHoverTexture : btnOffTexture}
        texture={activePanel ? btnHoverTexture : muteMusic && !muteSound ? btnOffTexture : btnOnTexture}
        scale={0.5}
        onTap={onTap}
      >
        <Sprite texture={muteMusic && muteSound ? soundIconMainOffTexture : soundIconMainOnTexture} anchor={0.5} />
      </SimpleImageButton>
      <Container visible={activePanel} position={[0, 85]} scale={0.5}>
        <Sprite texture={panelTexture} anchor={0.5} />
        <SimpleImageButton
          onTap={onTapMusic}
          hitAreaWidth={150}
          hitAreaHeight={90}
          active
          texture={!muteMusic ? musicIconOnTexture : musicIconOffTexture}
          disableVisualChangeScale
          position={[0, -45]}
        />
        <Text y={-10} text={TEXT_MUSIC} anchor={0.5} scale={0.4} style={TEXT_STYLE_SOUNDS} />
        <SimpleImageButton
          hitAreaWidth={150}
          hitAreaHeight={90}
          onTap={onTapSound}
          active
          texture={!muteSound ? soundIconOnTexture : soundIconOffTexture}
          disableVisualChangeScale
          position={[0, 45]}
        />
        <Text y={80} text={TEXT_SOUND} anchor={0.5} scale={0.4} style={TEXT_STYLE_SOUNDS} />
      </Container>
    </Container>
  )
}
