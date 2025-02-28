import { _ReactPixi } from '@pixi/react'
import { ISkeletonData } from '@pixi-spine/base'

/*export type AnimationProp = {
  animationName: string
  delay?: number
  loop: boolean
  trackIndex: number
}*/
export type SimpleSpineProps = _ReactPixi.IContainer & {
  spineData: ISkeletonData
}
