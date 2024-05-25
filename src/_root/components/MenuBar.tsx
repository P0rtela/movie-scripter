import './MenuBar.css'

function MenuBar({ openMenu }: { openMenu: () => void }) {
  return (
    <>
      <div className="menu-bar">
        <div id="user-bar">
          <p id="project-name"> <img id='project-logo' src="icons/movie-scripter-logo-white.svg" /> <span>Movie Scripter</span> {navigator.maxTouchPoints > 0? <img id="close-bar" onClick={() => openMenu()} className="editor-button" src="editor-buttons/xmark.svg" /> : <img id="close-bar" onClick={() => openMenu()} style={{cursor: 'default', opacity: '0'}} className="editor-button" src="editor-buttons/xmark.svg" />}</p>
          <p id="user-name">Lucas Portela Lobo Pessoa de Mendonça</p>
        </div>
        <p id="script-gap">Roteiros</p>
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
            <p className='script-name'>Dama Fatal Dama Fatal Dama Fatal Dama Fatal</p>
            <img className="script-delete" onClick={() => openMenu()} src="editor-buttons/trash-can.svg" />
          </div>
        </div>
      </div>
    </>
  )
}

export default MenuBar