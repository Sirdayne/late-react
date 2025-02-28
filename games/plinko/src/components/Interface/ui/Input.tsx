import '../../../assets/styles/ui/Input.scss'

function Input({ disabled = false, value, onChange, invalid, onBlur, pattern, inputMode, type = 'text' }) {
  return (
    <div className={invalid ? 'input input-invalid' : 'input'}>
      <input className="input-ref" disabled={disabled} onBlur={onBlur} value={value}
             onChange={e => onChange(e.target.value)}
             inputMode={inputMode} type={type} pattern={pattern} />
    </div>
  )
}

export default Input
