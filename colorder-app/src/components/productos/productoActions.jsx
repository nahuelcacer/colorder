import { Box, IconButton, Tooltip } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { localhost } from "../../services/service.pedidos";


const ActionsProductos = ({setEdit, params, getProductos}) => {
    const deleteProduct = (id) => { 
        axios.delete(`${localhost}api/productos/${id}/`)
        .then(res=>{
            getProductos()
            console.log(res.data)
        })

    }
    return (
        <Box>
            <Tooltip title="Editar producto">
                <IconButton onClick={() => setEdit({ on: true, id: params.id })}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar producto">
                <IconButton onClick={()=> {deleteProduct(params.id)}}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </Box>
    )
}


export default ActionsProductos