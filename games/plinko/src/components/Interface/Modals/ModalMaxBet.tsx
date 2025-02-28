import '../../../assets/styles/Modals/Modal.scss'
import Btn from '../ui/Btn'
import { useDispatch } from 'react-redux'
import { closeMaxBet } from '../../../state/slices/dialogSlice'
import { useL10n } from '@apis-games-front/use-assets'

function ModalMaxBet() {
  const dispatch = useDispatch()

  const MAX_BET = useL10n(`SettingsPanel.MAX_BET`)
  const CONFIRM_MAX_BET = useL10n(`SettingsPanel.CONFIRM_MAX_BET`)
  const BTN_CANCEL = useL10n(`Button.CANCEL`)
  const BTN_ACTIVATE = useL10n(`Button.ACTIVATE`)

  return (
    <div className="modal-overlay">
      <div className="modal modal-bet">
        <div className="modal-title">{MAX_BET}</div>
        <div className="modal-text">
          {CONFIRM_MAX_BET}
        </div>
        <div className="modal-btns">
          <Btn className="btn-outline modal-btn-cancel" onClick={() => dispatch(closeMaxBet())}>{BTN_CANCEL}</Btn>
          <Btn onClick={() => dispatch(closeMaxBet())}>{BTN_ACTIVATE}</Btn>
        </div>
      </div>
    </div>
  )
}

export default ModalMaxBet
