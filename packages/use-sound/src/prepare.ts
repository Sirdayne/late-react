import { Howler } from 'howler'

import { mute } from '.'
import { cache } from './getHowl'

//блок кода нужен для того чтобы все звуки не стартовали скопом
//---START---
let muttedAtStart = true
try {
  // const context = new (window.AudioContext || window.webkitAudioContext)()
  const context = new window.AudioContext()
  muttedAtStart = context.state === 'suspended'
  // eslint-disable-next-line no-unused-vars
} catch (error) {
  const audio = new Audio()
  try {
    audio.play()
    muttedAtStart = false
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    muttedAtStart = true
  }
}

if (muttedAtStart) {
  const gestureEvents = [
    'click',
    'contextmenu',
    'auxclick',
    'dblclick',
    'mousedown',
    'mouseup',
    'pointerup',
    'touchend',
    'keydown',
    'keyup',
  ]
  const unmute = () => {
    Object.values(cache).forEach((sound) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!sound.loop) {
        sound.stop()
      }
    })
    gestureEvents.forEach((eventName) => {
      document.removeEventListener(eventName, unmute)
    })
  }
  gestureEvents.forEach((eventName) => {
    document.addEventListener(eventName, unmute)
  })
}
//---END---

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    Howler.mute(true)
  } else {
    const muted = mute.get()
    Howler.mute(muted)
  }
})
