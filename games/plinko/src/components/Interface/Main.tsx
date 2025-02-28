import '../../assets/styles/Main.scss'
import Navigation from './Navigation'
import Bet from './Bet/Bet'
import GameContainer from './GameContainer'
// import MainHonestyOption from './MainHonestyOption'
import { useSelector } from 'react-redux'
import { getDialogSettings } from '../../state/selectors/dialogSelectors'

function Main() {
  const dialogSettings = useSelector(getDialogSettings)

  return (
    <div className="main">
      {!dialogSettings && <Navigation />}
      <GameContainer />
      {!dialogSettings && <Bet />}
      {/*{!dialogSettings && <MainHonestyOption />}*/}
    </div>
  )
}

export default Main
