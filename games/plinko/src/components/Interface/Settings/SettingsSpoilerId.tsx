import '../../../assets/styles/Settings/SettingsSpoiler.scss'
import spoilerDown from '../../../assets/img/spoilerDown.svg'
import spoilerUp from '../../../assets/img/spoilerUp.svg'

function SettingsSpoilerId({ title, icon, id, openedId, setOpenedId, children }) {
  return (
    <>
      <div
        className={openedId === id ? 'settings-spoiler settings-spoiler-active' : 'settings-spoiler'}
        onClick={() => (openedId === id ? setOpenedId(0) : setOpenedId(id))}
      >
        <div className="settings-spoiler-text">
          {icon && <img src={icon} alt="Rules icon" />}
          <span>{title}</span>
        </div>
        {openedId === id ? <img src={spoilerUp} alt="Spoiler icon" /> : <img src={spoilerDown} alt="Spoiler icon" />}
      </div>
      {openedId === id && <div>{children}</div>}
    </>
  )
}

export default SettingsSpoilerId
