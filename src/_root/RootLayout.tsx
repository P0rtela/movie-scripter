import { ComponentType, useRef, useState } from "react";
// oik
import { MenuBar, ScriptEditor } from "./components";
import ExportPDF from "./components/ExportPDF";
import './components/components.css'
let IsMenuOpen = false
function MenuOpen() {
  if (navigator.maxTouchPoints == 0) { return }
  IsMenuOpen = (!IsMenuOpen)
  if (IsMenuOpen) {
    document.getElementById('main')?.classList.remove('closedMenu')
    document.getElementById('main')?.classList.add('openMenu')
  } else {
    document.getElementById('main')?.classList.remove('openMenu')
    document.getElementById('main')?.classList.add('closedMenu')
  }
}

function RootLayout() {

  // const { t } = useTranslation();
  //localStorage.setItem("language", "en")
  const texto = `&INT. CORREDOR`
  const info = {
    title: "Movie Scripter",
    author: "Lucas Portela",
    date: true,
  }


  const ShowExport = (script: string) => {
    const ele = document.getElementById("export-overlay")
    ele?.classList.toggle("export-overlay-hide")
    ele?.classList.toggle("export-overlay-show")
    // console.log(script)
    exportRef.current?.updatePDF(script)
  }

  const exportRef = useRef<React.RefObject<typeof ExportPDF> | null>(null);
  return (
    <>
      <div id="main" className='openMenu'>
        <MenuBar openMenu={MenuOpen} />
        <ScriptEditor openMenu={MenuOpen} exportButton={(script: string) => ShowExport(script)} />
        <div style={{ backgroundColor: 'var(--primary10)' }}></div>
        {/* <ViewPDF text={texto}></ViewPDF> */}
      </div>
      <ExportPDF ref={exportRef} info={info} text={texto}></ExportPDF>
    </>
  )
}

export default RootLayout
