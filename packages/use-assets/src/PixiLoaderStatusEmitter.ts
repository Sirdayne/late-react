import * as PIXI from 'pixi.js'

export const EVENT_ERROR = 'EVENT_ERROR'
export const EVENT_SUCCESS = 'EVENT_SUCCESS'
export const EVENT_PROGRESS = 'EVENT_PROGRESS'

export default class PixiLoaderStatusEmitter extends PIXI.utils.EventEmitter {
  private static _instance: PixiLoaderStatusEmitter

  private _counter = 0

  private _maxCounter = 0

  private constructor() {
    super()
    PixiLoaderStatusEmitter._instance = this
  }

  public static getInstance(): PixiLoaderStatusEmitter {
    return PixiLoaderStatusEmitter._instance !== undefined
      ? PixiLoaderStatusEmitter._instance
      : new PixiLoaderStatusEmitter()
  }

  public addCounter(): void {
    this._counter++
    this._maxCounter = Math.max(this._counter, this._maxCounter)
  }

  public delCounter(): void {
    this._counter--

    this.emit(EVENT_PROGRESS, ((this._maxCounter - this._counter) / this._maxCounter) * 100 || 100)
    if (this._counter <= 0) {
      this.emit(EVENT_SUCCESS)
    }
  }

  public emitError(): void {
    this.emit(EVENT_ERROR)
  }

  public status(): void {
    this.emit(EVENT_PROGRESS, ((this._maxCounter - this._counter) / this._maxCounter) * 100 || 100)
    if (this._counter <= 0) {
      this.emit(EVENT_SUCCESS)
    }
  }
}
