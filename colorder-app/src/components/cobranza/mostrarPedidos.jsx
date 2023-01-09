import { Badge, Button, Table, TableBody, TableCell, TableHead, TableRow, Modal, Box, Typography } from "@mui/material"
import {  useEffect } from "react"
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { fecthPedidos } from "../../features/pedidos/pedidoshowSlice";
import {connect} from 'react-redux'
import { useState } from "react";
import axios from "axios";


const PedidosCobranza = () => {
    const [data,setData] = useState([])
    const [pendientes, setPendientes] = useState(0)


    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch('/api/pedidos?completado=0&recibo=0');
            const data = await response.json();
            setData(data);
            const arr_pendientes = data.filter(i => i.completado == false)
            setPendientes(arr_pendientes.length)
            
          };
          const interval = setInterval(fetchData, 5000);
          return () => clearInterval(interval);
    },[data])
    useEffect(() => {
        if (pendientes !== 0) {
          document.title = `Pendientes ${pendientes}`;
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
                            <TableCell sx={{borderBottom:"none"}}>Pedido</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>Nombre</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>Identificacion</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>Fecha</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>Hora</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>Factura</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                {data.map((pedido)=>{
                    return (
                        <TableRow sx={{borderBottom:"none"}}>
                            <TableCell sx={{borderBottom:"none"}}>{pedido.orden}</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>{pedido.cliente.nombre}</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>{pedido.cliente.dni}</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>{pedido.fecha}</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>{pedido.tiempo.substr(0,5)}</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>{pedido.factura ? <Badge variant="dot"color="success"></Badge> : <Badge variant="dot" color="error"><AccessTimeOutlinedIcon></AccessTimeOutlinedIcon></Badge> }</TableCell>
                            <TableCell sx={{borderBottom:"none"}}><Button onClick={()=>{RecibirPedido(pedido.id)}} variant="contained"color="primary">Recibido</Button></TableCell>
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