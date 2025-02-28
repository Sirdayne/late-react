import '../../../assets/styles/Bet/SelectRows.scss'
import { useEffect, useRef, useState } from 'react'

function SelectRows({ onChange, value, values, disabled = false, label }) {
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
    <div className="select-rows-container" onClick={openDropdown} ref={dropdownRef}>

      <div className={`select-rows ${isOpen ? 'select-rows-active' : ''} ${disabled ? 'select-rows-disabled' : ''}`}>
        <span className="select-rows-label">{label}</span>
        <span className="select-rows-value">{value.label}</span>
      </div>

      {isOpen && (
        <ul className={dropdownDirectionUp ? 'select-rows-list select-rows-list_bottom' : 'select-rows-list'}>
          {values.map(option => (
            <li
              key={option.value.toString()}
              className={value.value === option.value ? 'select-rows-item select-rows-item-active' : 'select-rows-item'}
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

export default SelectRows
