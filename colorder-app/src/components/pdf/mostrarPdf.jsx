import { PDFViewer } from "@react-pdf/renderer"
import CrearPdf from "./createPdf"


const MostrarPDF = ({data}) => {

    return (
        <PDFViewer>
            <CrearPdf data={data}></CrearPdf>
        </PDFViewer>
    )
}

export default MostrarPDF