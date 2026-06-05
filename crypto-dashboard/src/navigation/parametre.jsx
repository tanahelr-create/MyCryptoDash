import { useState } from "react";


function Parametres({theme, setTheme}) {

  
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('fr');
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-titre">Paramètres</h1>
        <p className="page-subtit">Personnalisez votre expérience</p>
      </div>
{/* apparence */}
      <div className="panel">
        <div className="panel-titre">Thème</div>
        <div className="setting-item">
          <div className="setting-label">
            <span className="setting-name">Thème</span>
            <span className="setting-desc">Couleur du Dashboard</span>
          </div>
          <div className="setting-options">
            {['cyberpunk', 'blue', 'marron'].map((t) => (
              <button
                key={t}
                className={`theme-btn ${theme === t ? 'active' : ''}`}
                onClick={() => setTheme(t)}
              >
                {t}
              </button>
            ))}
            </div>
      </div>
      <div className="setting-item">
          <div className="setting-label">
            <span className="setting-name">Langue</span>
            <span className="setting-desc">Langue de l'interface</span>
      </div>
      <select className="setting-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
      </div>
      {/* notif*/}
      <div className="panel">
        <div className="panel-titre">Notifications</div>
        <div className="setting-item">
          <div className="setting-label">
            <span className="setting-name">Notifications</span>
            <span className="setting-desc">Activer ou désactiver les notifications</span>
          </div>
          <div className={`toggle ${notifications ? 'on' : ''}`} onClick={() => setNotifications(!notifications)}>
            <div className="toggle-dot"></div>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
}

export default Parametres;