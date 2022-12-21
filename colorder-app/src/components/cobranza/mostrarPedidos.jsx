import { Badge, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import {  useEffect } from "react"
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { fecthPedidos } from "../../features/pedidos/pedidoshowSlice";
import {connect} from 'react-redux'
import { useState } from "react";

const PedidosCobranza = () => {
    const [data,setData] = useState([])
    const [pendientes, setPendientes] = useState(0)
    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch('/api/pedidos');
            const data = await response.json();
            setData(data);
            const arr_pendientes = data.filter(i => i.completado == false)
            setPendientes(arr_pendientes.length)
            if(pendientes !== 0){
                document.title = 'Pendientes ' + pendientes.toString()
            }
          };
      
          const interval = setInterval(fetchData, 5000);
          return () => clearInterval(interval);
    },[])
    return (

        <div className="container">
            
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{borderBottom:"none"}}>Pedido</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>Nombre</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>identificacion</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>Fecha</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>Hora</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>Factura</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                {data.map((pedido)=>{
                    return (
                        <TableRow sx={{borderBottom:"none"}}>
                            <TableCell sx={{borderBottom:"none"}}>{pedido.id}</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>{pedido.cliente_nombre}</TableCell>
                            <TableCell sx={{borderBottom:"none"}}>{pedido.cliente_dni}</TableCell>
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