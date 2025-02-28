import '../../../assets/styles/ui/Button.scss'
import { ReactNode } from 'react'
import spinner from '../../../assets/img/spinner.png'

type ButtonProps = {
  children?: ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
}

function Button({ children, className = '', disabled = false, onClick, isCancel = false, loading = false}: ButtonProps) {

  return (
    <button onClick={onClick} disabled={disabled} className={isCancel ? `button button-cancel ${className}` : loading ? `button button-take ${className}` : `button button-normal ${className}`}>
      {isCancel ?
        <>
          <div className="button-cancel-gradient"></div>
          <div className="button-content">
            {!loading && children}
          </div>
        </>
        : loading ?
          <>
            <div className="button-take-gradient"></div>
            <div className="button-content">
              {!loading && children}
            </div>
          </>
          :
          <>
            <div className="button-gradient"></div>
            <div className="button-gradient-hover"></div>
            <div className="button-content">
              {!loading && children}
            </div>
          </>
      }
      {loading && <div className="button-loading">
        <img src={spinner} alt="Spinner" />
      </div>}
    </button>
  )
}

export default Button
