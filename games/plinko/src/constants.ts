import * as PIXI from 'pixi.js'

export const DEFAULT_FONT_FAMILY = 'Geologica'
export const ALL_FONTS = [DEFAULT_FONT_FAMILY]
export const SOUNDS = {
  soundBet: 'start.mp3',
  soundMain: 'plinko_music.mp3',
  soundPin: 'pin.mp3',
  soundPin0: 'pin0.mp3',
  soundPin1: 'pin1.mp3',
  soundPin2: 'pin2.mp3',
  soundPocket: 'plate-low.mp3',
  soundPocketH: 'plate-high.mp3',
  soundPocketM: 'plate-medium.mp3',
  soundBWBall: 'bw_ball.mp3',
  soundBWBallFall: 'bw_ball_fall.mp3',
  soundBWBoom: 'bw_boom.mp3',
  soundBWEarthquake: 'bw_earthquake.mp3',
  soundBWFly: 'bw_fly.mp3',
  soundBWLightning: 'bw_lightning.mp3',
  soundBWText: 'bw_text.mp3',
  soundBWThunder: 'bw_thunder.mp3',
  //plate-high.mp3		plate-low.mp3		plate-medium.mp3
}
export const VIEW: { data: null | string | Uint8Array } = { data: null }
