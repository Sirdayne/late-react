import { setTimeout } from 'worker-timers'

import getSize from './getSize'
import renderer from './renderer'
import { SizeProps } from './types'

const onResizeArr: ((props: SizeProps) => void)[] = []

function onResizeAdd(func: (data: SizeProps) => void) {
  onResizeArr.push(func)
}

function onResizeRemove(func: (data: SizeProps) => void) {
  const index = onResizeArr.indexOf(func)
  if (onResizeArr[index] !== undefined) {
    onResizeArr.splice(index, 1)
  }
}

function onResizeUpdate() {
  const sizeProps = getSize()
  onResizeArr.forEach((onResize) => onResize(sizeProps))
}

let pendingUpdate = false
let prevHeight = 0,
  prevWidth = 0

function onResize() {
  if (pendingUpdate) {
    return
  }
  pendingUpdate = true
  //const canvas = document.querySelector('canvas') as HTMLCanvasElement
  // if (canvas) {
  //   canvas.style.opacity = "0";
  // }
  setTimeout(() => {
    pendingUpdate = false
    // const vh = window.innerHeight * 0.01
    // document.documentElement.style.setProperty('--vh', `${vh}px`)
    const canvas = document.querySelector('canvas') as HTMLCanvasElement
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (canvas && renderer.get()) {
      const gameView = document.querySelector('.game-container') as HTMLElement
      // const width = Math.floor(window.innerWidth)
      // const height = Math.floor(window.innerHeight)
      const width = Math.floor(gameView.offsetWidth)
      const height = Math.floor(gameView.offsetHeight)

      canvas.width = width * renderer.get().resolution
      canvas.height = height * renderer.get().resolution
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      renderer.get().resize(width, height)

      if (width !== prevWidth || height !== prevHeight) {
        prevWidth = width
        prevHeight = height
        onResize()
        return
      }
      onResizeUpdate()
      canvas.style.opacity = '1'
    } else {
      onResize()
    }
  }, 10)
}

if (visualViewport) {
  visualViewport.addEventListener('resize', onResize)
  visualViewport.addEventListener('orientationchange', onResize)
}

onResize()
export { onResizeAdd, onResizeRemove, onResizeUpdate }
