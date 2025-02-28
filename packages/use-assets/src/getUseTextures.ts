import waitUntil from 'async-wait-until'
import * as PIXI from 'pixi.js'
import { createAsset } from 'use-asset'

import { ASSETS_BASE_IMAGE_PATH } from './constants'
import PixiLoaderStatusEmitter from './PixiLoaderStatusEmitter'

type TexturesReturn = {
  useTextures: () => PIXI.Texture<PIXI.Resource>[] | Record<string, PIXI.Texture<PIXI.Resource>>
}

function getUseTextures<T>(
  assetsRecord: Record<keyof T, string>,
  path?: string,
): { useTextures: () => Record<keyof T, PIXI.Texture> }
function getUseTextures(assetsRecord: string[], path?: string): { useTextures: () => PIXI.Texture[] }

function getUseTextures<T>(assetsRecord: Record<keyof T, string> | string[], path?: string): TexturesReturn {
  const basePath = path ?? ASSETS_BASE_IMAGE_PATH

  PixiLoaderStatusEmitter.getInstance().addCounter()
  console.log('add counter')

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
      await PIXI.Assets.unload(urls)
      await PIXI.Assets.load(urls)
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log(`error load ${urls}`)
      PixiLoaderStatusEmitter.getInstance().emitError()
    }

    // console.log(`path: ${urls}`)
    const predicate = () => urls.every((path) => {
        console.log(`predicate: ${path}`)
        return PIXI.utils.TextureCache[path]
      },
    )
    await waitUntil(predicate, { timeout: 1000000 })

    PixiLoaderStatusEmitter.getInstance().delCounter()

    return Array.isArray(assets)
      ? (assets.map((path) => PIXI.Texture.from(path)) as PIXI.Texture[])
      : Object.entries<string>(assets).reduce(
        (obj, [name, path]) => ({
          ...obj,
          [name]: PIXI.Texture.from(path),
        }),
        {} as Record<keyof T, PIXI.Texture>,
      )
  })
  asset.preload()

  return { useTextures: asset.read }
}

export default getUseTextures
