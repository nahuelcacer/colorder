import CardContent from '@mui/material/CardContent';
import { Button, Card, CardActions, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Fingerprint from '@mui/icons-material/Fingerprint';
import AddIcon from '@mui/icons-material/Add';

const ClienteSeleccionado = (props) => {
    const pedido = useSelector(state=>state.pedido)
   
    if(pedido.cliente === null){
        return(
            <div className="container">
                <Card sx={{ width: 300, mt:4, boxShadow:4, borderRadius:2 }}>
                    <CardContent>
                        <Typography><PersonOutlineOutlinedIcon sx={{mr:1}}/>...</Typography>
                        <Typography><Fingerprint sx={{mr:1}} />...</Typography>
                    </CardContent>
                    <CardActions>
                        
                        <Button color="primary" size="small" startIcon={<AddIcon/>}>Agregar cliente</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }else{
        return (
            <div className="container">
                <Card sx={{ width: 300, mt:4, boxShadow:4, borderRadius:2 }}>
                    <CardContent>
                        <Typography><PersonOutlineOutlinedIcon sx={{mr:1}}/>{pedido.cliente.nombre}</Typography>
                        <Typography><Fingerprint sx={{mr:1}} />{pedido.cliente.dni}</Typography>
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