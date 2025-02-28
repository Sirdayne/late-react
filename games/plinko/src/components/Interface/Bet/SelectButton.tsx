import '../../../assets/styles/Bet/SelectButton.scss'
import { useEffect, useRef, useState } from 'react'

function SelectButton({ onChange, value, values, disabled = false, label }) {
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
    <div className="select-button-container" onClick={openDropdown} ref={dropdownRef}>

      <div className={`select-button ${isOpen ? 'select-button-active' : ''} ${disabled ? 'select-button-disabled' : ''}`}>
        <span className="select-button-label">{label}</span>
        <span className="select-button-value">{value.label}</span>
      </div>

      {isOpen && (
        <ul className={dropdownDirectionUp ? 'select-button-list select-button-list_bottom' : 'select-button-list'}>
          {values.map(option => (
            <li
              key={option.value.toString()}
              className={value.value === option.value ? 'select-button-item select-button-item-active' : 'select-button-item'}
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

export default SelectButton
