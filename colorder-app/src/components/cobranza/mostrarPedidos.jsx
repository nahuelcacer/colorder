import { Badge, Button, Table, TableBody, TableCell, TableHead, TableRow, Modal, Box, Typography, Chip } from "@mui/material"
import {  useEffect } from "react"
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { fecthPedidos } from "../../features/pedidos/pedidoshowSlice";
import {connect} from 'react-redux'
import { useState } from "react";
import axios from "axios";
import { textAlign } from "@mui/system";
import styleIdCliente from "../../tools/styleIdentificacion";
import getTotalCost from "../../tools/getTotalCost";


const PedidosCobranza = () => {
    const [data,setData] = useState([])
    const [pendientes, setPendientes] = useState(0)


    useEffect(()=>{
        const fetchData = async () => {
            axios.get('/api/pedidos?completado=0&recibo=0')
            .then(res=>{
                setData(res.data)
                const arr_pendientes = data.filter(i => i.completado == false)
                setPendientes(arr_pendientes.length)
            })            
          };
          const interval = setInterval(fetchData, 5000);
          return () => clearInterval(interval);
        },[data])

    useEffect(() => {
            if (pendientes !== 0) {
            document.title = `(${pendientes}) Pendientes`;
            } else {
            document.title = 'No hay pedidos pendientes';
            }
    }, [pendientes]);
    
    const RecibirPedido  = (id) => {
        axios.get(`api/pedidos/${id}`)
        .then(res=>{
            res.data.recibo = true
            axios.put(`api/pedidos/${id}/`, res.data )
            .then(() => {
                // Filter the data array to remove the order with the specified ID
                const updatedData = data.filter(item => item.id !== id);
                setData(updatedData);
              });
        })

    }
    return (

        <div className="container">
            
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' sx={{borderBottom:"none"}}>Pedido</TableCell>
                            <TableCell align='center' sx={{borderBottom:"none"}}>Cliente</TableCell>
                            <TableCell align='center' sx={{borderBottom:"none"}}>Total</TableCell>
                            <TableCell align='center' sx={{borderBottom:"none"}}>Factura</TableCell>
                            <TableCell align='center' sx={{borderBottom:"none"}}>*</TableCell>
                            {/* <TableCell sx={{borderBottom:"none"}}>Identificacion</TableCell> */}
                            {/* <TableCell sx={{borderBottom:"none"}}>Factura</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                {data.map((pedido)=>{
                    return (
                        <TableRow sx={{borderBottom:"none"}}>
                            <TableCell align='center'  sx={{borderBottom:"none"}}>
                                <Typography><strong>{pedido.orden}</strong></Typography>
                                <Typography variant='overline' color={'grey'}>{pedido.fecha}</Typography>
                                <div><Typography variant='caption' color={'grey'}> {pedido.tiempo.substr(0,5)} hs</Typography></div>
                            
                            </TableCell>
                            {/* <TableCell sx={{borderBottom:"none"}}>{pedido.fecha}</TableCell> */}
                            {/* <TableCell sx={{borderBottom:"none"}}>{pedido.tiempo.substr(0,5)}</TableCell> */}

                            <TableCell align='center'  sx={{borderBottom:"none"}}>
                                <Typography><strong>{pedido.cliente.nombre}</strong></Typography> 
                                <Typography>{styleIdCliente(pedido.cliente.dni)}</Typography> 
                                {pedido.cliente.escribano ?  <Chip label="Esc" size="small"  color='primary' variant="outlined" />:<></>}

                            </TableCell>
                            <TableCell align='center'  sx={{borderBottom:"none"}}>
                                <Typography><strong>{getTotalCost(pedido.orderproduct).toLocaleString('es-ar', {
                                    style: 'currency',
                                    currency: 'ARS',
                                    minimumFractionDigits: 2
                                })}</strong></Typography>
                            </TableCell>
                            {/* <TableCell sx={{borderBottom:"none"}}>{pedido.cliente.dni}</TableCell> */}
                            <TableCell align='center'  sx={{borderBottom:"none"}}>{pedido.factura ? <Badge variant="dot"color="success"></Badge> : <Badge variant="dot" color="error"><AccessTimeOutlinedIcon></AccessTimeOutlinedIcon></Badge> }</TableCell>
                            <TableCell align='center'  sx={{borderBottom:"none"}}><Button onClick={()=>{RecibirPedido(pedido.id)}} variant="contained"color="primary">Recibido</Button></TableCell>
                        </TableRow>
                    )
                })}
                </TableBody>
            </Table>
           
            
        </div>
        
    )
}

function mapStateToProps(state){
    return {
        pedidos: state.pedidosMostrar
    }
}
const mapDispatchToProps = (dispatch) => ({
    // Asigna una propiedad al componente con una acción de la aplicación.
    fecthPedidos: () => dispatch(fecthPedidos())
  });
export default connect(mapStateToProps, mapDispatchToProps)(PedidosCobranza);