import '../../../assets/styles/Honesty/InputClipboard.scss'
import TooltipClipboard from './TooltipClipboard'
import Input from '../ui/Input'

export function InputClipboard({ disabled = false, type = 'text', value, onChange, invalid, copyLabel}) {
  return (
    <div className="input-clipboard">
      <Input disabled={disabled} value={value} type={type} invalid={invalid} onChange={onChange}></Input>
      <div className="input-clipboard-tooltip">
        <TooltipClipboard copyLabel={copyLabel} copyText={value} />
      </div>
    </div>
  )
}
