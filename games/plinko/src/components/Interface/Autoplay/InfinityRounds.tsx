import '../../../assets/styles/Autoplay/InfinityBet.scss'

function InfinityRounds({ value = false, onChange, disabled = false }) {

  const handleChange = () => {
    const newState = !value
    onChange(newState)
  }

  return (
    <button disabled={disabled} onClick={handleChange}
            className={value ? 'infinity-rounds infinity-rounds-active' : 'infinity-rounds'}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Icon_M">
          <path id="Vector" fillRule="evenodd" clipRule="evenodd"
                d="M9.61427 12.5219C9.98309 12.9085 9.98306 13.5167 9.61419 13.9032L9.29131 14.2415C6.56511 17.1005 1.83301 15.0977 1.83301 11.0004C1.83301 6.9038 6.56511 4.90017 9.29131 7.75832L14.091 12.7912C15.5862 14.3601 18.2106 13.2785 18.2106 11.0004C18.2106 8.72396 15.5871 7.64001 14.0902 9.20875L13.8324 9.47891C13.4381 9.89205 12.7786 9.89192 12.3845 9.47862C12.0159 9.09209 12.0159 8.48423 12.3845 8.0977L12.708 7.7584C15.4351 4.89855 20.1663 6.90639 20.1663 11.0004C20.1663 15.097 15.4342 17.1006 12.708 14.2425L7.90831 9.20959C6.41314 7.64074 3.78875 8.72226 3.78875 11.0004C3.78875 13.2785 6.4131 14.3608 7.90912 12.792L8.16647 12.5222C8.56055 12.1089 9.22006 12.1088 9.61427 12.5219Z"
                fill="currentColor" />
        </g>
      </svg>
    </button>
  )
}

export default InfinityRounds
