import '../../assets/styles/Navigation.scss'
import burgerIcon from '../../assets/img/burger.svg'
import plinkoLogo from '../../assets/img/plinko.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getGameFieldRight } from '../../state/selectors/gameFieldPositionSelectors'
import { closeAutoplay, closeMaxBet, openSettings } from '../../state/slices/dialogSlice'
import { useCallback, useEffect, useState } from 'react'

function Navigation() {
  const dispatch = useDispatch()
  const right = useSelector(getGameFieldRight)

  const [exitUrl, setExitUrl] = useState('')

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const url = searchParams.get('exitUrl')
    setExitUrl(url)
  }, [])

  const handleBackClick = () => {
    if (exitUrl) {
      window.location.href = exitUrl.startsWith('https://') ? exitUrl : `https://${exitUrl}`
    }
  }

  const openDialogSettings = useCallback(() => {
    dispatch(closeAutoplay())
    dispatch(closeMaxBet())
    dispatch(openSettings())
  }, [dispatch])

  return (
    <div className={!right ? 'navigation navigation-right' : 'navigation'}>
      <div className={exitUrl ? "navigation-back" : "navigation-back navigation-back-disabled"} onClick={handleBackClick}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Back">
            <path id="Vector" fillRule="evenodd" clipRule="evenodd"
                  d="M7.23243 12.8065C6.83104 14.6126 6.66543 16.9499 6.66543 20C6.66543 23.0501 6.83104 25.3874 7.23243 27.1935C7.62961 28.9807 8.23514 30.1439 9.04513 30.9539C9.85512 31.7639 11.0183 32.3694 12.8055 32.7666C14.6116 33.168 16.9489 33.3336 19.999 33.3336C23.0492 33.3336 25.3865 33.168 27.1925 32.7666C28.9797 32.3694 30.1429 31.7639 30.9529 30.9539C31.7629 30.1439 32.3684 28.9807 32.7656 27.1935C33.167 25.3874 33.3326 23.0501 33.3326 20C33.3326 16.9499 33.167 14.6126 32.7656 12.8065C32.3684 11.0193 31.7629 9.8561 30.9529 9.04611C30.1429 8.23612 28.9797 7.63058 27.1925 7.2334C25.3865 6.83201 23.0492 6.66641 19.999 6.66641C16.9489 6.66641 14.6116 6.83201 12.8055 7.2334C11.0183 7.63058 9.85512 8.23612 9.04513 9.04611C8.23514 9.8561 7.62961 11.0193 7.23243 12.8065ZM12.0823 3.9794C14.2469 3.49834 16.8728 3.33301 19.999 3.33301C23.1252 3.33301 25.7512 3.49834 27.9157 3.9794C30.0992 4.46465 31.914 5.29305 33.31 6.68904C34.706 8.08503 35.5344 9.89983 36.0196 12.0833C36.5007 14.2478 36.666 16.8738 36.666 20C36.666 23.1262 36.5007 25.7522 36.0196 27.9167C35.5344 30.1002 34.706 31.915 33.31 33.311C31.914 34.7069 30.0992 35.5353 27.9157 36.0206C25.7512 36.5017 23.1252 36.667 19.999 36.667C16.8728 36.667 14.2469 36.5017 12.0823 36.0206C9.89886 35.5353 8.08405 34.7069 6.68806 33.311C5.29207 31.915 4.46368 30.1002 3.97842 27.9167C3.49737 25.7522 3.33203 23.1262 3.33203 20C3.33203 16.8738 3.49737 14.2478 3.97842 12.0833C4.46368 9.89983 5.29207 8.08503 6.68806 6.68904C8.08405 5.29305 9.89886 4.46465 12.0823 3.9794ZM28.3321 19.9983C28.3321 20.9188 27.5859 21.665 26.6654 21.665L17.3537 21.665L19.5103 23.8215C20.1612 24.4724 20.1612 25.5277 19.5103 26.1786C18.8594 26.8295 17.8041 26.8295 17.1532 26.1786L12.2982 21.3235C12.2702 21.2955 12.2433 21.2669 12.2174 21.2376C11.8784 20.9325 11.6652 20.4903 11.6652 19.9983C11.6652 19.4992 11.8845 19.0513 12.2321 18.7459C12.2534 18.7223 12.2754 18.6991 12.2982 18.6763L17.1532 13.8213C17.8041 13.1704 18.8594 13.1704 19.5103 13.8213C20.1612 14.4722 20.1612 15.5275 19.5103 16.1784L17.3571 18.3316L26.6654 18.3316C27.5859 18.3316 28.3321 19.0778 28.3321 19.9983Z"
            />
          </g>
        </svg>
      </div>

      <div className="navigation-logo">
        <img src={plinkoLogo} alt="Game logo" />
      </div>

      <div className="navigation-menu" onClick={openDialogSettings}>
        <img src={burgerIcon} alt="Burger menu" />
      </div>
    </div>
  )
}

export default Navigation
