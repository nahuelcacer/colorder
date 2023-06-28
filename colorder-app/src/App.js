import { Container } from '@mui/system';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Imprimir from './components/imprimir.jsx';
import AgregarProductos from './components/pedido/agregarProductos';
import BuscarCliente from './components/pedido/buscarCliente.jsx';
import MostrarPedido from './components/pedido/mostrarPedido.jsx';
import ClienteSeleccionado from './components/pedido/seleccionCliente.jsx';
import Sidebar from './components/usuario/sidebar/Sidebar.jsx';



function App() {
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const jwtToken = localStorage.getItem('authTokens');
  const isAuthenticated = jwtToken ? true : false;

  if (isAuthenticated) {

    return (
      <Container>      
        <BuscarCliente />
        <ClienteSeleccionado />

        <AgregarProductos product={product} setProduct={setProduct} setQuantity={setQuantity} quantity={quantity} />


        <MostrarPedido></MostrarPedido>


        <Imprimir setProduct={setProduct} ></Imprimir>


      </Container>
    )
  }
  else {
    return <Navigate to='/login' />
  }
}

export default App;
