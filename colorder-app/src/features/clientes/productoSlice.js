import axios from 'axios'
import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import { localhost } from '../../services/service.pedidos'



const initialState = {
    loading:false,
    productos:[],
    error:""
}

export const fecthProductos = createAsyncThunk('productos/requestProductos',()=>{
    return axios
                .get(`${localhost}api/productos`)
                .then((res)=> res.data) 
})

const productoSlice = createSlice({
    name:'productos',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fecthProductos.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(fecthProductos.fulfilled, (state,action)=>{
            state.loading = false
            state.productos = action.payload
            state.error = ''
        })
        builder.addCase(fecthProductos.rejected, (state,action)=>{
            state.loading = false
            state.productos = []
            state.error = action.error.message
        })
    }
})

export default productoSlice.reducer