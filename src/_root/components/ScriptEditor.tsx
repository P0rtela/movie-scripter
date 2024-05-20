import { FormEvent, useEffect, useRef, useState } from 'react'

const ScriptEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const scriptChangeRef = useRef(null)
  let change = ""

  // useEffect(() => {
  //   setTextButtons(
  //     {
  //       'bold': document.getElementById('text-bold'),
  //       'underline': document.getElementById('text-underline'),
  //     })
  // }, [])


  // const editingScritp = (event) => { // roda quando o texto é mudado
  //   const currentElement = event.target
  //   console.log("Elemento atual: ", currentElement)
  // }

  const [checkCaret, setCheckCaret] = useState(0)
  useEffect(() => {
    if (false) { setCheckCaret(0) }
    if (window.getSelection()?.type === 'Caret') {
      const caretLineType = (window.getSelection()?.getRangeAt(0)?.startContainer.parentElement?.classList[0])
      const lineButtons = {
        'slugline': document.getElementById('line-slugline'),
        'action': document.getElementById('line-action'),
        'character': document.getElementById('line-character'),
        'parentherical': document.getElementById('line-parentherical'),
        'dialog': document.getElementById('line-dialog'),
        'transition': document.getElementById('line-transition'),
        'subheaders': document.getElementById('line-subheaders')
      }

      if (lineButtons !== null) {
        if (lineButtons.slugline !== null) {
          lineButtons.slugline.classList.remove('current-line-type')
        }
        if (lineButtons.action !== null) {
          lineButtons.action.classList.remove('current-line-type')
        }
        if (lineButtons.character !== null) {
          lineButtons.character.classList.remove('current-line-type')
        }
        if (lineButtons.parentherical !== null) {
          lineButtons.parentherical.classList.remove('current-line-type')
        }
        if (lineButtons.dialog !== null) {
          lineButtons.dialog.classList.remove('current-line-type')
        }
        if (lineButtons.transition !== null) {
          lineButtons.transition.classList.remove('current-line-type')
        }
        if (lineButtons.subheaders !== null) {
          lineButtons.subheaders.classList.remove('current-line-type')
        }
      }

      if (caretLineType !== undefined) {
        (lineButtons as any)[caretLineType]?.classList.add('current-line-type')
      }
    }
    // const intervalId = setInterval(() => {
    //   setCheckCaret(checkCaret + 1)
    // }, [25]);
  }, [checkCaret])

  function editLineType(type: string) {
    if (window.getSelection()?.type === 'Caret') {
      editorRef.current?.focus()
      const element = window.getSelection()?.getRangeAt(0)?.startContainer.parentElement
      editorRef.current?.focus()
      if (element?.classList.contains("script-editor")) {
        const kid = (element.children[element.children.length - 1])
        editorRef.current?.focus()
        const classs = (kid.classList[0])
        editorRef.current?.focus()
        kid.classList.remove(classs)
        editorRef.current?.focus()
        kid.classList.add(type)
      } else {
        const classs = (element?.classList[0])
        editorRef.current?.focus()
        if (classs !== undefined) {
          element?.classList.remove(classs)
        }
        editorRef.current?.focus()
        element?.classList.add(type)
      }
    }
    updateDocument()
  }

  function updateDocument() {
    if (editorRef.current !== null) {
      for (let i = 0; i < editorRef.current?.childElementCount; i++) {
        const element = editorRef.current?.childNodes[i] as Element;
        let type = ""
        let line = ""
        if (element.classList.contains("slugline")) { //&
          const text = element.childNodes[1] as Text
          line = (text.data)
          type = "&"
        }
        if (element.classList.contains("action")) { //!
          line = (element.innerHTML)
          type = "!"
        }
        if (element.classList.contains("character")) { //@
          line = (element.innerHTML)
          type = "@"
        }
        if (element.classList.contains("parentherical")) { //(
          line = (element.innerHTML)
          type = "("
        }
        if (element.classList.contains("dialog")) { //#
          line = (element.innerHTML)
          type = "#"
        }
        if (element.classList.contains("transition")) { //$
          line = (element.innerHTML)
          type = "$"
        }
        if (element.classList.contains("subheaders")) { //*
          line = (element.innerHTML)
          type = "*"
        }
        change += (type + line + "\n")
      }
    }
    console.log(change)
    return (change)
  }

  function exportToPDF(){

  }

  return (
    <>
      <div className='script-editor-container'>
        <div className='script-context-menu'>
          <div className='editor-type'>
            <select className='select-editor-type'>
              <option value="editor">Editor</option>
            </select>
          </div>
          <div className='script-change' ref={scriptChangeRef}>
            <div className='script-text-change'>
              <button className='script-line-button script-text-change nt-select hover-pointer' id='text-bold'>     <img style={{ transform: "scale(.75)" }} className="editor-button" src='editor-buttons/bold.svg' /></button>
              <button className='script-line-button script-text-change nt-select hover-pointer' id='text-underline'><img style={{ transform: "scale(.9)" }} className="editor-button" src='editor-buttons/underline.svg' /></button>
            </div>
            <div className='script-tag-change'>
              <button onClick={() => editLineType('slugline')} className='script-line-button script-tag-change nt-select hover-pointer ' id='line-slugline'>                    <img style={{ transform: "scale(.75)" }} className="editor-button" src="editor-buttons/slugline.svg" /></button>
              <button onClick={() => editLineType('action')} className='script-line-button script-tag-change nt-select hover-pointer' id='line-action'>                         <img style={{ transform: "scale(.9)" }} className="editor-button" src="editor-buttons/action.svg" /></button>
              <button onClick={() => editLineType('character')} className='script-line-button script-tag-change nt-select hover-pointer current-line-type' id='line-character' ><img style={{ transform: "scale(1)" }} className="editor-button" src="editor-buttons/character.svg" /></button>
              <button onClick={() => editLineType('dialog')} className='script-line-button script-tag-change nt-select hover-pointer' id='line-dialog'>                         <img style={{ transform: "scale(1)" }} className="editor-button" src="editor-buttons/dialog.svg" /></button>
              <button onClick={() => editLineType('parentherical')} className='script-line-button script-tag-change nt-select hover-pointer text-center' id='line-parentherical'><span style={{ fontFamily: "Courier Prime", fontWeight: 700, transform: "scale(1.35)", top: ".025em", position: "relative" }}>()</span></button>
              <button onClick={() => editLineType('transition')} className='script-line-button script-tag-change nt-select hover-pointer' id='line-transition'>                 <img style={{ transform: "scale(1)" }} className="editor-button" src="editor-buttons/transition.svg" /></button>
              <button onClick={() => editLineType('subheaders')} className='script-line-button script-tag-change nt-select hover-pointer' id='line-subheaders'>                 <img style={{ transform: "scale(1)" }} className="editor-button" src="editor-buttons/subheader.svg" /></button>
            </div>
          </div>
          <div className='script-status'>
            <p id="script-saved">script saved</p>
            <button id="export-pdf" className='hover-pointer'>Exportar PDF</button>
          </div>
        </div>
        <div onInput={updateDocument} contentEditable="true" datatype='script' className='script-editor se-min-desktop' ref={editorRef}>
          <div className='slugline'>
            <div className='script-slugline-number' contentEditable="false">1</div>
            INT. CORREDOR
          </div>
          <div className='action'>
            WE OPEN on a modern suburban home. The front window illuminated by the lights inside. We see the silhouette of a small human figure as it runs back and forth. We push in closer as we slowly see a BOY running around the house.
          </div>
          <div className='action'>
            CÂMERA GARI: porta do banheiro fechada com SOM DE DESCARGA abafado seguido por SOM DE TORNEIRA. O dia está nublado.
          </div>
          <div className='character'>Humberto</div>
          <div className='parentherical'>(sério e ríspido)</div>
          <div className='dialog'>A torneira... Você fechou a torneira?</div>
          <div className='transition'>CUT TO:</div>
          <div className='subheaders'>SUBLINHA</div>
        </div>
      </div>
    </>
  )
}
{/*
TODO

Slugline, transição, headers ficam sempre em maisculo

ENTER:
- slugline: ação
- transição e subheaders: slugline
- personagem e parentherical: dialogo
- dialogo: ação

TAB:
- ação: personagem
- dialogo: parenteses

SHIFT+TAB:
- qualquer um: ação
- ação: slugline


*/}

export default ScriptEditor
