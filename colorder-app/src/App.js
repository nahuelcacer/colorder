import BuscarCliente from './components/pedido/buscarCliente.jsx';
import ClienteSeleccionado from './components/pedido/seleccionCliente.jsx';
import AgregarProductos from './components/pedido/agregarProductos';
import MostrarPedido from './components/pedido/mostrarPedido.jsx';
import Imprimir from './components/imprimir.jsx';
import { useState } from 'react';
import MostrarPDF from './components/pdf/mostrarPdf.jsx';
function App() {   
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [pdf, setPdf] = useState(null)
  return(
    <div>
      {
        pdf 
        ?
        <MostrarPDF data={pdf}></MostrarPDF>
        :
        <>
          <BuscarCliente/>
          <ClienteSeleccionado/> 
          <div className='container mt-4'>
          <AgregarProductos product={product} setProduct={setProduct} setQuantity={setQuantity} quantity={quantity}/>
          </div>
          <div className='container mt-4'>
          <MostrarPedido></MostrarPedido>
          </div>
          <div className='container mt-4'>
          <Imprimir setProduct={setProduct} setPdf={setPdf}></Imprimir>
          </div>
        </>
      }
    </div>
  )
}

export default App;
