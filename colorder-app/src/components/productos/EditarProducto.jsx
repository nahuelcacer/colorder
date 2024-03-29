import { Box, Button, Checkbox, FormControlLabel, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { localhost } from '../../services/service.pedidos';
import {StyleModal} from '../../tools/styleModals';

const EditarProducto = ({edit,setEdit,updateProductos,id}) => {
    const handleClose = () => setEdit({on:false,id:''});
    const [pr,setPr] = useState({nombre:"",precio:"",tramite:"",notarial:false})
    useEffect(()=>{
        axios
        .get(`${localhost}api/productos/${id}`)
        .then(res=>{
            setPr(res.data)
        })
    },[id])
    
    const hanledChange = (e) => {
        setPr({
            ...pr,
            [e.target.name] : e.target.value
          })
    }
    const handleChangeCheckBox = (event) => {
        setPr({
            ...pr,
            ['notarial']:event.target.checked
        });
      };
    const updateProduct = () => {
        axios.put(`${localhost}api/productos/${id}/`,pr)
        .then(res=>{
            updateProductos()
            console.log(res)
            setEdit({on:false,id:''})

        })
    }
    return (
        <Modal 
            open={edit}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={StyleModal}>
                <Typography sx={{mb:2}} id="modal-modal-title" variant="h6" component="h2">
                    CREAR PRODUCTO
                </Typography>
                <TextField sx={{mb:2}} name="nombre" value={pr.nombre} onChange={(e)=>{hanledChange(e)}} fullWidth  placeholder="Nombre" id="fullWidth" />
                <TextField sx={{mb:2}} name="precio" value={pr.precio} onChange={(e)=>{hanledChange(e)}} fullWidth  placeholder="Precio" id="fullWidth" />
                <TextField sx={{mb:2}} name="tramite" value={pr.tramite} onChange={(e)=>{hanledChange(e)}} fullWidth  placeholder="Tiempo de espera" id="fullWidth" />
                <div><FormControlLabel
                value={true}
                control={<Checkbox name="notarial" checked={pr.notarial} onChange={handleChangeCheckBox}/>}
                label="Es notarial?"
                >

                </FormControlLabel></div>
                <Button 
                variant="contained" 
                color="primary"
                onClick={updateProduct}
                sx={{mb:2,mt:2}}
                >
                Editar
                </Button>
            </Box>
        </Modal>
    )
}

export default EditarProducto