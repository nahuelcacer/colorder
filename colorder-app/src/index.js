import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Pedidos from './components/Pedidos';
import Agregar from './components/Agregar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Agregar />
  </React.StrictMode>
);


