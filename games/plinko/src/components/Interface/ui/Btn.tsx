import '../../../assets/styles/ui/Btn.scss'
import { ReactNode } from 'react'
import spinner from '../../../assets/img/spinner.png'

type ButtonProps = {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

function Btn({ className = '', disabled = false, children, onClick, loading = false }: ButtonProps) {

  const clickBtn = () => {
    if (!loading) {
      onClick()
    }
  }

  return (
    <button
      onClick={clickBtn}
      disabled={disabled}
      className={`btn ${className}`}
    >
      {loading ? <div className="btn-loading">
        <img src={spinner} alt="Spinner" />
      </div>:
        children
      }
    </button>
  )
}

export default Btn
