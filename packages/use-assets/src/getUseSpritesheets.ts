import waitUntil from 'async-wait-until'
import * as PIXI from 'pixi.js'
import { createAsset } from 'use-asset'

import { ASSETS_BASE_SPRITESHEET_PATH } from './constants'
import getFrames from './getFrames'
import PixiLoaderStatusEmitter from './PixiLoaderStatusEmitter'

type SpritesheetsReturn = {
  useSpritesheets: () => {
    clear: () => void
    getFrames: (seqPattern: string, addEmptyFirst?: boolean, addEmptyLast?: boolean) => PIXI.Texture[]
    getTexture: (name: string) => PIXI.Texture
    getTexturesArr: (names: string[]) => PIXI.Texture[]
    getTexturesDict: <T>(names: Record<keyof T, string>) => Record<keyof T, PIXI.Texture>
  }
}
export default function getUseSpritesheets(fileNames: string | string[], path?: string): SpritesheetsReturn {
  const fileNamesArr = Array.isArray(fileNames) ? fileNames : [fileNames]
  const basePath = path ?? ASSETS_BASE_SPRITESHEET_PATH

  PixiLoaderStatusEmitter.getInstance().addCounter()
  const asset = createAsset(async () => {
    const urls: string[] = []
    fileNamesArr.forEach((fileName) => {
      const path = basePath + fileName
      urls.push(path)

      return path
    })
    try {
      await PIXI.Assets.unload(urls)
      await PIXI.Assets.load(urls)
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      PixiLoaderStatusEmitter.getInstance().emitError()
    }
    const predicate = () => urls.every((path) => PIXI.Assets.cache.get(path))
    await waitUntil(predicate, { timeout: 1000000 })

    PixiLoaderStatusEmitter.getInstance().delCounter()

    const DICT: Record<string, PIXI.Texture | PIXI.Texture[] | Record<string, PIXI.Texture>> = {}

    return {
      clear: () => {
        // eslint-disable-next-line
        // @ts-ignore
        for (const key in DICT) {
          if (DICT[key] != undefined) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete DICT[key]
          }
        }
      },

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
        К примеру: у нас есть в спрайтшите секвенция виде
        * animation/frame_(номер кадра от 001 до 100(возможно с пропущенными кардрами))
        тогда seqPattern будет вида 'animation/frame_'
        */
      getFrames: (seqPattern: string, addEmptyFirst = false, addEmptyLast = false) => {
        const key = `${seqPattern}_${addEmptyFirst}_${addEmptyLast}`
        if (DICT[key] === undefined) {
          DICT[key] = [
            addEmptyFirst && PIXI.Texture.EMPTY,
            ...getFrames(seqPattern),
            addEmptyLast && PIXI.Texture.EMPTY,
          ].filter(Boolean) as PIXI.Texture[]
        }

        return DICT[key] as PIXI.Texture[]
      },

      getTexture: (name: string) => {
        const key = name
        if (DICT[key] === undefined) {
          DICT[key] = PIXI.Texture.from(key)
        }

        return DICT[key] as PIXI.Texture
      },

      getTexturesArr: (names: string[]) => {
        const key = JSON.stringify(names)
        if (DICT[key] === undefined) {
          DICT[key] = names.map((name) => PIXI.Texture.from(name))
        }

        return DICT[key] as PIXI.Texture[]
      },

      getTexturesDict: <T>(names: Record<keyof T, string>) => {
        const key = JSON.stringify(names)
        if (DICT[key] === undefined) {
          DICT[key] = Object.entries<string>(names).reduce(
            (obj, [key, name]) => {
              obj[key as keyof T] = PIXI.Texture.from(name)

              return obj
            },
            {} as Record<keyof T, PIXI.Texture>,
          )
        }

        return DICT[key] as Record<keyof T, PIXI.Texture>
      },
    }
  })
  asset.preload()

  return { useSpritesheets: asset.read }
}
