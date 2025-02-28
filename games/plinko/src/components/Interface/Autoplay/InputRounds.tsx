import '../../../assets/styles/ui/Input.scss'

function InputRounds({ disabled = false, inputRounds, setInputRounds, invalid, maxRounds}) {
  const displayValue = inputRounds === 'Infinity' || inputRounds === Infinity ? '∞' : inputRounds;

  const handleChange = (value) => {
    const numValue = value.replace(/[^0-9]/g, "")
    setInputRounds(numValue)
  }

  const onBlur = () => {
    if (inputRounds > maxRounds) {
      setInputRounds(Infinity)
    } else {
      setInputRounds(Number(inputRounds))
    }
  }

  return (
    <div className={invalid ? 'input input-invalid' : 'input'}>
      <input disabled={disabled}
             value={displayValue}
             onChange={e => handleChange(e.target.value)}
             onBlur={onBlur}
             type="text"
             inputMode="decimal"
             pattern="[0-9]*\.?[0-9]*"
      />
    </div>
  )
}

export default InputRounds
