import '../../../assets/styles/Bet/SelectRisk.scss'
import { useEffect, useRef, useState } from 'react'
import riskLowIcon from '../../../assets/img/riskLow.svg'
import riskMediumIcon from '../../../assets/img/riskMedium.svg'
import riskHighIcon from '../../../assets/img/riskHigh.svg'

function SelectRisk({ onChange, value, values, disabled = false, label }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownDirectionUp, setDropdownDirectionUp] = useState(false)

  const openDropdown = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect()
      const spaceAbove = rect.top
      const spaceBelow = window.innerHeight - rect.bottom

      if (spaceAbove > spaceBelow) {
        setDropdownDirectionUp(true)
      } else {
        setDropdownDirectionUp(false)
      }
    }
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  const handleOptionClick = (option) => {
    onChange(option)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className="select-risk-container" onClick={openDropdown} ref={dropdownRef}>
      <div className={`select-risk ${isOpen ? 'select-risk-active' : ''} ${disabled ? 'select-risk-disabled' : ''}`}>
        <span className="select-risk-label">{label}</span>
        <img className="select-risk-img" src={value.value === 'high' ? riskHighIcon : value.value === 'medium' ? riskMediumIcon : riskLowIcon} alt="Risk icon" />
      </div>

      {isOpen && (
        <ul className={dropdownDirectionUp ? 'select-risk-list select-risk-list_bottom' : 'select-risk-list'}>
          {values.map(option => (
            <li
              key={option.value.toString()}
              className={value.value === option.value ? 'select-risk-item select-risk-item-active' : 'select-risk-item'}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SelectRisk
