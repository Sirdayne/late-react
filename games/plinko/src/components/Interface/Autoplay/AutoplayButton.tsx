import '../../../assets/styles/Autoplay/AutoplayButton.scss'
import thunderIcon from '../../../assets/img/thunderIcon.svg'
import { useL10n } from '@apis-games-front/use-assets'
import { useCallback, useEffect, useState } from 'react'
import { openAutoplay } from '../../../state/slices/dialogSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getAutoplayMaxRounds, getAutoplayRounds } from '../../../state/selectors/autoplaySelectors'
import { setAutoplayRounds } from '../../../state/slices/autoplaySlice'
import { gotoFinishAsync } from '../../../state/slices/gameSlice'

function AutoplayButton({ disabled = false}) {
  const dispatch = useDispatch()
  const AUTOPLAY_AUTOPLAY = useL10n(`Autoplay.AUTOPLAY`)
  const rounds = useSelector(getAutoplayRounds)
  const maxRounds = useSelector(getAutoplayMaxRounds)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const roundsPercent = rounds === Infinity ? 100 : (maxRounds - rounds) / maxRounds * 100
    const clampedPercent = Math.min(100, Math.max(0, roundsPercent))
    setPercent(clampedPercent)
  }, [rounds, maxRounds])

  const onAutoplayClick = useCallback(() => {
    if (!disabled && rounds <= 0) {
      dispatch(openAutoplay())
    }
  }, [dispatch, disabled, rounds])

  const getClipPath = (percent) => {
    if (percent <= 25) {
      return `polygon(50% 50%, 100% 0, 100% ${percent * 4}%, 50% 50%)`
    } else if (percent <= 50) {
      return `polygon(50% 50%, 100% 0, 100% 100%, ${100 - (percent - 25) * 4}% 100%, 50% 50%)`
    } else if (percent <= 75) {
      return `polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 ${100 - (percent - 50) * 4}%, 50% 50%)`
    } else {
      return `polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0, ${(percent - 75) * 4}% 0, 50% 50%)`
    }
  }

  return (
    <div className={disabled ? 'autoplay-button autoplay-button-disabled' : 'autoplay-button'}
         onClick={onAutoplayClick}>
      {rounds && rounds > 0 ? <div className="autoplay-button-active">
          <div className="autoplay-button-active-border"
               style={{ clipPath: getClipPath(percent) }}
          ></div>
          <span
            className={rounds === 'Infinity' || rounds === Infinity ? 'autoplay-button-active-value autoplay-button-active-value-infinity' : 'autoplay-button-active-value'}>
            {rounds === 'Infinity' || rounds === Infinity ? '∞' : rounds}
          </span>
        </div> :
        <div className="autoplay-button-ordinary">
          <img className="autoplay-button-ordinary-img" src={thunderIcon} alt="Autoplay icon" />
          <span className="autoplay-button-ordinary-label">{AUTOPLAY_AUTOPLAY}</span>
        </div>}
    </div>
  )
}

export default AutoplayButton
