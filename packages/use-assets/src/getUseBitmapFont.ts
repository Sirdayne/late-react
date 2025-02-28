import waitUntil from 'async-wait-until'
import * as PIXI from 'pixi.js'
import { createAsset } from 'use-asset'

import { ASSETS_BASE_BITMAP_FONT_PATH } from './constants'
import PixiLoaderStatusEmitter from './PixiLoaderStatusEmitter'

type FontReturn = {
  asset: {
    clear: () => void
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    peek: () => Record<string, string> | void
    preload: () => void
    read: () => Record<string, string>
  }
  useBitmapFonts: () => Record<string, string>
}
export default function getUseBitmapFont<T>(assetsRecord: Record<keyof T, string>, path?: string): FontReturn {
  const basePath = path ?? ASSETS_BASE_BITMAP_FONT_PATH

  PixiLoaderStatusEmitter.getInstance().addCounter()

  const asset = createAsset(async () => {
    const urls: string[] = []

    const assets = Object.entries<string>(assetsRecord).reduce(
      (obj, [name, fileName]) => {
        const path = basePath + fileName

        urls.push(path)
        obj[name as keyof T] = path

        return obj
      },
      {} as Record<keyof T, string>,
    )

    try {
      await PIXI.Assets.load(urls)
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      PixiLoaderStatusEmitter.getInstance().emitError()
    }

    const predicate = () => urls.every((path) => PIXI.Assets.cache.get(path))
    await waitUntil(predicate, { timeout: 1000000 })

    PixiLoaderStatusEmitter.getInstance().delCounter()

    return Object.entries<string>(assets).reduce(
      (obj, [name, path]) => {
        const resource = PIXI.Assets.cache.get(path)

        return {
          ...obj,
          [name]: resource.font,
        }
      },
      {} as Record<keyof T, string>,
    )
  })
  asset.preload()

  return { asset, useBitmapFonts: asset.read }
}
