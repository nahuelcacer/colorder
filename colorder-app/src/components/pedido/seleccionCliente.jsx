import CardContent from '@mui/material/CardContent';
import { Button, Card, CardActions, CardHeader, Chip, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux'
import React from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Fingerprint from '@mui/icons-material/Fingerprint';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import AgregarCliente from '../clientes/agregarCliente';
import EditarCliente from '../clientes/editarCliente';
import { borderBottom } from '@mui/system';

const ClienteSeleccionado = (props) => {
    const pedido = useSelector(state => state.pedido)
    const [open, setOpen] = useState(false)

    const isEscribano = (cliente) => {
        if (cliente.escribano) {
            return (
                <Typography color={'grey'}>
                    <Grid container spacing={0} style={{ display: 'flex', alignItems: 'center' }}>
                        <Grid item>Escribano</Grid>
                        <Grid item>
                            <div id="escState"></div>
                        </Grid>
                    </Grid>

                    <div>

                    </div>
                </Typography>
            )
        } else {

            return (
                <Typography>...</Typography>
            )
        }
    }
    return (
        <Card sx={{boxShadow:0, border: '1px solid #D9D9D9', marginTop:'1rem'}}>
            <CardHeader sx={{
                borderBottom: '1px solid #D9D9D9'
            }}
                subheader={
                    <Typography sx={{color:'#A0A0A0'}}
                    >
                        Selección de cliente
                    </Typography>
                }
            />

            <CardContent>
                <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    <Grid item xs={6}>
                        <Typography><PersonOutlineOutlinedIcon sx={{ mr: 1 }} />{pedido.cliente ? pedido.cliente.nombre : <>...</>}</Typography>

                    </Grid>
                    <Grid item xs={6}>
                        {
                            pedido.cliente ? isEscribano(pedido.cliente) : <>...</>
                        }


                    </Grid>

                </Grid>
                <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    <Grid item xs={6}>
                        <Typography><Fingerprint sx={{ mr: 1 }} />{pedido.cliente ? pedido.cliente.dni : <>...</>}</Typography>

                    </Grid>
                    <Grid item xs={6}>
                        {
                            pedido.cliente
                                ?
                                <>
                                    <Button size="small" onClick={() => { setOpen(true) }}>Ver cliente</Button>
                                    <EditarCliente open={open} setOpen={setOpen} idCliente={pedido.cliente.id} ></EditarCliente>

                                </>
                                :
                                <>
                                    <Button color="primary" size="small" onClick={() => { setOpen(true) }} startIcon={<AddIcon />}>Agregar cliente</Button>

                                    <AgregarCliente open={open} setOpen={setOpen}></AgregarCliente>
                                </>
                        }

                    </Grid>


                </Grid>

            </CardContent>
            <CardActions>


            </CardActions>
        </Card>
    )

    // if (pedido.cliente === null) {
    //     return (
    //         <div className="container">
    //             <Card sx={{ width: 415, mt: 4, boxShadow: 4, borderRadius: 2 }}>
    //                 <CardContent>
    //                     <Typography><PersonOutlineOutlinedIcon sx={{ mr: 1 }} />...</Typography>
    //                     <Typography><Fingerprint sx={{ mr: 1 }} />...</Typography>
    //                 </CardContent>
    //                 <CardActions>

    //                     <Button color="primary" size="small" onClick={() => { setOpen(true) }} startIcon={<AddIcon />}>Agregar cliente</Button>
    //                 </CardActions>
    //             </Card>
    //         </div>
    //     )
    // } else {
    //     return (
    //         <div className="container">
    //             <Card sx={{ width: 415, mt: 4, boxShadow: 4, borderRadius: 2 }}>
    //                 <CardContent>
    //                     <Typography><PersonOutlineOutlinedIcon sx={{ mr: 1 }} />{pedido.cliente.nombre}</Typography>
    //                     <Typography><Fingerprint sx={{ mr: 1 }} />{pedido.cliente.dni}</Typography>
    //                     {
    //                         pedido.cliente.escribano
    //                             ?
    //                             <Chip variant="outlined" label="Escribano/a" color="success" size="small" />
    //                             :
    //                             <></>
    //                     }
    //                 </CardContent>
    //                 <CardActions>
    //                     <Button size="small" onClick={() => { setOpen(true) }}>Ver cliente</Button>
    //                 </CardActions>
    //             </Card>
    //         </div>
    //     )
    // }

}
export default ClienteSeleccionado;