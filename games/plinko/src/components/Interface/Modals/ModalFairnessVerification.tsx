import '../../../assets/styles/Modals/Modal.scss'
import Btn from '../ui/Btn'
import { useDispatch } from 'react-redux'
import { closeFairnessVerification, closeMaxBet } from '../../../state/slices/dialogSlice'
import { useL10n } from '@apis-games-front/use-assets'
import { useEffect, useRef } from 'react'
import { setFairnessTab, setSeedId } from '../../../state/slices/fairnessSlice'
import { fetchRegenerationSeeds } from '../../../state/slices/regenerationSeedsSlice'

function ModalFairnessVerification() {
  const dispatch = useDispatch()
  const modalRef = useRef(null)
  const BTN_CANCEL = useL10n(`Button.CANCEL`)

  const changeSeed = () => {
    dispatch(fetchRegenerationSeeds())
    dispatch(setFairnessTab('seeds'))
    dispatch(closeFairnessVerification())
  }

  const closeModal = () => {
    dispatch(setSeedId(''))
    dispatch(closeFairnessVerification())
  }

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div className="modal-overlay">
      <div className="modal modal-bet" ref={modalRef}>
        <div className="modal-title">Верификация</div>
        <div className="modal-text">
          Верифицированный результат игры можно получить только для уже использованных пар сидов. Хотите сменить сиды, чтобы получить результат для этой игры?
        </div>
        <div className="modal-btns">
          <Btn className="btn-outline modal-btn-long" onClick={() => closeModal()}>{BTN_CANCEL}</Btn>
          <Btn className="modal-btn-long" onClick={() => changeSeed()}>Сменить</Btn>
        </div>
      </div>
    </div>
  )
}

export default ModalFairnessVerification
