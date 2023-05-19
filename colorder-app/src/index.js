import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store'
import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom"
import Productos from './components/productos/Productos';
import Facturacion from './components/facturacion/Facturacion';
import Factura from './Factura';
import Cobranza from './components/cobranza/Cobranza';
import Tracking from './components/tracking/Tracking';
import LoginPage from './components/usuario/Login';
import { AuthProvider } from './context/AuthContext';

const routes = [
  { path: "/", element: <App /> },
  { path: "/cobranza", element: <Cobranza /> },
  { path: "/factura", element: <Factura /> },
  { path: "/productos", element: <Productos /> },
  { path: "/tracking", element: <Tracking /> },
  { path: "/login", element: <LoginPage /> }
];

const router = createBrowserRouter(
  routes.map(route => ({
    ...route,
    element: <AuthProvider>{route.element}</AuthProvider>
  }))
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <AuthProvider>
        </AuthProvider>
      </RouterProvider>
    </Provider>

  </React.StrictMode>
);


