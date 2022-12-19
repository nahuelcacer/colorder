import BuscarCliente from './components/pedido/buscarCliente.jsx';
import ClienteSeleccionado from './components/pedido/seleccionCliente.jsx';
import AgregarProductos from './components/pedido/agregarProductos';
import MostrarPedido from './components/pedido/mostrarPedido.jsx';
import Imprimir from './components/imprimir.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

function App() {
  
  return(
    <>
      <BuscarCliente/>
      <ClienteSeleccionado/> 
      <div className='container mt-4'>
        <AgregarProductos/>
      </div>
      <div className='container mt-4'>
        <MostrarPedido></MostrarPedido>
      </div>
      <div className='container mt-4'>
      <Imprimir></Imprimir>
      </div>
    </>
  )
}

export default App;
