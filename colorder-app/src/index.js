import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Pedidos from './components/Pedidos';
import Agregar from './components/Agregar';
import AgregarProducto from './components/Productos';
import Buscar from './components/Buscar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Buscar search="clientes" label="Seleccionar cliente" />
  </React.StrictMode>
);


