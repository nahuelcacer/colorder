import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react'

function BuscarCliente(){
    const [criterioBusqueda, setCriterioBusqueda] = useState([]);
    return (
        <>
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={criterioBusqueda}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
            
            />
        </>
    )
}
export default BuscarCliente