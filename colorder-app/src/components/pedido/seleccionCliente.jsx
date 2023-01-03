import CardContent from '@mui/material/CardContent';
import { Button, Card, CardActions, Typography } from '@mui/material';
import { useSelector } from 'react-redux'
import React from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Fingerprint from '@mui/icons-material/Fingerprint';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import AgregarCliente from '../clientes/agregarCliente';
import EditarCliente from '../clientes/editarCliente';

const ClienteSeleccionado = (props) => {
    const pedido = useSelector(state=>state.pedido)
    const [open, setOpen] = useState(false)
    if(pedido.cliente === null){
        return(
            <div className="container">
                <Card sx={{ width: 415, mt:4, boxShadow:4, borderRadius:2 }}>
                    <CardContent>
                        <Typography><PersonOutlineOutlinedIcon sx={{mr:1}}/>...</Typography>
                        <Typography><Fingerprint sx={{mr:1}} />...</Typography>
                    </CardContent>
                    <CardActions>
                        
                        <Button color="primary" size="small" onClick={()=>{setOpen(true)}} startIcon={<AddIcon/>}>Agregar cliente</Button>
                    </CardActions>
                </Card>
                <AgregarCliente open={open} setOpen={setOpen}></AgregarCliente>
            </div>
        )
    }else{
        return (
            <div className="container">
                <Card sx={{ width: 415, mt:4, boxShadow:4, borderRadius:2 }}>
                    <CardContent>
                        <Typography><PersonOutlineOutlinedIcon sx={{mr:1}}/>{pedido.cliente.nombre}</Typography>
                        <Typography><Fingerprint sx={{mr:1}} />{pedido.cliente.dni}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small"  onClick={()=>{setOpen(true)}}>Ver cliente</Button>
                    </CardActions>
                </Card>
                <EditarCliente open={open} setOpen={setOpen} idCliente={pedido.cliente.id}></EditarCliente>
            </div>
        )
    }
    
}
export default ClienteSeleccionado;