export type SmartContainerData = {
  align?: 'center' | 'left' | 'right'
  correctionOffsetX?: number
  correctionOffsetY?: number
  correctionScaleX?: number
  correctionScaleY?: number
  fitCover?: boolean
  height?: number
  stretchHeight?: boolean
  stretchWidth?: boolean
  valign?: 'bottom' | 'center' | 'top'
  viewportHeight?: number
  viewportWidth?: number
  width?: number
}

export type SmartContainerDataRequired = Required<SmartContainerData>

export type SmartContainerUpdateData = (
  w: number,
  h: number,
  aspect: number,
  portraitDataRequired: SmartContainerDataRequired,
  landscapeDataRequired: SmartContainerDataRequired,
) => void

export type SmartContainerProps = {
  // eslint-disable-next-line
  children?: any
  landscapeData?: SmartContainerData
  portraitData?: SmartContainerData
  updateData?: SmartContainerUpdateData
  visible?: boolean
}
