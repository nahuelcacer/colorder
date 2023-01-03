import { Modal, Box, Typography, TextField, Button, Alert } from "@mui/material"
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fecthClientes } from "../../features/clientes/clienteSlice";


const AgregarCliente = ({open, setOpen}) => {
    const handleClose = () => setOpen(false);
    const [cliente,setCliente] = useState({})
    const dispatch = useDispatch()
    const [alert, setAlert] = useState({on:false,tipo:"",texto:""})
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const hanledChange = (e) => {
        setCliente({
            ...cliente,
            [e.target.name] : e.target.value
          })
    }
    const addCliente =  () => {
        axios.post('api/clientes/', cliente)
        .then(res=>{
            setAlert({on:true, tipo:"success", texto:"Cliente agregado!"})
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
            <Box sx={style}>
                <Typography sx={{mb:2}} id="modal-modal-title" variant="h6" component="h2">
                    AGREGAR CLIENTE
                </Typography>
            
                <TextField sx={{mb:2}} name="nombre" onChange={(e)=>{hanledChange(e)}} fullWidth label="Nombre" id="fullWidth" />
                <TextField sx={{mb:2}} name="dni" onChange={(e)=>{hanledChange(e)}} fullWidth label="Dni" id="fullWidth" />

                <Button 
                variant="contained" 
                color="primary"
                onClick={addCliente}
                sx={{mb:2}}
                >
                Agregar
                </Button>
                {alert.on ? <Alert severity={alert.tipo}>{alert.texto}</Alert>:<></>}
            </Box>
        </Modal>
    )

}

export default AgregarCliente