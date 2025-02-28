import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useL10n } from '@apis-games-front/use-assets'
import { getAlertValidation, getAlertValidationType } from './state/selectors/alertValidationSelectors'
import { closeAlertValidation, openAlertLoadingValidation } from './state/slices/alertValidationSlice'

const useMessageHandler = () => {
  const dispatch = useDispatch()
  const alertValidation = useSelector(getAlertValidation)
  const alertType = useSelector(getAlertValidationType)
  const ALERT_CONNECTION_LOST = useL10n('Alert.CONNECTION_LOST')

  const statusCodes: Record<string, string> = {
    'AxiosError: Request failed with status code 500': ALERT_CONNECTION_LOST,
    'AxiosError: Network Error': ALERT_CONNECTION_LOST,
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return
      }
      const { type, data } = event.data
      if (type === 'bet:success' && alertValidation && alertType === 'loading') {
        dispatch(closeAlertValidation())
      } else if (type === 'error') {
        dispatch(openAlertLoadingValidation(statusCodes[data.statusCode]))
      }
    }

    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [alertType, dispatch, statusCodes])
}

export default useMessageHandler
