const Matter = require('matter-js')
const fs = require('fs')
const path = require('path')

const ID = parseInt(process.env.ID)
const BALLS = parseInt(process.env.BALLS)
// Matter Modules //
const Engine = Matter.Engine
const Events = Matter.Events
const World = Matter.World
const Body = Matter.Body
const Bodies = Matter.Bodies
const Runner = Matter.Runner

const ROWS_MAX = ID
const SHIFT_X = 400
const SHIFT_Y = 102
const START = 3
const DELTA_X = 36
const DELTA_Y = 36

const dataOutput = {}

const engine = Engine.create()
engine.gravity.y = 0.9
engine.gravity.x = 0

const sceneObjects = []
let sensorCount = 0
let ballCounter = 0
let countWhile = 0
let line = ''

const createSceneObject = (obj, index) => {
  // Matter Body
  let objBody
  if (obj.sensor) {
    objBody = Bodies.rectangle(
      obj.x,
      obj.y,
      obj.width * 4,
      obj.width + 8,
      {
        mass: obj.mass,
        restitution: obj.restitution,
        isStatic: obj.static,
        isSensor: obj.sensor,
        friction: obj.friction,
        label: obj.label,
        frictionAir: obj.frictionAir,
      },
    )
  } else {
    objBody = Bodies.circle(
      obj.x,
      obj.y,
      obj.width,
      {
        mass: obj.mass,
        restitution: obj.restitution,
        isStatic: obj.static,
        isSensor: obj.sensor,
        friction: obj.friction,
        label: obj.label,
        density: obj.density,
        frictionAir: obj.frictionAir,
      },
    )
  }
  World.addBody(engine.world, objBody)

  obj.added && sceneObjects.push({
    body: objBody,
    sprite: undefined,
  })
}
const removeObject = () => {
  World.remove(engine.world, sceneObjects.pop())
}
const pinsCount = (rows) => ((rows + 2) * (rows + 2 + 1)) / 2 - 3
const pins = () => {
  const pin = pinsCount(ROWS_MAX) + ROWS_MAX + 1// add sensor
  console.log(`pins: ${pin - (ROWS_MAX + 1)} with sensor: ${ROWS_MAX + 1}`)
  const arr = [...Array(pin).keys()]
  let posX = 0
  let posY = 0
  let col = 0
  let colLimit = START
  let shift = 0
  const data = arr.map((value) => {
    if (value < shift + colLimit) {
      posX = (value - shift) * DELTA_X
    } else {
      posX = 0
      shift = value
      colLimit++
      col++
    }
    posX -= (colLimit * DELTA_X) / 2
    posY = col * DELTA_Y

    const isSensor = ((arr.length - value) <= ROWS_MAX + 1)
    if (isSensor) {
      // console.log(`sensorCount: ${sensorCount}`)
      dataOutput[`sensor_${sensorCount}`] = []
    }
    return {
      added: false,
      label: isSensor ? `sensor_${sensorCount++}` : `pin_${value}`,
      x: posX + 400 + (isSensor ? 36 : 0),
      y: posY + 100 + (isSensor ? 10 : 0),
      friction: 0.020,
      frictionAir: 0.000,
      restitution: 2,
      width: 6,
      mass: 2000,
      sensor: isSensor ? true : false,
      static: true,
    }
  })
  return data
}
const createBall = () => {
  const ball = {
    added: true,
    label: `bal_${ballCounter++}`,
    x: 382 + Math.floor((Math.random() * 10) * (Math.random() > 0.5 ? 1 : -1)),
    y: 65,
    friction: 0.025,
    frictionAir: 0.035,
    restitution: 1,
    density: 0.0065,
    width: 12,
    mass: 40,
    sensor: false,
    static: false,
  }
  createSceneObject(ball, 0)
}
const createPins = () => {
  const pin_8 = pins()

  pin_8.forEach((image, index) => {
    createSceneObject(image, index)
  })
}
const update = () => {
  if (sceneObjects[0] !== undefined) {
    const obj = sceneObjects[0].body
    line += `${Math.round((obj.position.x - SHIFT_X) * 1000) / 1000},${Math.round((obj.position.y - SHIFT_Y) * 1000) / 1000},;`
  }
}
const updateCollision = (event) => {
  const pairs = event.pairs
  for (const pair of pairs) {
    const obj = pair.bodyB
    line += `${Math.round((obj.position.x - SHIFT_X) * 1000) / 1000},${Math.round((obj.position.y - SHIFT_Y) * 1000) / 1000},${pair.bodyA.label};`
    const label = pair.bodyA.label
    if (label.substring(0, 4) === 'bal_') {
      line = ''
      countWhile = 100000
    }
    if (label.substring(0, 6) === 'sensor') {
      if (dataOutput[label] === undefined) {
        dataOutput[label] = []
      }
      if (line.length > 400) {
        dataOutput[label].push(line)
      }
      line = ''
      countWhile = 100000
    }
  }
}
const runner = Runner.create({
  isFixed: true,
  delta: 20,
  enabled: false,
})

if (ID) {
  console.error(`${ID} is initialized`)
  createPins()
  console.log(`CREATE VIEW ${ID}`)
  Runner.run(runner, engine)
  Events.on(runner, 'tick', update)
  Events.on(engine, 'collisionStart', updateCollision)
  while (ballCounter < 500) {
    line = ''
    createBall()
    const obj = sceneObjects[0].body
    Body.setAngularVelocity(obj, Math.random() * (Math.random() > 0.5 ? 0.5 : -0.5))
    while (countWhile < 400) {
      Runner.tick(runner, engine, countWhile)
      Matter.Engine.update(engine, countWhile)
      countWhile++
    }
    countWhile = 0
    removeObject()
  }
  for (const key in dataOutput) {
    console.log(`${key}: ${dataOutput[key].length} `)
  }
  const orderedOutput = Object.keys(dataOutput).sort().reduce(
    (obj, key) => {
      obj[key] = dataOutput[key]
      //cut length
      if (obj[key].length > 10)
        obj[key].length = 10
      return obj
    },
    {},
  )
  fs.writeFileSync(
    path.join('./', `row_${ID}.json`),
    JSON.stringify(orderedOutput, null, 4).replace(/\\\\n/g, '\\n'),
  )
  console.log(`FINISHED.....ball: ${ballCounter}`)
  Events.off(runner, 'tick', update)
  Events.off(engine, 'collisionStart', updateCollision)
  process.exit(0)

} else {
  console.error('ID is required')
  process.exit(1)
}
