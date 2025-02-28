import '../../../assets/styles/Modals/AlertValidation.scss'
import { useDispatch, useSelector } from 'react-redux'
import { closeAlertValidation } from '../../../state/slices/alertValidationSlice'
import { getGameFieldRight } from '../../../state/selectors/gameFieldPositionSelectors'
import { getAlertValidationText, getAlertValidationType } from '../../../state/selectors/alertValidationSelectors'
import Spinner from '../ui/Spinner'

function AlertValidation() {
  const right = useSelector(getGameFieldRight)
  const alertText = useSelector(getAlertValidationText)
  const alertType = useSelector(getAlertValidationType)
  const dispatch = useDispatch()

  return (
    <>
      <div
        className={`alert-validation ${!right ? 'alert-validation_right' : ''} ${alertType === 'loading' ? 'alert-validation-loading' : ''}`}
        onClick={() => dispatch(closeAlertValidation())}>
        {alertType === 'loading' ?
          <Spinner />
          :
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="ErrorOutline">
              <path id="Vector" fillRule="currentColor" clipRule="evenodd"
                    d="M21.3002 12.0002C21.3002 17.1402 17.1402 21.3002 12.0002 21.3002C6.8602 21.3002 2.7002 17.1402 2.7002 12.0002C2.7002 6.8602 6.8602 2.7002 12.0002 2.7002C17.1402 2.7002 21.3002 6.8602 21.3002 12.0002ZM12.0002 20.0002C16.4202 20.0002 20.0002 16.4202 20.0002 12.0002C20.0002 7.5802 16.4202 4.0002 12.0002 4.0002C7.5802 4.0002 4.0002 7.5802 4.0002 12.0002C4.0002 16.4202 7.5802 20.0002 12.0002 20.0002ZM15.5302 8.4702C15.8202 8.7602 15.8202 9.2402 15.5302 9.5302L13.0602 12.0002L15.5302 14.4702C15.8202 14.7602 15.8202 15.2402 15.5302 15.5302C15.2402 15.8202 14.7602 15.8202 14.4702 15.5302L12.0002 13.0602L9.5302 15.5302C9.2402 15.8202 8.7602 15.8202 8.4702 15.5302C8.1802 15.2402 8.1802 14.7602 8.4702 14.4702L10.9402 12.0002L8.4702 9.5302C8.1802 9.2402 8.1802 8.7602 8.4702 8.4702C8.7602 8.1802 9.2402 8.1802 9.5302 8.4702L12.0002 10.9402L14.4702 8.4702C14.7602 8.1802 15.2402 8.1802 15.5302 8.4702Z"
                    fill="currentColor" />
            </g>
          </svg>
        }
        <div className="alert-validation-text">
          {alertText}
        </div>
      </div>
      {alertType === 'loading' && <div className="alert-validation-loading-overlay"></div>}
    </>
  )
}

export default AlertValidation
