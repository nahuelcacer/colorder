import { createSlice , createAsyncThunk, createReducer, createAction } from '@reduxjs/toolkit'
import {agregarItem, selectCliente, eliminarItem} from '../../redux/actions/clientes-action'




const initialState = {
    cliente:{nombre:"",identificacion:""},
    carrito:[],
    cobrado:false,
    facturado:false


}


const pedidoReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(selectCliente, (state, action) => {
        state.cliente = action.payload.cliente
      })
      .addCase(agregarItem, (state,action)=>{
        state.carrito.push(action.payload) 
      })
      .addCase(eliminarItem, (state,action)=>{
        state.carrito.splice(action.payload,1)
      })
  })

export default pedidoReducer