import { MenuBar, ScriptEditor } from "./components";
import ExportPDF, { ViewPDF } from "./components/ExportPDF";
import './components/components.css'

function RootLayout() {
  // const { t } = useTranslation();
  //localStorage.setItem("language", "en")
        const texto = `&INT. CORREDOR`
        const info = {
          title: "Movie Scripter",
          author: "Lucas Portela",
          date: "DD/MM/YYYY",
        }
  return (
    <>
      <div id="main">
        {/* <MenuBar />
        <ScriptEditor />
        <div style={{ backgroundColor: 'var(--primary10)' }}></div> */}
        <ExportPDF info= text={texto}></ExportPDF>
        <ViewPDF text={texto}></ViewPDF>
      </div>
    </>
  )
}

export default RootLayout
