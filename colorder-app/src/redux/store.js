import { configureStore } from '@reduxjs/toolkit'
import clienteSlice  from '../features/clientes/clienteSlice'
import pedidoSlice  from '../features/clientes/pedidoSlice'
import productoSlice from '../features/clientes/productoSlice'

export const store = configureStore({
  reducer: {
      clientes:clienteSlice,
      pedido:pedidoSlice,
      productos:productoSlice
  },
})