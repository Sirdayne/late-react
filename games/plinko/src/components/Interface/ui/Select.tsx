import '../../../assets/styles/ui/Select.scss'
import { useEffect, useRef, useState } from 'react'
import dropdownIcon from '../../../assets/img/dropdown.svg'
import dropdownUpIcon from '../../../assets/img/dropdownUp.svg'

function Select({ onChange, value, values, disabled = false }) {
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
    <div className="select" onClick={openDropdown} ref={dropdownRef}>
      <div
        className={disabled ? 'select-header select-header-disabled' : isOpen ? 'select-header select-header-active' : 'select-header'}>
        {value.label}
        <div className="select-icon">
          {isOpen ? <img src={dropdownUpIcon} alt="Dropdown icon" /> : <img src={dropdownIcon} alt="Dropdown icon" />}
        </div>
      </div>
      {isOpen && (
        <ul className={dropdownDirectionUp ? 'select-list select-list_bottom' : 'select-list' }>
          {values.map(option => (
            <li
              key={option.value.toString()}
              className={value.value === option.value ? 'select-item select-item-active' : 'select-item'}
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

export default Select
