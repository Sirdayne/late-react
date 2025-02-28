import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { PixiPlugin } from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'

// (window as any).gsap = gsap;
globalThis.gsap = gsap
gsap.registerPlugin(PixiPlugin)
gsap.registerPlugin(MotionPathPlugin)
PixiPlugin.registerPIXI(PIXI)
