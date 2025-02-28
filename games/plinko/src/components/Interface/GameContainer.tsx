import '../../assets/styles/GameContainer.scss'
import { useSelector } from 'react-redux'
import { getGameFieldIsAnimating, getGameFieldRight } from '../../state/selectors/gameFieldPositionSelectors'

function GameContainer () {
  const right = useSelector(getGameFieldRight)
  const isAnimating = useSelector(getGameFieldIsAnimating)

  return (
      <div className={!right && isAnimating ? 'game-container game-container-right game-container-animate' :
                      right && isAnimating ? 'game-container game-container-animate' :
                      !right && !isAnimating ? 'game-container game-container-right' : 'game-container'} />
  )
}

export default GameContainer
