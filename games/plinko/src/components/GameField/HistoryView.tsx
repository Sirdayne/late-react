import { _ReactPixi, Container } from '@pixi/react'
import * as PIXI from 'pixi.js'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { getBigWinActive, getHistory } from '../../state/selectors/playgroundSelector'
import { HistoryData } from '../../state/slices/types'
import { HISTORY_ITEM_VIEW_COUNT } from './constants'
import HistoryItem from './HistoryItem'
import PointLike = _ReactPixi.PointLike
import useResize from '@apis-games-front/use-resize'

import { getIsMobile } from '../../state/selectors/interfaceSelectors'

export default function({ visible }: { visible: boolean }) {
  const history: HistoryData[] = useSelector(getHistory)
  const { aspect, height, width } = useResize()
  const isMobile: boolean = useSelector(getIsMobile) || PIXI.utils.isMobile.any

  const position: PointLike = useMemo(() => {
    return [width - 20, 25]
  }, [height, width, isMobile])
  const scale = useMemo(() => {
    return isMobile ? 0.52 : 1
  }, [isMobile])

  return (
    <Container visible={visible} position={position} scale={Math.min(1, aspect) * scale}>
      {history.slice(0, HISTORY_ITEM_VIEW_COUNT + 5).map(({ id, index, multiplier, isBigWin }, key) => (
        <HistoryItem key={index} index={key} id={id} isBigWin={isBigWin} multiplier={multiplier} />
      ))}
    </Container>
  )
}
