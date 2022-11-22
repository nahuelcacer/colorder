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
const router = createBrowserRouter([{
  path:"/",
  element:
        <Provider store={store}>
          <App />
        </Provider>
},
{
  path:"/cobranza",
  element:
      <Provider store={store}>
        <Cobranza />
      </Provider>
}])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>
);


