import * as PIXI from 'pixi.js'

import { DEFAULT_FONT_FAMILY } from '../../constants'

const COLOR_RANGE = [0xfd4727, 0xfd5730, 0xfd6739, 0xfd7742, 0xfd874b, 0xfd9754, 0xfda75d, 0xfdb766, 0xfdc76f, 0xffd578]
export const COLORS = [...COLOR_RANGE, ...COLOR_RANGE.reverse()]

export const PIN_START = 3
export const PIN_GAP_X = 36
export const PIN_GAP_Y = 36

export const HISTORY_GAP = 39
export const HISTORY_ITEM_VIEW_COUNT = 5

export const ASSETS_IMAGE_BALL = 'balls/ball_l.png'
export const ASSETS_IMAGE_BALL_RED = 'balls/ball_redl_l.png'
const ASSETS_IMAGE_PIN_L_I = 'pins/pin_l_initial.png'
const ASSETS_IMAGE_PIN_GLOW = 'pins/glow_old.png'
const ASSETS_IMAGE_FIELD = 'win-field_8.png'
const ASSETS_IMAGE_FIELD_GLOW = 'glow_8.png'
export const ASSETS_HISTORY_BIG_WIN = 'big-win_icon.png'
export const ASSETS_IMAGE_PINS = [
  ASSETS_IMAGE_PIN_GLOW,
  ASSETS_IMAGE_PIN_L_I,
  ASSETS_IMAGE_FIELD,
  ASSETS_IMAGE_FIELD_GLOW,
]
export const TEXT_STYLE = new PIXI.TextStyle({
  align: 'center',
  fill: 'rgb(255,255,255)',
  fontFamily: DEFAULT_FONT_FAMILY,
  fontSize: 19,
  fontWeight: 'bold',
  wordWrap: true,
  wordWrapWidth: 500,
})
export const TEXT_STYLE_16 = new PIXI.TextStyle({
  align: 'center',
  fill: 'rgb(255,255,255)',
  fontFamily: DEFAULT_FONT_FAMILY,
  fontSize: 19,
  fontWeight: 'bold',
  wordWrap: true,
  wordWrapWidth: 500,
})
export const TEXT_STYLE_HISTORY = new PIXI.TextStyle({
  align: 'center',
  fill: 'rgb(255,255,255)',
  fontFamily: DEFAULT_FONT_FAMILY,
  fontSize: 47,
  wordWrap: true,
  wordWrapWidth: 500,
})

export const colorRange = (rows: number, index: number) =>
  Math.round(gsap.utils.mapRange(0, rows + 1, 0, COLORS.length, index))
