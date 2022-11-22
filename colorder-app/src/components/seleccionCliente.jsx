import CardContent from '@mui/material/CardContent';
import { Button, Card, CardActions, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Fingerprint from '@mui/icons-material/Fingerprint';

const ClienteSeleccionado = (props) => {
    const pedido = useSelector(state=>state.pedido)
   
    if(pedido.cliente === null){
        return(
            <div className="container">
                <Card sx={{ 
                    minWidth: 275,
                    boxShadow: 1
                     
                    }}>
                    <CardContent>
                        <div className='row'>
                            <div className='col-12'>Seleccione un cliente</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }else{
        return (
            <div className="container">
                <Card sx={{ width: 300, mt:4, boxShadow:4, borderRadius:2 }}>
                    <CardContent>
                        <Typography><PersonOutlineOutlinedIcon sx={{mr:1}}/>{pedido.cliente.nombre}</Typography>
                        <Typography><Fingerprint sx={{mr:1}} />{pedido.cliente.identificacion}</Typography>
                        
                    </CardContent>
                    <CardActions>
                        <Button size="small">Ver cliente</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
    
}
export default ClienteSeleccionado;