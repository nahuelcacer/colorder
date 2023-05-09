export const generatePdf = (data) => {


  const content = `
    <html>
      <head>
        <title>Colegio de Escribanos del Chaco</title>
        <style>
          body {
            font-family: Georgia, serif;
          }
          // Agrega estilos CSS aquí si es necesario.
          img.logo {
            width: auto;
            max-height:100px; 
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
        // Añade aquí tus datos de pedido usando data. Por ejemplo:
        <div>
          <p>${data.cliente.nombre}</p>
          <p>${data.cliente.dni}</p>
        </div>
        <div>
          <p>Fecha: ${data.fecha}</p>
          <p>Numero: ${data.orden}</p>
        </div>
        <div></div>
        <div>
          <table>
            <th>
              <tr>
                <td>Producto</td>
                <td>Precio</td>
                <td>Cantidad</td>
                <td>Total</td>
              </tr>
            </th>
            ${data.orderproduct.map(item => {
                return (
                  `<tr>
                    <td>${item.producto.nombre}</td>
                    <td>${item.producto.precio}</td>
                    <td>${item.cantidad}</td>
                    <td>${item.cantidad * item.producto.precio}</td>
                  </tr>`
                )
              })}
          </table>
        </div>

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