import { createSlice , createAsyncThunk, createReducer, createAction } from '@reduxjs/toolkit'
import {agregarItem, selectCliente, eliminarItem, backtoInitialState} from '../../redux/actions/clientes-action'




const initialState = {
    cliente:null,
    orderproduct:[],
    recibo:false,
    factura:false
}


const pedidoReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(selectCliente, (state, action) => {
        state.cliente = action.payload.cliente
      })
      .addCase(agregarItem, (state,action)=>{
        state.orderproduct.push(action.payload) 
      })
      .addCase(eliminarItem, (state,action)=>{
        state.orderproduct.splice(action.payload,1)
      })
      .addCase(backtoInitialState, (state,action)=> {
        state.cliente = state.cliente
        state.orderproduct = []
        state.recibo=false
        state.false=false

      })
  })

export default pedidoReducer