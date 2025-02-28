import { _ReactPixi } from '@pixi/react'
import * as PIXI from 'pixi.js'

export enum ButtonState {
  Idle,
  Over,
  Press,
  Unpress,
}

export type SimpleImageButtonProps = {
  active: boolean
  align?: 'center' | 'left' | 'right'
  alpha?: number
  children?: any
  disableVisualChangeOnDeactivation?: boolean
  disableVisualChangeScale?: boolean
  flipTextureHorizontal?: boolean
  hitAreaHeight?: number
  hitAreaWidth?: number
  hoverTexture?: PIXI.Texture
  ignoreInterfaceDisabled?: boolean
  onTap?: (e?: PIXI.FederatedPointerEvent) => void
  pivot?: _ReactPixi.PointLike
  position?: _ReactPixi.PointLike
  scale?: number
  texture?: PIXI.Texture
  textureTint?: number
  valign?: 'bottom' | 'center' | 'top'
  visible?: boolean
  x?: number
  y?: number
}
