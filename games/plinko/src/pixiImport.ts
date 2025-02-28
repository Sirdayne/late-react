import * as PIXI from 'pixi.js'
//!Hack для подключения Spine
//сначала надо добавить PIXI в window и только после этого подключить spine
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(window as any).PIXI = PIXI
