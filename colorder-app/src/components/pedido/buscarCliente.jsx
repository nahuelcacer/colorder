import { Box, Chip } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fecthClientes } from '../../features/clientes/clienteSlice.js';
import { selectCliente } from '../../redux/actions/clientes-action.js';


const BuscarCliente = () => {
  const clientes = useSelector(state => state.clientes)


  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(fecthClientes())

  }, [])
  const filterOptions = createFilterOptions({
    stringify: (option) => option.nombre + option.dni,
    limit: 5,
  });
  
  return (
    <Box sx={{paddingTop:'2rem'}}>

      <Autocomplete
        fullWidth
        disablePortal
        id="combo-box-demo"
        options={clientes.clientes.results}
        getOptionLabel={(option) => option.nombre}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.dni}>

              {option.nombre}
              {option.escribano ? <Chip sx={{ ml: 2 }} label="Esc" size="small" variant="outlined" /> : <></>}
            </li>
          );
        }}
        filterOptions={filterOptions}
        onChange={(event, newValue) => { dispatch(selectCliente(newValue)) }}
        renderInput={(params) => <TextField  {...params} label="Seleccionar cliente" />}
      />
    </Box>


  )
}
export default BuscarCliente;