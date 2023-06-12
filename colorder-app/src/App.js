import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Imprimir from './components/imprimir.jsx';
import AgregarProductos from './components/pedido/agregarProductos';
import BuscarCliente from './components/pedido/buscarCliente.jsx';
import MostrarPedido from './components/pedido/mostrarPedido.jsx';
import ClienteSeleccionado from './components/pedido/seleccionCliente.jsx';

import jwt_decode from "jwt-decode"
import { Container } from '@mui/system';


function App() {
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const jwtToken = localStorage.getItem('authTokens');
  const isAuthenticated = jwtToken ? true : false;

  if (isAuthenticated) {

    return (
      <Container>
        {/* <Sidebar user={user} logoutUser={logoutUser}></Sidebar> */}

        <BuscarCliente />
        <ClienteSeleccionado />
        <div className='container mt-4'>
          <AgregarProductos product={product} setProduct={setProduct} setQuantity={setQuantity} quantity={quantity} />
        </div>
        {/* <div className='container mt-4'> */}
          <MostrarPedido></MostrarPedido>
        {/* </div> */}
        <div className='container mt-4'>
          <Imprimir setProduct={setProduct} ></Imprimir>
        </div>

      </Container>
    )
  }
  else {
    return <Navigate to='/login' />
  }
}

export default App;
