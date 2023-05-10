import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fecthClientes} from '../../features/clientes/clienteSlice.js'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {selectCliente} from '../../redux/actions/clientes-action.js';
import { createFilterOptions } from "@mui/material/Autocomplete";
import { Chip } from '@mui/material';


const BuscarCliente = () => {
    const [value,setValue] = useState("")
    const clientes = useSelector(state=>state.clientes)

    const dispatch = useDispatch()
    useEffect(()=>{

        dispatch(fecthClientes())
        
    },[])
    const filterOptions = createFilterOptions({
      stringify: (option) => option.nombre + option.dni,
      limit:5
    });
    return(
        <div className='container'>
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={clientes.clientes}
        getOptionLabel={(option) => option.nombre  }
        sx={{ width: 700, mt:3 }}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.dni}>
              
              {option.nombre}
              {option.escribano ?  <Chip sx={{ml:2}} label="Esc" size="small" variant="outlined" />:<></>}
            </li>
          );
        }}
        filterOptions={filterOptions}
        onChange={(event, newValue) => {dispatch(selectCliente(newValue))}}
        renderInput={(params) => <TextField  {...params} label="Seleccionar cliente" />}
        />
        </div>
    )
}
export default BuscarCliente;