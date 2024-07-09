import './MenuBar.css'
import { useTranslation } from "react-i18next";

function MenuBar({ openMenu }: { openMenu: () => void }) {
  const { t } = useTranslation();
  function toogleSettingsMenu() {
    document.getElementById("menu-bar")?.classList.toggle("open-settings")
    document.getElementById("menu-bar")?.classList.toggle("closed-settings")
  }

  return (
    <>
      <div id='menu-bar' className="menu-bar closed-settings">
        <div id="user-bar">
          <p id="project-name"> <img id='project-logo' src="icons/movie-scripter-logo-white.svg" /> <span>Movie Scripter</span> {window.innerWidth < 1200 ? <img id="close-bar" onClick={() => openMenu()} className="editor-button" src="editor-buttons/xmark.svg" /> : <img id="close-bar" onClick={() => openMenu()} style={{ cursor: 'default', opacity: '0' }} className="editor-button" src="editor-buttons/xmark.svg" />}</p>
          <p id="user-name">Lucas Portela Lobo Pessoa de Mendonça</p>
        </div>
        <p id="script-gap">{t('menu.script-title-label')}</p>
        <div id="script-list">
          <div className='script-item hover-pointer'>
            <p className='script-name'>Torneira</p>
            <img className="script-delete" onClick={() => openMenu()} src="editor-buttons/trash-can.svg" />
          </div>
          <div className='script-item hover-pointer'>
            <p className='script-name'>A Rata</p>
            <img className="script-delete" onClick={() => openMenu()} src="editor-buttons/trash-can.svg" />
          </div>
          <div className='script-item hover-pointer'>
            <p className='script-name'>Dama Fatal</p>
            <img className="script-delete" onClick={() => openMenu()} src="editor-buttons/trash-can.svg" />
          </div>
          <div className='script-item hover-pointer'>
            <p className='script-name'>A Fuga</p>
            <img className="script-delete" onClick={() => openMenu()} src="editor-buttons/trash-can.svg" />
          </div>
          <div className='new-script hover-pointer'>New<span>+</span></div>
        </div>
        <footer>
          <div id="settings-top" className='hover-pointer n-text-select' onClick={toogleSettingsMenu}>
            <p>{t('menu.settings.title')}</p>
            <img id="settings-button" src="editor-buttons/gear.svg" alt="" />
          </div>
          <div id="settings-content">
            <label htmlFor="authorNameChangeInput">{t('menu.settings.author-name')}:</label>
            <input onChange={(e) => { localStorage.setItem("authorName", e.target.value) }} name='authorNameChangeInput' id="authorNameChangeInput" type="text" defaultValue={localStorage.getItem("authorName") as string} />
            <label>{t('menu.settings.language')}</label>
            <select onChange={(e) => { localStorage.setItem("language", e.target.value); location.reload() }} defaultValue={localStorage.getItem("language") as string}>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
            <button className='hover-pointer n-text-select' onClick={toogleSettingsMenu}>{t('menu.settings.save-settings')}</button>
          </div>
        </footer>
      </div>
    </>
  )
}

export default MenuBar