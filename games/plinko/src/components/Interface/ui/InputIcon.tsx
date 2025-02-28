import '../../../assets/styles/ui/InputIcon.scss'
import Input from './Input'

export function InputIcon({ disabled = false, type = 'text', value, onChange, invalid, icon }) {
  return (
    <div className="input-icon">
      <Input disabled={disabled} value={value} type={type} invalid={invalid} onChange={onChange}></Input>
      <img className="input-icon-img" src={icon} alt="Input icon" />
    </div>
  )
}
