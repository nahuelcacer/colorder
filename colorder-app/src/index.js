import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import {store} from './redux/store'
import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom"
import Cobranza from './Cobranza';
import Productos from './components/productos/Productos';
import Facturacion from './components/facturacion/Facturacion';
const router = createBrowserRouter([{
  path:"/",
  element:<App />
},
{
  path:"/cobranza",
  element:<Cobranza />
},
{
  path:"/factura",
  element:<Facturacion/>
},
{
  path:"/productos",
  element:<Productos/>
}])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}>
        </RouterProvider>
    </Provider>

  </React.StrictMode>
);


