import './pixiImport'
import 'pixi-spine'

import { ISkeletonData } from '@pixi-spine/base'
import waitUntil from 'async-wait-until'
import * as PIXI from 'pixi.js'
import { createAsset } from 'use-asset'

import { ASSETS_BASE_SPINE_PATH } from './constants'
import PixiLoaderStatusEmitter from './PixiLoaderStatusEmitter'

export default function getUseSpine<T>(assetsRecord: Record<keyof T, string>, path?: string) {
  const basePath = path ?? ASSETS_BASE_SPINE_PATH

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
      await PIXI.Assets.unload(urls)
      await PIXI.Assets.load(urls)
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      PixiLoaderStatusEmitter.getInstance().emitError()
    }

    const predicate = () =>
      urls.every((path) => {
        const res = PIXI.Assets.cache.get(path)
        // eslint-disable-next-line
        return res && res.spineData && res.spineAtlas
      })
    await waitUntil(predicate, { timeout: 1000000 })

    PixiLoaderStatusEmitter.getInstance().delCounter()

    return Object.entries<string>(assets).reduce(
      (obj, [name, path]) => {
        const res = PIXI.Assets.cache.get(path)

        return {
          ...obj,
          [name]: res.spineData,
        }
      },
      {} as Record<keyof T, ISkeletonData>,
    )
  })
  asset.preload()

  return { asset, useSpine: asset.read }
}
