import React from 'react'
import { Page, Text, View, Document, StyleSheet, Font, PDFViewer } from '@react-pdf/renderer'
import { PDFDownloadLink } from '@react-pdf/renderer';
import fontRegular from "./fonts/CourierPrime-Regular.ttf"
import fontBold from "./fonts/CourierPrime-Bold.ttf"

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
    slugline1: {
        fontWeight: 700,
        paddingBottom: 8,
        paddingLeft: 80.4,
    },
    slugline2: {
        fontWeight: 700,
        paddingBottom: 8,
        paddingLeft: 73.2,
    },
    slugline3: {
        fontWeight: 700,
        paddingBottom: 8,
        paddingLeft: 66,
    },
    slugline4: {
        fontWeight: 700,
        paddingBottom: 8,
        paddingLeft: 58.8,
    },
    slugline5: {
        fontWeight: 700,
        paddingBottom: 8,
        paddingLeft: 51.6,
    },
    action: {
        // paddingBottom: 8,
        paddingLeft: 102,
    },
    character: {
        paddingLeft: 238.55,
    },
    parentherical: {
        paddingLeft: 202.6,
    },
    dialog: {
        paddingBottom: 8,
        width: 420,
        paddingLeft: 166.7,
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
    }
});

const ExportPDF = (props: { text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; }) => {
    let text = props.text?.toString()
    return (
        <>
            <PDFDownloadLink document={<MakePDF text={text} />} fileName='rotero'>
                {({ loading }) => (loading ? (
                    <span>Loading document...</span>
                ) : (
                    <button>'Download now!'</button>
                ))}
            </PDFDownloadLink>
        </>
    )
}

let slugCount = 0
let slugCountNumber = 0
let pageCounter = 0
const MakePDF = (props: { text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
    let text = props.text?.toString()
    let lines = text?.split("\n")
    return (
        <Document>
            {/* <Page size="A4">
                <View>
                    <Text style={styles.text}>Title</Text>
                </View>
            </Page> */}
            <Page size="A4" style={styles.body} wrap={true}>
                <View>
                    
                    {lines?.map((line, index) => {
                        if (line[0] === "&") {
                            slugCount += 1
                        }
                        return <Text key={index} style={styles[getLineType(line[0])]}>{line[0] === "&" ? slugCount + "  ": ""}{line.slice(1)}</Text>
                    })}
                </View>
                <View fixed>
                    <Text style={styles.pageNumber} render={(pageNumber => `${pageNumber.pageNumber}`)}/>
                </View>
            </Page>
        </Document>
    );
}

function getLineType(type: string) {
    if (type === "&") {
        slugCountNumber += 1
        console.log("slugline" + slugCount.toString().length)
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
export const ViewPDF = (props: { text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
    let text = props.text?.toString()
    return (
        <PDFViewer>
            <MakePDF text={text} />
        </PDFViewer>
    )
}

export default ExportPDF