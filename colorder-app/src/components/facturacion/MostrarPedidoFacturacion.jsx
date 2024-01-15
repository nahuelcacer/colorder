import Fingerprint from '@mui/icons-material/Fingerprint';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Button, Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { actualizarEstadoPedidoEnFacturaTrue, actualizarEstadoPedidoEnPreparacionFalse } from "../../services/apiFunctions";
import getTotalCost from "../../tools/getTotalCost";
import { StyleModalFacturacion } from '../../tools/styleModals';


const MostrarPedidoFacturacion = ({preparar, setPreparar}) => {
   
    const handleClose = () => {
        actualizarEstadoPedidoEnPreparacionFalse(preparar.id)
        setPreparar({on:false,id:''})
    }

    const actualizarEstadoFactura = () => {
        actualizarEstadoPedidoEnFacturaTrue(preparar.id)
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
                                    <TableRow key={item.id}>
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
                            <TableCell sx={{borderBottom:'none'}}>
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
                            <Button variant="contained" onClick={actualizarEstadoFactura}>
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