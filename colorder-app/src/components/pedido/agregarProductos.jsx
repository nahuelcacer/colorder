import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fecthProductos } from '../../features/clientes/productoSlice';
import { agregarItem, agregarProducto } from '../../redux/actions/clientes-action';
import FilterProductos from '../../hooks/filterProducts';
import useTodosLosProductos from '../../hooks/filterProducts';

const AgregarProductos = ({product, setProduct, setQuantity, quantity}) => {
    const dispatch = useDispatch()
    const cliente = useSelector(state => state.pedido.cliente)
    const productosF = useTodosLosProductos()
    
    const productos = cliente != null && !cliente.escribano ? productosF.filter(i=>!i.notarial): productosF

    const hanledQuantity = (e) => {
        setQuantity(parseInt(e.target.value))
    }
    useEffect(() => {
        dispatch(fecthProductos())
    }, [])

    const addItem = (item) => {
        if (product !== null) {
            dispatch(agregarItem(item))
        }
        // Agregar mensaje
    }
    return (


        <div className="row" style={{marginTop:'1rem'}}>
            {/* INPUT DE PRODUCTO */}
            <div className="col">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={productos}
                    renderInput={(params) => <TextField  {...params} label="Selecionar producto" />}
                    getOptionLabel={(option) => option.nombre}
                    onChange={(event, newValue) => { setProduct(newValue) }}
                    value={product}
                >
                </Autocomplete>
            </div>
            {/* INPUT DE PRODUCTO */}
            {/* INPUT DE CANTIDAD */}
            <div className="col">
                <TextField
                    sx={{
                        '& > :not(style)': { m: 0, width: 100 },
                    }}
                    id="outlined-basic"
                    label="Cantidad"
                    variant="outlined"
                    onChange={(e) => { hanledQuantity(e) }}
                />
            </div>
            {/* INPUT DE CANTIDAD */}
            {/* BOTON DE AGREGAR */}
            <div className="col pt-2">
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        p: 1
                    }}
                    onClick={(e) => { addItem({ producto: product, cantidad: quantity, total: product.precio * quantity }) }}
                >
                    Agregar
                </Button>
            </div>
            {/* BOTON DE AGREGAR */}
        </div>

    )
}

export default AgregarProductos