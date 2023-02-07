import jsPDF from 'jspdf'



export const createPdf = (data) => {
    const pdf = new jsPDF()
    pdf.text(`${data.cliente.nombre}`, 10, 10);
    return pdf
}