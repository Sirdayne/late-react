import useResize from '@apis-games-front/use-resize'
import { Container } from '@pixi/react'
import * as PIXI from 'pixi.js'
import React, { useLayoutEffect, useMemo, useRef } from 'react'

import { DEFAULT_SMART_CONTAINER_DATA, VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from './constants'
import { SmartContainerData, SmartContainerDataRequired, SmartContainerProps } from './types'
import { shallowEqual } from './utils'

export default function ({ children, landscapeData, portraitData, updateData, visible = true }: SmartContainerProps) {
  const contRef = useRef<PIXI.Container>(null)

  const { aspect, height: resizeHeight, width: resizeWidth } = useResize()

  const portraitDataRequiredRef = useRef(portraitData || ({} as SmartContainerData))
  const portraitDataRequired = useMemo(() => {
    const portraitDataRequired = {
      ...DEFAULT_SMART_CONTAINER_DATA,
      ...portraitData,
    } as SmartContainerDataRequired
    if (!shallowEqual(portraitDataRequiredRef.current, portraitDataRequired)) {
      portraitDataRequiredRef.current = portraitDataRequired
    }

    return portraitDataRequiredRef.current as Required<SmartContainerData>
  }, [portraitData])

  const landscapeDataRequiredRef = useRef(landscapeData || ({} as SmartContainerData))
  const landscapeDataRequired = useMemo(() => {
    const landscapeDataRequired = {
      ...DEFAULT_SMART_CONTAINER_DATA,
      ...(landscapeData || portraitDataRequiredRef.current),
    } as SmartContainerDataRequired
    if (!shallowEqual(landscapeDataRequiredRef.current, landscapeDataRequired)) {
      landscapeDataRequiredRef.current = landscapeDataRequired
    }

    return landscapeDataRequiredRef.current as Required<SmartContainerData>
  }, [landscapeData])

  // eslint-disable-next-line complexity
  useLayoutEffect(() => {
    const cont = contRef.current as PIXI.Container

    if (updateData) {
      updateData(resizeWidth, resizeHeight, aspect, portraitDataRequired, landscapeDataRequired)
    }

    const {
      align,
      correctionOffsetX,
      correctionOffsetY,
      correctionScaleX,
      correctionScaleY,
      fitCover,
      stretchHeight,
      stretchWidth,
      valign,
      viewportHeight,
      viewportWidth,
    } = resizeHeight > resizeWidth ? portraitDataRequired : landscapeDataRequired

    const minOrMax = fitCover ? Math.max : Math.min
    const scale = minOrMax(resizeWidth / VIEWPORT_WIDTH, resizeHeight / VIEWPORT_HEIGHT)
    let { height, width } = resizeHeight > resizeWidth ? portraitDataRequired : landscapeDataRequired
    let scaleX = scale
    let scaleY = scale
    if (viewportWidth || viewportHeight) {
      scaleX = scaleY = minOrMax(
        resizeWidth / (viewportWidth || VIEWPORT_WIDTH),
        resizeHeight / (viewportHeight || VIEWPORT_HEIGHT),
      )
    }
    if (stretchWidth) {
      scaleX = resizeWidth / width
      width = resizeWidth / scaleX
    }
    if (stretchHeight) {
      scaleY = resizeHeight / height
      height = resizeHeight / scaleY
    }
    scaleX *= correctionScaleX
    scaleY *= correctionScaleY
    cont.scale.set(scaleX, scaleY)
    cont.x =
      (align === 'right' ? resizeWidth - width * scaleX : align === 'center' ? (resizeWidth - width * scaleX) / 2 : 0) +
      correctionOffsetX * scaleX
    cont.y =
      (valign === 'bottom'
        ? resizeHeight - height * scaleY
        : valign === 'center'
          ? (resizeHeight - height * scaleY) / 2
          : 0) +
      correctionOffsetY * scaleY
  }, [resizeWidth, resizeHeight, aspect, portraitDataRequired, landscapeDataRequired, updateData])

  return (
    <Container ref={contRef} visible={visible}>
      {children}
    </Container>
  )
}
