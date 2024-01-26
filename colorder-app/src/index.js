import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import Administracion from './components/administracion/Administracion';
import MostrarClientes from './components/clientes/mostrarClientes';
import Cobranza from './components/cobranza/Cobranza';
import Productos from './components/productos/Productos';
import Tracking from './components/tracking/Tracking';
import LoginPage from './components/usuario/Login';
import { AuthProvider } from './context/AuthContext';
import Factura from './Factura';
import { store } from './redux/store';
import Sectores from './components/sectores/sectores';
import ProductosDataGrid from './components/productos/productosDataGrid';
import Sidebar from './components/usuario/sidebar/Sidebar';


const RequireAuth = ({ children }) => {
  const jwtToken = localStorage.getItem('authTokens');
  const isAuthenticated = jwtToken ? true : false;

  if (!isAuthenticated) {
    return <Navigate to='/login' />

  }
  return children
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AuthProvider>
        <Sidebar></Sidebar>
          
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/cobranza" element={<RequireAuth><Cobranza /></RequireAuth>} />
            <Route path="/factura" element={<RequireAuth><Factura /></RequireAuth>} ></Route>
            <Route path="/administracion" element={<RequireAuth><Administracion /></RequireAuth>} >
              <Route 
              path="productos/"
              element={<ProductosDataGrid></ProductosDataGrid>}
              />
              <Route 
              path="cliente/"
              element={<MostrarClientes></MostrarClientes>}
              />
              <Route 
              path="sectores/"
              element={<Sectores/>}
              />
              <Route path="tracking/" element={<RequireAuth><Tracking /></RequireAuth>}></Route>
              <Route path="tracking/:id" element={<RequireAuth><Tracking /></RequireAuth>}></Route>
            </Route>
            <Route path="/login" element={<LoginPage />} ></Route>
          </Routes>
        </AuthProvider>
      </Router>
      {/* </RouterProvider> */}
    </Provider>

  </React.StrictMode>
);


