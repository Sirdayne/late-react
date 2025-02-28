import * as PIXI from 'pixi.js'

import { DEFAULT_FONT_FAMILY } from '../../constants'
const SOUND_PANEL = 'panels/btn/volume-menu.png'
const ICON_SOUND_MAIN_ON = 'panels/icons/volume-on_initial.png'
const ICON_SOUND_MAIN_OFF = 'panels/icons/volume-off_initial.png'

const ICON_SOUND_ON = 'panels/icons/sound_initial.png'
const ICON_SOUND_OFF = 'panels/icons/sound_turned-off.png'

const ICON_MUSIC_ON = 'panels/icons/music_initial.png'
const ICON_MUSIC_OFF = 'panels/icons/music_turned-off.png'

const BTN_BACK_ON = 'panels/btn/volume_btn_initial.png'
const BTN_BACK_HOVER = 'panels/btn/volume_btn_selected.png'
const BTN_BACK_OFF = 'panels/btn/volume_btn_hover.png'

export const ASSETS_IMAGE_SOUNDS = [
  SOUND_PANEL,
  BTN_BACK_ON,
  BTN_BACK_OFF,
  BTN_BACK_HOVER,
  ICON_SOUND_MAIN_ON,
  ICON_SOUND_MAIN_OFF,
  ICON_MUSIC_ON,
  ICON_MUSIC_OFF,
  ICON_SOUND_ON,
  ICON_SOUND_OFF,
]

export const TEXT_STYLE_SOUNDS = new PIXI.TextStyle({
  align: 'center',
  fill: 'rgb(255,255,255)',
  fontFamily: DEFAULT_FONT_FAMILY,
  fontSize: 45,
  wordWrap: true,
  wordWrapWidth: 100,
})
