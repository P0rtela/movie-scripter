import { FormEvent, createElement, useEffect, useRef, useState } from 'react'

// { openMenu }: { openMenu: () => void }, { exportButton }: { exportButton: () => void }
function ScriptEditor({ openMenu, exportButton }: { openMenu: () => void, exportButton: (script: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const scriptChangeRef = useRef(null);
  let change = "";
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    setIsPhone(navigator.maxTouchPoints > 0);
    updateResizeView()
    openMenu()
  }, []);

  const [checkCaret, setCheckCaret] = useState(0);
  useEffect(() => {
    if (false) { setCheckCaret(0); }
    if (window.getSelection()?.type === 'Caret') {
      const caretLineType = (window.getSelection()?.getRangeAt(0)?.startContainer.parentElement?.classList[0]);
      const lineButtons = {
        'slugline': document.getElementById('line-slugline'),
        'action': document.getElementById('line-action'),
        'character': document.getElementById('line-character'),
        'parentherical': document.getElementById('line-parentherical'),
        'dialog': document.getElementById('line-dialog'),
        'transition': document.getElementById('line-transition'),
        'subheaders': document.getElementById('line-subheaders')
      };

      if (lineButtons !== null) {
        if (lineButtons.slugline !== null) {
          lineButtons.slugline.classList.remove('current-line-type');
        }
        if (lineButtons.action !== null) {
          lineButtons.action.classList.remove('current-line-type');
        }
        if (lineButtons.character !== null) {
          lineButtons.character.classList.remove('current-line-type');
        }
        if (lineButtons.parentherical !== null) {
          lineButtons.parentherical.classList.remove('current-line-type');
        }
        if (lineButtons.dialog !== null) {
          lineButtons.dialog.classList.remove('current-line-type');
        }
        if (lineButtons.transition !== null) {
          lineButtons.transition.classList.remove('current-line-type');
        }
        if (lineButtons.subheaders !== null) {
          lineButtons.subheaders.classList.remove('current-line-type');
        }
      }

      if (caretLineType !== undefined) {
        (lineButtons as any)[caretLineType]?.classList.add('current-line-type');
      }
    }
    // UPDATE 
    // const intervalId = setInterval(() => {
    //   setCheckCaret(checkCaret + 1)
    // }, [25]);
  }, [checkCaret]);

  function editLineType(type: string) {
    if (window.getSelection()?.type === 'Caret') {
      editorRef.current?.focus();
      let element = window.getSelection()?.getRangeAt(0)?.startContainer.parentElement;
      editorRef.current?.focus();
      if (element?.classList.contains("script-editor-container")) {
        element = editorRef.current
      }
      editorRef.current?.focus();
      if (element?.classList.contains("script-editor")) {
        const kid = (element.children[element.children.length - 1]);
        editorRef.current?.focus();
        const classs = (kid.classList[0]);
        editorRef.current?.focus();
        kid.classList.remove(classs);
        editorRef.current?.focus();
        kid.classList.add(type);
      } else {
        // quando está na linha certa
        const classs = (element?.classList[0]);
        editorRef.current?.focus();
        if (classs !== undefined) {
          element?.classList.remove(classs);
        }
        editorRef.current?.focus();
        element?.classList.add(type);
      }
    }
    updateDocument();
  }

  function updateDocument() {
    change = "";
    if (editorRef.current !== null) {
      if (editorRef.current.childNodes[0].nodeName != "DIV") {
        const content = (editorRef.current.innerHTML)
        editorRef.current.innerHTML = `<div class="slugline">${content}</div>`
        editorRef.current.focus();
      }
      for (let i = 0; i < editorRef.current?.childElementCount; i++) {
        const element = editorRef.current?.childNodes[i] as Element;
        let type = "";
        let line = "";
        if (element.classList.contains("slugline")) { //&
          line = (element.innerHTML);
          line = line.toUpperCase();
          type = "&";
        }
        if (element.classList.contains("action")) { //!
          line = (element.innerHTML);
          type = "!";
        }
        if (element.classList.contains("character")) { //@
          line = (element.innerHTML);
          type = "@";
        }
        if (element.classList.contains("parentherical")) { //(
          line = (element.innerHTML);
          type = "(";
        }
        if (element.classList.contains("dialog")) { //#
          line = (element.innerHTML);
          type = "#";
        }
        if (element.classList.contains("transition")) { //$
          line = (element.innerHTML);
          line = line.toUpperCase();
          type = "$";
        }
        if (element.classList.contains("subheaders")) { //*
          line = (element.innerHTML);
          line = line.toUpperCase();
          type = "*";
        }
        change += (type + line + "\n");
      }
    }
    change = change.replace(/<br>/g, "");
    change = change.replace(/<BR>/g, "");
    change = change.replace(/&NBSP/g, " ");
    change = change.replace(/&nbsp/g, " ");
    // console.log(change);
    updateSLuglineVisualCount()
    return (change);
  }

  window.addEventListener("resize", updateResizeView);

  function updateResizeView() {
    updateSLuglineVisualCount()
  }
  function updateSLuglineVisualCount() {
    const ref = document.querySelectorAll('.slugline')
    const parent = document.getElementById("slugCount")
    if (parent === null) { return }
    parent.innerHTML = ``
    let count = 0
    ref.forEach((e) => {
      count += 1
      const newDiv = document.createElement("div");
      const newContent = document.createTextNode(`${count}`);
      newDiv.appendChild(newContent);
      newDiv.classList.add("slugline-number");
      parent.appendChild(newDiv);
      newDiv.style.top = `${(e as HTMLElement).offsetTop}px`
      newDiv.style.left = `${(e as HTMLElement).offsetLeft - (document.querySelectorAll('.script-editor-container')[0] as HTMLElement).offsetLeft
        }px`
    })
  }

  const KeyUP = async (e: React.KeyboardEvent<HTMLDivElement>) => {

    let element = window.getSelection()?.getRangeAt(0)?.startContainer.parentElement as HTMLInputElement | HTMLTextAreaElement;
    const classs = (element?.classList[0]);
    const pa = e.target as unknown as HTMLElement
    let fore = null
    let next = null

    for (let i = 0; i < pa.childNodes.length; i++) {
      if (pa.childNodes[i] == element && pa.childNodes[i - 1]) {
        fore = (pa.childNodes[i - 1] as HTMLElement).classList[0]
      }
      if (pa.childNodes[i] == element && pa.childNodes[i + 1]) {
        next = (pa.childNodes[i + 1] as HTMLElement).classList[0]
      }
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      console.log('Tab pressionado');
      // console.log(fore);
      // console.log(classs);
      // console.log(next);
      if (e.shiftKey) {
        if (fore !== null) {
          switch (classs) {
            case "action":
              editLineType("slugline");
              break;
            case "parentherical":
              if (fore == "character") {
                editLineType("dialog");
              } else {
                editLineType("action");
              }
              break;
            case "character":
              if (fore == "character") {
                if (next == "dialog") {
                  editLineType("parentherical");
                } else {
                  editLineType("dialog");
                }
              } else {
                editLineType("action");
              }
              break;
            default:
              editLineType("action");
              break;
          }
        }
      } else {
        switch (classs) {
          case "action":
            editLineType("character");
            if (fore == "character" || fore == "parentherical") {
              editLineType("dialog");
            }
            break;
          case "dialog":
            if (fore == "character") {
              editLineType("parentherical");
            }
            break;
          case "slugline":
            const autoCompleteInput = element?.innerHTML.toUpperCase()
            let autoCompleted = false
            if (autoCompleteInput && element?.innerHTML) {
              if ("INT. ".includes(autoCompleteInput)) {
                element.classList.toggle("autoCompleteTarget")
                document.querySelectorAll('.autoCompleteTarget')[0].innerHTML = "INT.&nbsp;"
                element.classList.toggle("autoCompleteTarget")
                autoCompleted = true
              }
              if ("EXT. ".includes(autoCompleteInput)) {
                element.classList.toggle("autoCompleteTarget")
                document.querySelectorAll('.autoCompleteTarget')[0].innerHTML = "EXT.&nbsp;"
                element.classList.toggle("autoCompleteTarget")
                autoCompleted = true
              }
              if(element.parentElement && autoCompleted){
                const childList = Array.from(element.parentElement.childNodes);
                console.log(childList.indexOf(element))
                moveCursorRight(pa, childList.indexOf(element))
              }
            }
            if (!autoCompleted) {
              editLineType("action");
            }
            break;
        }
      }
    }

    if (e.key === 'Enter') {
      console.log('Enter pressionado');
      // const newLine = editorRef.current.value.substring(editorRef.current.selectionStart);
      const newLine = await createNextElement() as HTMLElement;
      console.log(classs);
      const newClasss = (newLine.classList[0]);
      if (newClasss == "slugline") {
        newLine.classList.toggle("slugline")
        updateSLuglineVisualCount()
        newLine.classList.toggle("action")
      }
      if (newClasss == "trasition") {
        newLine.classList.toggle("trasition")
        newLine.classList.toggle("slugline")
        updateSLuglineVisualCount()
      }
      if (newClasss == "subheaders") {
        newLine.classList.toggle("subheaders")
        newLine.classList.toggle("slugline")
        updateSLuglineVisualCount()
      }
      if (newClasss == "parentherical") {
        newLine.classList.toggle("parentherical")
        newLine.classList.toggle("dialog")
      }
      if (newClasss == "character") {
        newLine.classList.toggle("character")
        newLine.classList.toggle("dialog")
      }
      if (newClasss == "dialog") {
        newLine.classList.toggle("dialog")
        newLine.classList.toggle("action")
      }
    }
  };

  const moveCursorRight = (pa: any, index: any) => {
    var el = pa
    var range = document.createRange()
    var sel = window.getSelection()
    
    range.setStart(el.childNodes[index], 1)
    range.collapse(true)
    if (sel === null) return
    sel.removeAllRanges()
    sel.addRange(range)
  };

  const createNextElement = () => {
    let element = window.getSelection()?.getRangeAt(0)?.startContainer.parentElement;
    return new Promise((resolve) => {
      setTimeout(() => {
        const newLine = element?.nextElementSibling;
        resolve(newLine as HTMLElement);
      }, 1); // Aguarda 1 segundo antes de resolver a promessa
    });
  };

  return (
    <>
      <div className='script-editor-container'>
        <div id="slugCount"></div>
        <div className='script-context-menu phone-not-writing'>{/* phone-is-writing */}
          <div className='editor-type'>
            {isPhone ?
              <img onClick={() => { openMenu(); updateSLuglineVisualCount() }} style={{ transform: "scale(.75)", width: "2em", marginLeft: "14px" }} className="editor-button" src="editor-buttons/bars.svg" />
              :
              <select className='select-editor-type'>
                <option value="editor">Editor</option>
              </select>}
          </div>
          <div className='script-change' ref={scriptChangeRef}>
            <div className='script-text-change'>
              <button className='script-line-button script-text-change nt-select hover-pointer' id='text-bold'>     <img style={{ transform: "scale(.75)" }} className="editor-button" src='editor-buttons/bold.svg' /></button>
              <button className='script-line-button script-text-change nt-select hover-pointer' id='text-underline'><img style={{ transform: "scale(.9)" }} className="editor-button" src='editor-buttons/underline.svg' /></button>
            </div>
            <div className='script-tag-change'>
              <button onClick={() => editLineType('slugline')} className='script-line-button script-tag-change nt-select hover-pointer ' id='line-slugline'>                    <img style={{ transform: "scale(.75)" }} className="editor-button" src="editor-buttons/slugline.svg" /></button>
              <button onClick={() => editLineType('action')} className='script-line-button script-tag-change nt-select hover-pointer' id='line-action'>                         <img style={{ transform: "scale(.9)" }} className="editor-button" src="editor-buttons/action.svg" /></button>
              <button onClick={() => editLineType('character')} className='script-line-button script-tag-change nt-select hover-pointer current-line-type' id='line-character'><img style={{ transform: "scale(1)" }} className="editor-button" src="editor-buttons/character.svg" /></button>
              <button onClick={() => editLineType('dialog')} className='script-line-button script-tag-change nt-select hover-pointer' id='line-dialog'>                         <img style={{ transform: "scale(1)" }} className="editor-button" src="editor-buttons/dialog.svg" /></button>
              <button onClick={() => editLineType('parentherical')} className='script-line-button script-tag-change nt-select hover-pointer text-center' id='line-parentherical'><span style={{ fontFamily: "Courier Prime", fontWeight: 700, transform: "scale(1.35)", top: ".025em", position: "relative" }}>()</span></button>
              <button onClick={() => editLineType('transition')} className='script-line-button script-tag-change nt-select hover-pointer' id='line-transition'>                 <img style={{ transform: "scale(1)" }} className="editor-button" src="editor-buttons/transition.svg" /></button>
              <button onClick={() => editLineType('subheaders')} className='script-line-button script-tag-change nt-select hover-pointer' id='line-subheaders'>                 <img style={{ transform: "scale(1)" }} className="editor-button" src="editor-buttons/subheader.svg" /></button>
            </div>
          </div>
          <div className='script-status'>
            <p id="script-saved">script saved</p>
            <button id="export-pdf" className='hover-pointer' onClick={() => exportButton(change)}>Exportar</button>
          </div>
        </div>
        <div onKeyDown={KeyUP} onInput={updateDocument} contentEditable="true" datatype='script' className='script-editor se-min-desktop' ref={editorRef}>
          <div className='slugline'>
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
  );
}
{/*
//TODO

Bugs que não sei corrigir:
- quando dá enter e troca a formatação da linha, ele troca a da última

Google:
- quando abrir o projeto, change tem que ser atualizado imediatamente

Info também ser atualizada quando o projeto for exportado

*/}

export default ScriptEditor
