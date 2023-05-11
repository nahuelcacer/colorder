import { formatDate } from "../../tools/formatedDate";
import getTotalCost from "../../tools/getTotalCost";


export const generatePdf = (data) => {

  const content = `
    <html>
      <head>
       <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js"></script>
        <title>Colegio de Escribanos del Chaco</title>
        <style>
          * {
            padding:0
          }
          body {
            font-family: Georgia, serif;

          }
          #barcode {
            width: 100%;
          }
          
          table {
            border-collapse: collapse;
            width: 100%;
            font-family: Arial, sans-serif;
          }

          th, td {
            text-align:left;
            padding:8px;
           }

           tr:nth-child(even) {background-color:#f2f2f2;}

           th{
             background-color:#4CAF50;
             color:white;

         }
        </style>
      </head>
      <body onload="window.print()">
        
        <h4>COLEGIO DE ESCRIBANOS DEL CHACO</h4>
        <p>Av Italia 123 - Resistencia, Chaco</p>
        <p>Tel: 0362 443-0551</p>
        <div>
          <p>Cliente: ${data.cliente.nombre}</p>
          <p>Dni/Cuit: ${data.cliente.dni}</p>
        </div>
        <div>
          <p>tracking id: ${data.id}</p>
          <p>Fecha: ${formatDate(data.fecha)}</p>
          <p>Numero: <h1>${data.orden}</h1></p>
        </div>
        <div>
            <ul>
              ${data.orderproduct.map((item,index) => (
                `<li key={item.id}>
                  - ${item.producto.nombre}<br />
                  $ ${item.producto.precio}  x ${item.cantidad}
                  Total:${item.cantidad * item.producto.precio}
                </li>`
              )).join('')}
            </ul>
        </div>
        <div> <h4>Importe total: $ ${getTotalCost(data.orderproduct)}</h4></div>
        <!-- Código de barras -->
        <svg id="barcode"></svg>

        <script>
          JsBarcode("#barcode", "${data.id}", {
            format: "CODE39",
            width: 2,
            height: 70,
            displayValue: true,
            fontOptions: "",
          });
        </script>
      </body>`
    ;

  const printWindow = window.open('', '_blank');
  if (printWindow !== null && typeof (printWindow) !== 'undefined') {
    printWindow.document.write(content);
    printWindow.document.close();

    // Escucha el evento afterprint y cierra la ventana cuando termine de imprimir.
    printWindow.addEventListener('afterprint', () => {
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    });
  }
};