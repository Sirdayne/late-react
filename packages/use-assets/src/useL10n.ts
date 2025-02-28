import { useCallback, useMemo, useRef } from 'react'
import { createAsset } from 'use-asset'

import { ASSETS_BASE_L10N_PATH } from './constants'
import PixiLoaderStatusEmitter from './PixiLoaderStatusEmitter'

const params = new URLSearchParams(window.location.search)

let locale =
  params.get('lang') != null
    ? (params.get('lang') as string)
    : navigator.languages !== undefined
      ? navigator.languages[0]
      : navigator.language

locale = locale.split(/-|_/)[0] || 'en'

const DEFAULT_PATH = `${ASSETS_BASE_L10N_PATH}en.json`

const asset = createAsset(async (): Promise<object> => {
  console.log(` load locale:${locale}.json  `)
  PixiLoaderStatusEmitter.getInstance().addCounter()
  let json, res
  try {
    res = await fetch(`${ASSETS_BASE_L10N_PATH}${locale}.json` + '?ts=' + Date.now())
    json = await res.json()
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    console.log(` use default locale:${DEFAULT_PATH}  `)

    res = await fetch(DEFAULT_PATH + '?ts=' + Date.now())
    json = await res.json()
  }
  PixiLoaderStatusEmitter.getInstance().delCounter()

  return json
})
asset.preload()

function translate(l10n: object, mnemonic: string, vals?: Record<string, string>) {
  const values = vals || {}
  try {
    return (
      mnemonic
        .split('.')
        // eslint-disable-next-line
        //@ts-expect-error
        .reduce((prev, curr) => prev !== undefined && prev !== null && prev[curr], l10n)
        .toString()
        .replace(/\{\{(.*?)\}\}/g, (_, vals) => values[vals])
    )
    // eslint-disable-next-line
  } catch (error) {
    return mnemonic
  }
}

type Mnemonic =
  | [string, Record<string, string> | undefined]
  | { mnemonic: string; vals?: Record<string, string> }
  | string

type Format = (str: string) => string

/**
 * @example
 * // returns {balance:"BALANCE", helmet: "x2 HELMET", shield: "x4 SHIELD"}
 * const {balance, helmet, shield} = useL10n({balance:"TextField.BALANCE",
 * helmet:["TextField.HELMET",{mult:"2"}], shield:{mnem:"TextField.SHIELD", vals:{mult:"4"}}});;
 * @example
 * // returns "x2 HELMET"
 * const helmet = useL10n("TextField.HELMET",{mult:"2"})
 */
function useL10n<T>(mnemonic: Record<keyof T, Mnemonic>, format?: Format): Record<keyof T, string>
function useL10n(mnemonic: Mnemonic[], format?: Format): string[]
function useL10n(mnemonic: string, vals?: Record<string, string>, format?: Format): string
function useL10n<T>(
  alpha: Mnemonic[] | Record<keyof T, Mnemonic> | string,
  beta?: Format | Record<string, string>,
  gamma?: Format,
): Record<keyof T, string> | string | string[] {
  const l10n = asset.read()

  const aRef = useRef(alpha)
  if (JSON.stringify(aRef.current) !== JSON.stringify(alpha)) {
    aRef.current = alpha
  }

  const bRef = useRef<Record<string, string>>()
  if (beta instanceof Function) {
    bRef.current = undefined
  } else if (JSON.stringify(bRef.current) !== JSON.stringify(beta)) {
    bRef.current = beta
  }

  const format = useMemo(
    () => (beta instanceof Function ? beta : gamma instanceof Function ? gamma : (str: string) => str),
    [beta, gamma],
  )

  const getString = useCallback(
    (val: Mnemonic) => {
      return format(
        typeof val === 'string'
          ? translate(l10n, val)
          : Array.isArray(val)
            ? translate(l10n, val[0], val[1])
            : translate(l10n, val.mnemonic, val.vals),
      )
    },
    [l10n, format],
  )

  const text = useMemo(() => {
    const alpha = aRef.current
    const beta = bRef.current
    if (typeof alpha === 'string') {
      return getString([alpha, beta])
    } else if (Array.isArray(alpha)) {
      const arr: string[] = []
      alpha.forEach((val, index) => {
        arr[index] = getString(val)
      })

      return arr
    } else {
      const rec = {} as Record<keyof T, string>
      ;(Object.keys(alpha) as (keyof T)[]).forEach((key) => {
        const val = alpha[key] as Mnemonic
        rec[key] = getString(val)
      })

      return rec
    }
  }, [getString, aRef.current, bRef.current]) // eslint-disable-line react-hooks/exhaustive-deps

  return text
}

useL10n.translate = (mnemonic: string, vals?: Record<string, string>) => translate(asset.read(), mnemonic, vals)

export default useL10n
