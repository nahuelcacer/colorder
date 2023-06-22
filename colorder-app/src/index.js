import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import Administracion from './components/administracion/Administracion';
import Cobranza from './components/cobranza/Cobranza';
import Productos from './components/productos/Productos';
import Tracking from './components/tracking/Tracking';
import LoginPage from './components/usuario/Login';
import Sidebar from './components/usuario/sidebar/Sidebar';
import { AuthProvider } from './context/AuthContext';
import Factura from './Factura';
import { store } from './redux/store';

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
          {/* <Sidebar></Sidebar> */}
          
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/cobranza" element={<RequireAuth><Cobranza /></RequireAuth>} />
            <Route path="/factura" element={<RequireAuth><Factura /></RequireAuth>} ></Route>
            <Route path="/administracion" element={<RequireAuth><Administracion /></RequireAuth>} >
              <Route 
              path="productos/"
              element={<Productos/>}
              />
              <Route 
              path="cliente/"
              element={<h5>ssss</h5>}
              />
              <Route 
              path="sectores/"
              element={<Productos/>}
              />
            </Route>
            <Route path="/tracking" element={<RequireAuth><Tracking /></RequireAuth>}></Route>
            <Route path="/login" element={<LoginPage />} ></Route>
          </Routes>
        </AuthProvider>
      </Router>
      {/* </RouterProvider> */}
    </Provider>

  </React.StrictMode>
);


