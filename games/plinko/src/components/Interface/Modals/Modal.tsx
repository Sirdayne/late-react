import '../../../assets/styles/Modals/Modal.scss'
import Btn from '../ui/Btn'
import { useDispatch } from 'react-redux'

function Modal() {
  const dispatch = useDispatch()

  return (
    <div className="modal-overlay">
      <div className="modal modal-bet">
        <div className="modal-title">Модальное окно</div>
        <div className="modal-text">
          Вы уверены?
        </div>
        <div className="modal-btns">
          <Btn className="btn-outline modal-btn-cancel" onClick={() => dispatch(closeMaxBet())}>Отмена</Btn>
          <Btn onClick={() => dispatch(closeMaxBet())}>Да</Btn>
        </div>
      </div>
    </div>
  )
}

export default Modal
