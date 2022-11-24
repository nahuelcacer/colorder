import { createSlice , createAsyncThunk, createReducer, createAction } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    loading:false,
    pedidos:[],
    error:""
}

export const fecthPedidos = createAsyncThunk('pedidos/requestPedidos',()=>{
    return axios
                .get('api/pedidos')
                .then((res)=> res.data) 
})


const showPedidoSlice = createSlice({
    name:"pedidosMostrar",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fecthPedidos.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(fecthPedidos.fulfilled, (state,action)=> {
            state.loading = false
            state.pedidos = action.payload
            state.error = ''
        })
        builder.addCase(fecthPedidos.rejected, (state,action)=>{
            state.loading = false
            state.pedidos = []
            state.error = action.error.message
        })
    }
})

export default showPedidoSlice.reducer