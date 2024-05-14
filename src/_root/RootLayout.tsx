import { useTranslation } from "react-i18next";
import { MenuBar, ScriptEditor } from "./components";
import './components/components.css'

function RootLayout() {
  const { t } = useTranslation();
  //localStorage.setItem("language", "en")
  return (
    <>
      <div id="main">
        <MenuBar />
        <ScriptEditor />
        <div style={{ backgroundColor: 'var(--primary10)' }}></div>
      </div>
    </>
  )
}

export default RootLayout
