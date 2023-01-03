import { Alert, Box, Button, Checkbox, FormControlLabel, Modal, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import StyleModal from "../../tools/styleModals"


const EditarCliente =  ({open,setOpen, idCliente}) => {
    const [cliente,setCliente] = useState(null)
    const handleClose = () => setOpen(false);

    useEffect(()=>{
        axios.get(`api/clientes/${idCliente}`)
        .then(res=>{
            setCliente(res.data)
        }) 
    },[])
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
            
                
            </Box>
        </Modal>
    )

}

export default EditarCliente