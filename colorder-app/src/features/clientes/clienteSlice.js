import axios from 'axios'
import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import { localhost } from '../../services/service.pedidos'



const initialState = {
    loading: false,
    clientes:[],
    error:""
}

export const fecthClientes = createAsyncThunk('clientes/requestClientes',()=>{
    return axios
                .get(`${localhost}api/clientes`)
                .then((res)=> res.data.results) 
})

const clienteSlice = createSlice({
    name:'clientes',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fecthClientes.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(fecthClientes.fulfilled, (state,action)=>{
            state.loading = false
            state.clientes = action.payload
            state.error = ''
        })
        builder.addCase(fecthClientes.rejected, (state,action)=>{
            state.loading = false
            state.clientes = []
            state.error = action.error.message
        })
    }
})

export default clienteSlice.reducer