import { Button, Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import axios from "axios";
import { useState } from "react";
import getTotalCost from "../../tools/getTotalCost";
import StyleModal from '../../tools/styleModals';


const MostrarPedidoFacturacion = ({preparar, setPreparar}) => {
    const [pedido,setPedido] = useState({})
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
    

    return(
        <Modal 
            open={preparar.on}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper sx={StyleModal}>
                <Typography sx={{mb:2}} id="modal-modal-title" variant="h6" component="h2">
                    CLIENTE
                </Typography>
                <Typography   >
                    {preparar.on ? preparar.pedido.cliente.nombre : ''} 
                </Typography>
                <Typography   >
                    {preparar.on ? preparar.pedido.cliente.dni : ''} 
                </Typography>
                <Typography sx={{mb:2}} id="modal-modal-title" variant="h6" component="h2">
                    PEDIDO
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell >Producto</TableCell>
                            <TableCell >Precio</TableCell>
                            <TableCell >Cantidad</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            preparar.on
                            ?
                            preparar.pedido.orderproduct.map(item=>{
                                return(
                                    <TableRow>
                                        <TableCell align='center' sx={{borderBottom:'none'}}>{item.producto.nombre}</TableCell>
                                        <TableCell align='center' sx={{borderBottom:'none'}}>{item.producto.precio}</TableCell>
                                        <TableCell align='center' sx={{borderBottom:'none'}}>{item.cantidad}</TableCell>
                                        

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
                            <TableCell align='center' sx={{borderBottom:'none'}}>
                                {
                                    preparar.on 
                                    ?
                                    getTotalCost(preparar.pedido.orderproduct)
                                    :
                                    ''
                                }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <Button color="primary">
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