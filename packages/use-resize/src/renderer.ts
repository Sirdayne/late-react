import * as PIXI from 'pixi.js'

let renderer: PIXI.IRenderer
export default {
  get: (): PIXI.IRenderer => {
    return renderer
  },
  set: (value: PIXI.IRenderer): void => {
    renderer = value
  },
}
