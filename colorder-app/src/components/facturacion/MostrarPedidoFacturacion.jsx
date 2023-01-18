import { Button, Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import axios from "axios";
import { useState } from "react";
import { updatePedidoFactura } from "../../services/service.pedidos";
import getTotalCost from "../../tools/getTotalCost";
import { StyleModalFacturacion } from '../../tools/styleModals';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Fingerprint from '@mui/icons-material/Fingerprint';
import { useEffect } from "react";


const MostrarPedidoFacturacion = ({preparar, setPreparar}) => {
    const [pedido,setPedido] = useState('')
    const handleClose = () => {
        axios.get(`api/pedidos/${preparar.id}/`)
        .then(
            res=> {
                res.data.enPreparacion = false
                axios.put(`api/pedidos/${preparar.id}/`, res.data)
                .then(
                    res=>{
                        setPreparar({on:false,id:''})
                    }
                )
            }
        )
    
    };
    

    
    const handleCloseOnClick = () => {
        updatePedidoFactura(preparar.pedido)
        .then(
            res=>{ 
                console.log(res.data)
            }
        )
        setPreparar({on:false, id:''})
    }
    return(
        <Modal 
            open={preparar.on}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper sx={StyleModalFacturacion}>
                <Typography sx={{mb:2}} id="modal-modal-title" variant="h6" component="h2">
                    CLIENTE
                </Typography>
                <Typography   >
                <PersonOutlineOutlinedIcon sx={{mr:1}}/>
                    {preparar.on ? preparar.pedido.cliente.nombre : ''} 
                </Typography>
                <Typography   >
                <Fingerprint sx={{mr:1,}} />
                    {preparar.on ? preparar.pedido.cliente.dni : ''} 
                </Typography>
                <Typography sx={{mb:2, mt:2}} id="modal-modal-title" variant="h6" component="h2">
                    PEDIDO
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Producto</TableCell>
                            <TableCell align='left'>Precio</TableCell>
                            <TableCell align='left'>Cantidad</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            preparar.on
                            ?
                            preparar.pedido.orderproduct.map(item=>{
                                return(
                                    <TableRow>
                                        <TableCell align='left' sx={{borderBottom:'none'}}>{item.producto.nombre}</TableCell>
                                        <TableCell align='left' sx={{borderBottom:'none'}}>$ {item.producto.precio}</TableCell>
                                        <TableCell align='left' sx={{borderBottom:'none'}}><strong>x {item.cantidad}</strong></TableCell>
                                        

                                    </TableRow>

                                )
                            })
                            :
                            ''
                        }
                        <TableRow  >
                            <TableCell colspan={2} sx={{borderBottom:'none'}}>
                                Total
                            </TableCell>
                            <TableCell align='left' sx={{borderBottom:'none'}}>
                                {
                                    preparar.on 
                                    ?
                                    '$ ' + getTotalCost(preparar.pedido.orderproduct)
                                    :
                                    ''
                                }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <Button variant="contained" onClick={handleCloseOnClick}>
                                Facturado
                            </Button>
                        </TableRow>

                    </TableBody>
                    

                </Table>
                
                
            </Paper>
        </Modal>
    )
}


export default MostrarPedidoFacturacion