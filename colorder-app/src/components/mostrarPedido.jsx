import { useDispatch, useSelector } from 'react-redux';
import { Card, Table, TableContainer, TableBody, TableHead, TableRow,TableCell, Typography, IconButton  } from '@mui/material';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { eliminarItem } from '../redux/actions/clientes-action';

const MostrarPedido = () => {
    const pedido = useSelector(state=>state.pedido)
    const dispatch = useDispatch()
    return (
        <>
                <TableContainer component={Paper}>

                    <Typography variant="h6" component="h2" sx ={{
                        m:2,
                    }}>Pedido</Typography>
                    <Typography
                    sx = {{
                        m:2,
                        color: 'text.secondary'
                    }}
                    >({pedido.carrito.length} items)
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
                            {pedido.carrito.map((item, index)=>{
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
                                    <TableCell align="right">${item.cantidad*item.producto.precio}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color="error" aria-label="delete" onClick={(e)=>{dispatch(eliminarItem(index))}}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                    </TableRow>

                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

        </>
    )
}

export default MostrarPedido




