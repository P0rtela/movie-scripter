import { FormEvent, useEffect, useRef, useState } from 'react'
// import { Slugline, Action, Character, Parentherical, Dialog, Transition, SubHeaders } from './ScriptTags'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faFaceSmile, faComment, faCircleRight, faChartBar } from '@fortawesome/free-regular-svg-icons'
import { faPersonRunning, faBold, faUnderline } from '@fortawesome/free-solid-svg-icons'

const ScriptEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const scriptChangeRef = useRef(null)

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
    if (false){setCheckCaret(0)}
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
        if (classs !== undefined){
          element?.classList.remove(classs)
        }
        editorRef.current?.focus()
        element?.classList.add(type)
      }
    }
  }

  function updateDocument(event: FormEvent<HTMLDivElement>): void {
    throw new Error('Function not implemented.' + event)
  }

  // const updateDocument = (event) => {

  // }

  return (
    <>
      <div className='script-editor-container'>
        <div className='script-context-menu'>
          <div className='script-change' ref={scriptChangeRef}>
            <div className='script-text-change'>
              <button className='script-line-button script-text-change nt-select hover-pointer' id='text-bold'><FontAwesomeIcon icon={faBold} /></button>
              <button className='script-line-button script-text-change nt-select hover-pointer' id='text-underline'><FontAwesomeIcon icon={faUnderline} /></button>
            </div>
            <div className='script-tag-change'>
              <button onClick={() => editLineType('slugline')} className='script-line-button script-tag-change nt-select hover-pointer' id='line-slugline'><FontAwesomeIcon icon={faBuilding} /></button>
              <button onClick={() => editLineType('action')} className='script-line-button script-tag-change nt-select hover-pointer' id='line-action'><FontAwesomeIcon icon={faPersonRunning} /></button>
              <button onClick={() => editLineType('character')} className='script-line-button script-tag-change nt-select hover-pointer' id='line-character' ><FontAwesomeIcon icon={faFaceSmile} /></button>
              <button onClick={() => editLineType('dialog')} className='script-line-button script-tag-change nt-select hover-pointer' id='line-dialog'><FontAwesomeIcon icon={faComment} /></button>
              <button onClick={() => editLineType('parentherical')} className='script-line-button script-tag-change nt-select hover-pointer' id='line-parentherical'></button>
              <button onClick={() => editLineType('transition')} className='script-line-button script-tag-change nt-select hover-pointer' id='line-transition'><FontAwesomeIcon icon={faCircleRight} /></button>
              <button onClick={() => editLineType('subheaders')} className='script-line-button script-tag-change nt-select hover-pointer' id='line-subheaders'><FontAwesomeIcon icon={faChartBar} /></button>
            </div>
          </div>
        </div>
        <div onInput={updateDocument} contentEditable="true" datatype='script' className='script-editor se-min-desktop' ref={editorRef}>
          <div className='slugline'>
            <div className='script-slugline-number' contentEditable="false">1</div>
            INT. CORREDOR
          </div>
          <div className='action'>
            CÂMERA GARI: porta do banheiro fechada com SOM DE DESCARGA abafado seguido por SOM DE TORNEIRA. O dia está nublado.
          </div>
          <div className='character'>Humberto</div>
          <div className='parentherical'>(sério e ríspido)</div>
          <div className='dialog'>A torneira... Você fechou a torneira?</div>
          <div className='transition'>CUT TO:</div>
          <div className='subheaders'>CUT TO:</div>
        </div>
      </div>
    </>
  )
}

export default ScriptEditor
