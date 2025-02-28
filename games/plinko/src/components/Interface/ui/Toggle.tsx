import '../../../assets/styles/ui/Toggle.scss'

function Toggle ({ value = false, onChange }) {
  const handleToggle = () => {
    const newState = !value
    onChange(newState)
  }

  return (
    <div onClick={handleToggle} className={`toggle ${value ? 'toggle-active' : ''}`}>
      <div
        className={`toggle-button ${value ? 'toggle-on' : ''}`}
      ></div>
    </div>
  )
}

export default Toggle
