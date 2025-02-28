import { getUseSpritesheets } from '@apis-games-front/use-assets'
import { PixiRef, Sprite } from '@pixi/react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setTimeout } from 'worker-timers'

import { updateBalanceHistory } from '../../state/slices/balanceSlice'
import { addHistory, removeBall, setTimesAvr } from '../../state/slices/playgroundSlice'
import { ASSETS_IMAGE_BALL, ASSETS_IMAGE_BALL_RED } from './constants'

const { useSpritesheets } = getUseSpritesheets(`field-0.json`)

export default function({ bigWinMultiplier, id, isBigWin, multiplier, onCollision, pathsData }: {
  bigWinMultiplier: number
  id: string
  isBigWin: boolean
  multiplier: number
  onCollision: (id: string, isBigwin: boolean) => void
  pathsData: string
}) {
  const { getTexture } = useSpritesheets()
  const ballTexture = useMemo(() => getTexture(isBigWin ? ASSETS_IMAGE_BALL_RED : ASSETS_IMAGE_BALL), [getTexture, isBigWin])

  const dispatch = useDispatch()
  const ballRef = useRef<PixiRef<typeof Sprite>>(null)
  const ballCountRef = useRef<number>(0)

  const path: { collision: string | undefined; x: number; y: number }[] = useMemo(() => {
    const data = pathsData.split(';').map((value) => {
      const obj: string[] = value.split(',')
      const data: { collision: string | undefined; x: number; y: number } = {
        collision: obj[2],
        x: parseFloat(obj[0]),
        y: parseFloat(obj[1]),
      }
      return data
    })
    return data
  }, [pathsData])

  const ballMove = useCallback(() => {
    const ball = ballRef.current
    if (ball) {
      if (ballCountRef.current < path.length - 1) {
        ball.visible = true
        const point = path[ballCountRef.current]
        if (!isNaN(point.y) && !isNaN(point.x)) {
          // eslint-disable-next-line max-depth
          if (ballCountRef.current < path.length - 5) {
            ball.x = point.x
            ball.y = point.y
          } else {
            ball.visible = false
          }
          // eslint-disable-next-line max-depth
          if (point.collision != null && point.collision.length > 4) {
            onCollision(point.collision, isBigWin)
          }
          setTimeout(ballMove, isBigWin ? 19 : 17)
        } else {
          console.log(`......  error `)
        }
        ballCountRef.current++
      } else {
        setTimeout(() => {
          dispatch(addHistory({ isBigWin: isBigWin, multiplier: isBigWin ? bigWinMultiplier : multiplier }))
          dispatch(updateBalanceHistory(id))
          dispatch(removeBall(id))
          dispatch(setTimesAvr())
        }, 10)
      }
    }
  }, [id, isBigWin, multiplier, dispatch, path, onCollision])

  useEffect(() => {
    if (ballRef.current) {
      ballRef.current.visible = false
      ballRef.current.x = 0
      ballRef.current.y = -600
      ballMove()
    }
  }, [id, ballMove])

  return (<Sprite ref={ballRef}
                  texture={ballTexture}
                  anchor={0.5}
                  scale={0.48}
    />
  )
}
