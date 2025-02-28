import { Sound, sound, soundAsset } from '@pixi/sound'
import waitUntil from 'async-wait-until'
import * as PIXI from 'pixi.js'
import { createAsset } from 'use-asset'

import { ASSETS_BASE_SOUNDS_PATH } from './constants'
import PixiLoaderStatusEmitter from './PixiLoaderStatusEmitter'

PIXI.extensions.add(soundAsset)
PIXI.extensions.add(soundAsset.loader)

function getUseSounds<T>(
  assetsRecord: Record<keyof T, string>,
  basePath?: string,
): { useSounds: () => Record<keyof T, Sound> }
function getUseSounds(assetsRecord: string[], basePath?: string): { useSounds: () => Sound[] }

function getUseSounds<T>(
  assetsRecord: Record<keyof T, string> | string[],
  path?: string,
): { useSounds: () => Record<keyof T, Sound> | Sound[] } {
  const basePath = path ?? ASSETS_BASE_SOUNDS_PATH

  PixiLoaderStatusEmitter.getInstance().addCounter()

  const asset = createAsset(async () => {
    const urls: string[] = []
    let assets
    if (Array.isArray(assetsRecord)) {
      assets = assetsRecord.map((fileName) => {
        const path = basePath + fileName
        urls.push(path)

        return path
      })
    } else {
      assets = Object.entries<string>(assetsRecord).reduce(
        (obj, [name, fileName]) => {
          const path = basePath + fileName
          urls.push(path)
          obj[name as keyof T] = path

          return obj
        },
        {} as Record<keyof T, string>,
      )
    }

    try {
      urls.forEach((url) => {
        PIXI.Assets.add(url, url)
      })
      await PIXI.Assets.load(urls)
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      PixiLoaderStatusEmitter.getInstance().emitError()
    }

    const predicate = () => urls.every((path) => PIXI.Assets.cache.get(path))
    await waitUntil(predicate, { timeout: 1000000 })

    PixiLoaderStatusEmitter.getInstance().delCounter()

    return Array.isArray(assets)
      ? (assets.map((path) => PIXI.Assets.get(path)) as Sound[])
      : Object.entries<string>(assets).reduce(
          (obj, [name, path]) => ({
            ...obj,
            [name]: PIXI.Assets.get(path),
          }),
          {} as Record<keyof T, Sound>,
        )
  })
  asset.preload()

  return { useSounds: asset.read }
}

let mutted = false
getUseSounds.globalMute = {
  get: () => mutted,
  set: (value: boolean) => {
    if (value) sound.muteAll()
    else sound.unmuteAll()
    mutted = value
  },
}
getUseSounds.globalVolume = {
  get: () => sound.volumeAll,
  set: (value: number) => {
    sound.volumeAll = value
  },
}

export default getUseSounds
