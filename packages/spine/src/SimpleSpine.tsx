import { applyDefaultProps, PixiComponent } from '@pixi/react'
import { Spine } from 'pixi-spine'

import { SimpleSpineProps } from './types'

export default PixiComponent<SimpleSpineProps, Spine>('SimpleSpine', {
  applyProps: (instance, oldProps, newProps) => {
    applyDefaultProps(instance, oldProps, newProps)
  },
  create: (props) => {
    const instance = new Spine(props.spineData)
    return instance
  },
  willUnmount: (instance) => {
    instance.state.clearListeners()
    instance.destroy()
  },
})
