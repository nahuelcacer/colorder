import { Modal, Typography } from "@mui/material"
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import StyleModal from "../../tools/styleModals";

const MostrarPedidoFacturacion = ({preparar, setPreparar}) => {
    const [pedido,setPedido] = useState({})
    const handleClose = () => {
        axios.get(`api/pedidos/${preparar.id}/`)
        .then(
            res=> {
                res.data.enPreparacion = false
                axios.put(`api/pedidos/${preparar.id}/`, res.data)
                .then(
                    res=>{
                        setPreparar({on:false,id:''})
                    }
                )
            }
        )
    
    };
    

    return(
        <Modal 
            open={preparar.on}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={StyleModal}>
                {
                preparar.pedido != null ?
                <Box>
                    {preparar.pedido.cliente.nombre}
                </Box>:<></>
                }
            </Box>
        </Modal>
    )
}


export default MostrarPedidoFacturacion