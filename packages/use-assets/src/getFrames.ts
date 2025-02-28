import { Texture, utils } from 'pixi.js'

//кэш анимаций
export const animations: Record<string, Texture[]> = {}

function extractValue(data: string, key: string) {
  const rx = new RegExp(key + ':([0-9]+),?')
  const values = rx.exec(data)

  return (values && Number(values[1])) || 0
}

/*
**seqPattern** это паттерн для составления анимации из секвенции кадров
```js
{seqPattern: 'win_frame_{start:1, end:54, maxMissing:1}'}
```
Вместо скобок и их содержимого будет подставлено число\
**start** - цифра с какой начать искать фреймы,\
**end** - на какой закончить,\
**maxMissing** - максимальное кол-во отсутствующих в секвенции кадров\
Скобочки и их содержимое можно опустить, тогда поиск будет происходить от 0 до 3х пропущенных кадров
*/
export default function getFrames(seqPattern: string): Texture[] {
  const sPattern = seqPattern.replace(/\s/g, '')
  const animationName = sPattern.replace(/\{.*\}/, '')

  const start = extractValue(sPattern, 'start')
  const end = extractValue(sPattern, 'end')
  const maxMissing = extractValue(sPattern, 'maxMissing') || 3

  const frames = animations[animationName] !== undefined ? animations[animationName] : []
  if (!frames.length) {
    let index = start
    let missingCounter = -1
    while (index <= end || missingCounter < maxMissing) {
      let psi
      let iota = 0
      while (!psi && iota < 4) {
        iota++
        const num = Array(iota).join('0') + index
        const texture = sPattern.replace(/(\{.*\}|$)/, num)
        psi = utils.TextureCache[texture]
      }
      if (psi) {
        frames.push(psi)
        missingCounter = -1
      } else {
        missingCounter++
      }
      index++
    }
    animations[animationName] = frames
  }

  return frames
}
