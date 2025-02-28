import '../../../assets/styles/Settings/SettingsItem.scss'

function SettingsItem({ title, icon, children }) {
  return (
    <>
      <div className="settings-item">
        <div className="settings-spoiler-text">
          <img src={icon} alt="Rules icon" />
          <span>{title}</span>
        </div>
      </div>
      <div>
        {children}
      </div>
    </>
  )
}

export default SettingsItem
