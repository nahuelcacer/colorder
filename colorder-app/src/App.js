import BuscarCliente from './components/buscarCliente.jsx';
import ClienteSeleccionado from './components/seleccionCliente.jsx';
import AgregarProductos from './components/agregarProductos';
import MostrarPedido from './components/mostrarPedido.jsx';
import Imprimir from './components/imprimir.jsx';

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
