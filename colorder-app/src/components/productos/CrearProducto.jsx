import { Box, Button, Checkbox, FormControlLabel, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import {StyleModal} from '../../tools/styleModals';

const CrearProducto = ({open, setOpen, updateProductos}) => {
    const handleClose = () => setOpen(false);
    const [producto,setProducto] = useState({})
    const hanledChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name] : e.target.value
          })
    }
    const handleChangeCheckBox = (event) => {
        setProducto({
            ...producto,
            ['notarial']:event.target.checked
        });
      };
    const addProducto = () => {
        axios.post('api/productos/', producto)
        .then((res)=>{
            updateProductos()
            console.log(res)
            setOpen(false)
        })
    }
    return (
        <Modal 
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={StyleModal}>
                <Typography sx={{mb:2}} id="modal-modal-title" variant="h6" component="h2">
                    CREAR PRODUCTO
                </Typography>
                <TextField sx={{mb:2}} name="nombre" onChange={(e)=>{hanledChange(e)}} fullWidth label="Nombre" id="fullWidth" />
                <TextField sx={{mb:2}} name="precio" onChange={(e)=>{hanledChange(e)}} fullWidth label="Precio" id="fullWidth" />
                <TextField sx={{mb:2}} name="tramite" onChange={(e)=>{hanledChange(e)}} fullWidth label="Tiempo de espera" id="fullWidth" />
                <div><FormControlLabel
                value={true}
                control={<Checkbox name="escribano" onChange={handleChangeCheckBox}/>}
                label="Es Notarial?"
                >

                </FormControlLabel></div>
                <Button 
                variant="contained" 
                color="primary"
                onClick={addProducto}
                sx={{mb:2,mt:2}}
                >
                Crear
                </Button>
            </Box>
        </Modal>
    )
}

export default CrearProducto