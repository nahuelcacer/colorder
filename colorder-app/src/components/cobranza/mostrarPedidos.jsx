import { Badge, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import {  useEffect } from "react"
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { useDispatch, useSelector } from "react-redux";
import { fecthPedidos } from "../../features/pedidos/pedidoshowSlice";
const PedidosCobranza = () => {
    const pedidos = useSelector(state=>state.pedidosMostrar)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fecthPedidos())
    },[dispatch])
    return (
        <div className="container">
            
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{borderBottom:"none"}}>Pedido</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>Fecha</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>Hora</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>Factura</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                {pedidos.pedidos.map((pedido)=>{
                    return (
                                <TableRow sx={{borderBottom:"none"}}>
                                    <TableCell sx={{borderBottom:"none"}}>{pedido.id}</TableCell>
                                    <TableCell sx={{borderBottom:"none"}}>{pedido.fecha}</TableCell>
                                    <TableCell sx={{borderBottom:"none"}}>{pedido.tiempo.substr(0,5)}</TableCell>
                                    <TableCell sx={{borderBottom:"none"}}>{pedido.factura ? <Badge variant="dot"color="success"></Badge> : <Badge variant="dot" color="error"><AccessTimeOutlinedIcon></AccessTimeOutlinedIcon></Badge> }</TableCell>
                                    <TableCell sx={{borderBottom:"none"}}><Button variant="contained"color="success">Recibido</Button></TableCell>
                                </TableRow>
                    )
                })}
                </TableBody>
            </Table>
            
        </div>
    )
}

export default PedidosCobranza