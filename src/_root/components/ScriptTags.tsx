import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faFaceSmile, faComment, faCircleRight, faChartBar } from '@fortawesome/free-regular-svg-icons'
import { faPersonRunning, faBold, faUnderline } from '@fortawesome/free-solid-svg-icons'

// export const Slugline = (props) => { // faBuilding
//     return (
//         <>
//             <div className='script-slugline'>
//                 <div className='script-slugline-number'>1</div>
//                 <div>{props.children}</div>
//             </div>
//         </>
//     )
// }
// export const Action = (props) => { //faPersonRunning
//     return (
//         <div className='action'>{props.children}</div>
//     )
// }

// export const Character = (props) => { // faFaceSmile
//     return (
//         <div className='character'>{props.children}</div>
//     )
// }

// export const Parentherical = (props) => { // ()
//     return (
//         <div className='parentherical'>{props.children}</div>
//     )
// }

// export const Dialog = (props) => { // faComment
//     return (
//         <div className='dialog'>{props.children}</div>
//     )
// }

// export const Transition = (props) => { // faCircleRight
//     return (
//         <div className='transition'>{props.children}</div>
//     )
// }

// export const SubHeaders = (props) => { // faChartBar
//     return (
//         <div className='subheaders'>{props.children}</div>
//     )
// }

export const LineButton = (props) => {
    const type = props.type

    const icons = {
        'bold': <FontAwesomeIcon icon={faBold}/>,
        'underline': <FontAwesomeIcon icon={faUnderline}/>,
        'slugline': <FontAwesomeIcon icon={faBuilding}/>,
        'action': <FontAwesomeIcon icon={faPersonRunning}/>,
        'character': <FontAwesomeIcon icon={faFaceSmile}/>,
        'parentherical': <b style={{fontSize: '1.15em'}}>(<span style={{fontSize: '0.4em'}}> </span>)</b>,
        'dialog': <FontAwesomeIcon icon={faComment}/>,
        'transition': <FontAwesomeIcon icon={faCircleRight}/>,
        'subheaders': <FontAwesomeIcon icon={faChartBar}/>
    }
    return (
        <div className='script-line-button nt-select hover-pointer'>
            {icons[type]}
        </div>
    )
}