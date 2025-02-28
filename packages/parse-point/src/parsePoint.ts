import { _ReactPixi } from '@pixi/react'

export default function parsePoint(value: _ReactPixi.PointLike): [number, number] {
  let arr: number[] = [0, 0]
  if (typeof value === 'string') {
    arr = (value as string).split(',').slice(0, 2).map(Number)
  } else if (typeof value === 'number') {
    arr = [value, value]
  } else if (Array.isArray(value)) {
    arr = value.slice()
  } else if (typeof value.x !== 'undefined' && typeof value.y !== 'undefined') {
    arr = [value.x, value.y]
  }

  return arr.map(Number) as [number, number]
}
