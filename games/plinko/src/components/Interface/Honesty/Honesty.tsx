import '../../../assets/styles/Honesty/Honesty.scss'
import '../../../assets/styles/Honesty/HonestyFormField.scss'
import { useRef, useState } from 'react'
import HonestySeed from './HonestySeed'
import { useSelector } from 'react-redux'
import { getGameFieldRight } from '../../../state/selectors/gameFieldPositionSelectors'
import HonestyTabs from './HonestyTabs'

function Honesty() {
  const right = useSelector(getGameFieldRight)
  const [viewSeedId, setViewSeedId] = useState('')
  const honestyRef = useRef(null)

  const selectViewSeed = (seedId) => {
    honestyRef.current.scrollTo(0, 0)
    setViewSeedId(seedId)
    console.log('Select View Seed: ', seedId)
  }

  return (
    <div ref={honestyRef} className={!right ? 'honesty honesty-right' : 'honesty'}>
      {!viewSeedId && <HonestyTabs selectViewSeed={selectViewSeed}></HonestyTabs>}
      {viewSeedId && <HonestySeed viewSeedId={viewSeedId} selectViewSeed={selectViewSeed}></HonestySeed>}
    </div>
  )
}

export default Honesty
