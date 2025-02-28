import { SizeProps } from './types'

export default function getSize(): SizeProps {
  const gameView = document.querySelector('.game-container') as HTMLElement
  const width = gameView !== null ? gameView.offsetWidth : window.innerWidth
  const height = gameView !== null ? gameView.offsetHeight : window.innerHeight

  const aspect = width / height

  return {
    aspect,
    height,
    orientation: aspect > 1 ? 'landscape' : 'portrait',
    width,
  }
}
