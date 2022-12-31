import { useDispatch, useSelector } from 'react-redux';
import { Card, Table, TableContainer, TableBody, TableHead, TableRow,TableCell, Typography, IconButton  } from '@mui/material';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { eliminarItem } from '../../redux/actions/clientes-action';
import { useState } from 'react';
const MostrarPedido = () => {
    const pedido = useSelector(state=>state.pedido)
    const dispatch = useDispatch()
    const [total,setTotal] = useState([0])
    
    const calcTotal = (arr) => {
        if(arr.length > 0){
            return (
                "$" + arr.reduce((a,b)=> a + b.total, 0)
            )
        }
    }
    return (
        <>
                <TableContainer sx = {{boxShadow:4, borderRadius:2}} component={Paper}>
                    
                    <Typography variant="h6" component="h2" sx ={{
                        ml:2, mt:1
                    }}>Pedido</Typography>
                    <Typography
                    sx = {{
                        ml:2,
                        color: 'text.secondary'
                    }}
                    >({pedido.orderproduct.length} items)
                    </Typography>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" title="Carrito">
                        <TableHead >
                            <TableRow >
                                <TableCell>Producto</TableCell>
                                <TableCell align="right">Precio</TableCell>
                                <TableCell align="right">Cantidad</TableCell>
                                <TableCell align="right">Precio Total</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pedido.orderproduct.map((item, index)=>{
                                return(
                                    <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {item.producto.nombre}
                                    </TableCell>
                                    <TableCell align="right">${item.producto.precio}</TableCell>
                                    <TableCell align="right">{item.cantidad}</TableCell>
                                    <TableCell align="right">${item.total}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color="error" aria-label="delete" onClick={(e)=>{dispatch(eliminarItem(index))}}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                    </TableRow>

                                )
                            })}
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                

                                <TableCell align="right">{calcTotal(pedido.orderproduct)}</TableCell>
                            

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

        </>
    )
}

export default MostrarPedido




