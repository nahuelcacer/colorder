import { Alert, Box, Button, Checkbox, FormControlLabel, Modal, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { fecthClientes } from "../../features/clientes/clienteSlice"
import {StyleModal} from "../../tools/styleModals"


const EditarCliente =  ({open,setOpen, idCliente}) => {
    const [cliente,setCliente] = useState({nombre:"", dni:"", escribano:false})
    const handleClose = () => setOpen(false);
    const [alert, setAlert] = useState({on:false,tipo:"",texto:""})

    const dispatch = useDispatch()
    useEffect(()=>{
        axios.get(`api/clientes/${idCliente}`)
        .then(res=>{
            setCliente(res.data)
        }) 
    },[])
    const hanledChange = (e) => {
        setCliente({
            ...cliente,
            [e.target.name] : e.target.value
          })
    }
    const handleChangeCheckBox = (event) => {
        setCliente({
            ...cliente,
            ['escribano']:event.target.checked
        });
      };

    const editarCliente = () => {
        axios.put(`api/clientes/${idCliente}/`,cliente)
        .then(res=>{
            setAlert({on:true, tipo:"success", texto:"Cliente editado!"})
            setTimeout(()=>(
                setAlert({on:false,tipo:"",texto:""})
                ), 1000)
            setTimeout(()=>(

                setOpen(false)
            ),1000)
            dispatch(fecthClientes())
        })
        .catch(res=>{
            setAlert({on:true, tipo:"warning", texto:"No se pudo agregar"})
            setTimeout(()=>(setAlert({on:false,tipo:"",texto:""})), 4000)
            console.log(res)
        
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
                    EDITAR CLIENTE
                </Typography>
                <TextField sx={{mb:2}} value={cliente.nombre} name="nombre" onChange={(e)=>{hanledChange(e)}} fullWidth label="Nombre" id="fullWidth" />
                <TextField sx={{mb:2}} value={cliente.dni} name="dni" onChange={(e)=>{hanledChange(e)}} fullWidth label="Dni" id="fullWidth" />
                <div><FormControlLabel
                value={true}
                control={<Checkbox name="escribano" checked={cliente.escribano} onChange={handleChangeCheckBox}/>}
                label="Es escribano?"
                >

                </FormControlLabel></div>
                <Button 
                variant="contained" 
                color="primary"
                onClick={editarCliente}
                sx={{mb:2,mt:2}}
                >
                Editar
                </Button>
                {alert.on ? <Alert severity={alert.tipo}>{alert.texto}</Alert>:<></>}

            </Box>
        </Modal>
    )

}

export default EditarCliente