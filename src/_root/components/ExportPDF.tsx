import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, Font, PDFViewer } from '@react-pdf/renderer'
import { PDFDownloadLink } from '@react-pdf/renderer';

import fontRegular from "./fonts/CourierPrime-Regular.ttf"
import fontBold from "./fonts/CourierPrime-Bold.ttf"
import './export-container.css'
import { useTranslation } from 'react-i18next';

Font.registerHyphenationCallback((word) => {
    // Return entire word as unique part
    return [word]
})

Font.register({
    family: "Courier Prime",
    fonts: [
        {
            src: fontRegular,
            fontWeight: 400
        },
        {
            src: fontBold,
            fontWeight: 700
        }
    ]


})

const styles = StyleSheet.create({
    body: {
        paddingTop: 68,
        paddingBottom: 68,
        paddingRight: 68,
        fontFamily: "Courier Prime",
        fontSize: 12,
    },
    cover: {
        fontFamily: "Courier Prime",
        fontSize: 12,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    },
    slugline1: {
        fontWeight: 700,
        paddingBottom: 8,
        paddingTop: 8,
        paddingLeft: 80.4,
    },
    slugline2: {
        fontWeight: 700,
        paddingBottom: 8,
        paddingTop: 8,
        paddingLeft: 73.2,
    },
    slugline3: {
        fontWeight: 700,
        paddingBottom: 8,
        paddingTop: 8,
        paddingLeft: 66,
    },
    slugline4: {
        fontWeight: 700,
        paddingBottom: 8,
        paddingTop: 8,
        paddingLeft: 58.8,
    },
    slugline5: {
        fontWeight: 700,
        paddingBottom: 8,
        paddingTop: 8,
        paddingLeft: 51.6,
    },
    action: {
        paddingBottom: 8,
        paddingLeft: 102,
    },
    character: {
        paddingLeft: 238.55,
    },
    parentherical: {
        paddingLeft: 202.6,
    },
    dialog: {
        width: 420,
        paddingLeft: 166.7,
        paddingBottom: 8,
    },
    transition: {
        textAlign: "right",
        paddingBottom: 8,
        paddingLeft: 102,
    },
    subheaders: {
        paddingBottom: 8,
        paddingLeft: 102,
    },
    pageNumber: {
        textAlign: "right",
        paddingRight: 34,
    },
    title: {
        fontWeight: 700,
        textAlign: "center",
        paddingBottom: 24,
    },
    covertext: {
        textAlign: "center",
        paddingBottom: 16,
    }
});

interface InfoProps {
    title: string;
    author: string;
    date: boolean;
}

function ShowNHide() {
    const ele = document.getElementById("export-overlay")
    ele?.classList.toggle("export-overlay-hide")
    ele?.classList.toggle("export-overlay-show")
}
let text = ""
const ExportPDF = forwardRef((props: { text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; info: InfoProps; }, ref) => {

    const { t } = useTranslation();
    if (props.text?.toString() && text == "") {
        text = props.text?.toString()
    }

    const [download, setDownload] = useState(0)
    useEffect(() => {
        pageCounter = 0
    }, [download])

    useEffect(() => {
        const checkbox = document.getElementById("export-date") as HTMLInputElement | null;
        if (checkbox) {
            checkbox.checked = true;
        }
    }, [])

    const updatePDF = (script: any = text, addInput = false) => {
        // console.log(script)
        text = script
        // console.log(text)
        setDownload(download + 1)
        let authorInput = document.getElementById("export-author") as HTMLInputElement | null
        let titleInput = document.getElementById("export-title") as HTMLInputElement | null

        if (!authorInput || !titleInput){return}
        //localStorage.getItem("currentScriptName")
        //localStorage.getItem("authorName")
        if (addInput){
            localStorage.setItem("authorName", authorInput.value)
            localStorage.setItem("currentScriptName", titleInput.value)
            console.log("Atualizou storage")
            updatePDF()
        } else {
            authorInput.value = localStorage.getItem("authorName") as string
            titleInput.value = localStorage.getItem("currentScriptName") as string

            console.log("Atualizou input")
        }
    }

    useImperativeHandle(ref, () => ({
        updatePDF: (script: any = text) => { updatePDF(script) }
    }))

    return (
        <>
            <div id="export-overlay" className="export-overlay-hide">
                <div id="export-container">
                    <label className='no-select' htmlFor="export-title">{t("export.title")}</label>
                    <input type="text" id="export-title" name="export-title" onChange={() => { updatePDF(text,true) }} />
                    <label className='no-select' htmlFor="export-author">{t("export.author")}</label>
                    <input type="text" id="export-author" name="export-author" onChange={() => { updatePDF(text,true) }} />
                    <input type="checkbox" id="export-date" name="export-date" onChange={() => { updatePDF(text,true) }} />
                    <label className='no-select hover-pointer' htmlFor="export-date">{t("export.date-cover")}</label>
                    <div id="buttons">
                        <button className='hover-pointer' onClick={() => {ShowNHide()}}>{t("export.cancel")}</button>
                        <PDFDownloadLink document={<MakePDF info={{ title: getInputV("export-title"), author: getInputV("export-author"), date: checkDate() }} text={text} />} fileName={getInputV("export-title")} id="export-blabla">
                            {({ loading }) => (loading ? (
                                <button id="export-button" className='no-export'>{t("export.loading")}</button>
                            ) : (
                                <button id="export-button" className='hover-pointer'>{t("export.download")}</button>
                            ))}
                        </PDFDownloadLink>
                    </div>
                </div >
            </div>
        </>
    )
})

function checkDate(): boolean {
    const checkbox = document.getElementById("export-date") as HTMLInputElement | null;
    if (checkbox?.checked) {
        return true
    }
    return false
}

function getInputV(id: string): string {
    const inputElement = document.getElementById(id) as HTMLInputElement | null;
    if (inputElement?.value) {
        const value = inputElement.value;
        if (typeof value === 'string') { return value }
    }
    return ""
}

let slugCount = 0
let slugCountNumber = 0
let pageCounter = 0
const MakePDF = (props: { text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; info: InfoProps; }) => {
    let text = props.text?.toString()
    let lines = text?.split("\n")
    slugCount = 0
    return (
        <Document>
            <Page size="A4" style={styles.cover}>
                <View>
                    <Text style={styles.title}>{props.info.title}</Text>
                    <Text style={styles.covertext}>written by</Text>
                    <Text style={styles.covertext}>{props.info.author}</Text>
                    <Text style={styles.covertext}>{props.info.date ? new Date().toLocaleDateString() : ""}</Text>
                </View>
            </Page>
            <Page size="A4" style={styles.body} wrap={true}>
                <View>

                    {lines?.map((line, index) => {
                        if (line[0] === "&") {
                            slugCount += 1
                        }
                        return <Text key={index} style={styles[getLineType(line[0]) as keyof typeof styles]}>{line[0] === "&" ? slugCount + "  " : ""}{line.slice(1)}</Text>
                    })}
                </View>
                <View fixed>
                    <Text style={styles.pageNumber} render={(pageNumber => `${pageNumber.pageNumber - 1}`)} />
                </View>
            </Page>
        </Document>
    );
}

function getLineType(type: string) {
    if (type === "&") {
        slugCountNumber += 1
        type = "slugline" + slugCount.toString().length
    }
    if (type === "!") {
        type = "action"
    }
    if (type === "@") {
        type = "character"
    }
    if (type === "(") {
        type = "parentherical"
    }
    if (type === "#") {
        type = "dialog"
    }
    if (type === "$") {
        type = "transition"
    }
    if (type === "*") {
        type = "subheaders"
    }
    return (type)
}

export default ExportPDF