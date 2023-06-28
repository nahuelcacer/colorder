import { Box, IconButton, Tooltip } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ClienteAccion = () => {
    return (
        <Box>
            <Tooltip title="Editar producto">
                <IconButton onClick={() => { }}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar producto">
                <IconButton onClick={() => { }}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </Box>
    )
}



export default ClienteAccion