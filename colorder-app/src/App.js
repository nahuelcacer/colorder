import BuscarCliente from './components/pedido/buscarCliente.jsx';
import ClienteSeleccionado from './components/pedido/seleccionCliente.jsx';
import AgregarProductos from './components/pedido/agregarProductos';
import MostrarPedido from './components/pedido/mostrarPedido.jsx';
import Imprimir from './components/imprimir.jsx';
import { useContext, useEffect, useState } from 'react';
import AuthContext from './context/AuthContext.js';



function App() {
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  let {user} = useContext(AuthContext)
  return (
    <>  
      {user ? user.username : <></>}
      <BuscarCliente />
      <ClienteSeleccionado />
      <div className='container mt-4'>
        <AgregarProductos product={product} setProduct={setProduct} setQuantity={setQuantity} quantity={quantity} />
      </div>
      <div className='container mt-4'>
        <MostrarPedido></MostrarPedido>
      </div>
      <div className='container mt-4'>
        <Imprimir setProduct={setProduct} ></Imprimir>
      </div>

    </>
  )
}

export default App;
