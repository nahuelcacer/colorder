import { Box, IconButton, Tooltip } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ClienteAccion = ({setOpen, params}) => {
    return (
        <Box>
            <Tooltip title="Editar cliente">
                <IconButton onClick={() => {setOpen({on:true, id:params.id}) }}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar cliente">
                <IconButton onClick={() => { }}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </Box>
    )
}



export default ClienteAccion