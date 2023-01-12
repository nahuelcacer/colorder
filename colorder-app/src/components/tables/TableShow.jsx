import { FormControlLabel, Switch, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
const TableShow = ({datos, titulo, subtitulo, search, handleChange ,setChecked}) => {
    const [value, setValue] = useState(null)
    const hanledChange = (e) => {
        setChecked(e.target.checked)
       }
  return (
    <Table>
        <TableHead>
            {/* TITULO Y SUBTITULO */}
            <TableRow>
                <TableCell colSpan={3}>

                    <Typography variant='h6'>
                        {titulo}
                    </Typography>
                    <Typography color={'grey'}>
                        {subtitulo}
                    </Typography>
                </TableCell>
            </TableRow>
            {/* BUSCADOR Y SWITCHERS */}
            <TableRow>
                <TableCell>

                    <TextField id="standard-basic" placeholder='Buscar producto' variant="standard" 
                    onChange={handleChange}
                    value={search}
                    InputProps={{
                    disableUnderline: true,
                    startAdornment:
                    (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    }}
                    />
                </TableCell>
                <TableCell>
                    <FormControlLabel control={<Switch  onChange={(e)=>{hanledChange(e)}}/>} label="Recibidos" />
                </TableCell>
                <TableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Basic example"
                            value={value}
                            onChange={(newValue) => {
                            setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {datos.map(item=>{
                return(<TableRow>
                    <TableRow>
                        <TableCell>
                            {item.cliente.nombre}
                        </TableCell>
                    </TableRow>
                </TableRow>)
            })}
        </TableBody>
    </Table>
  )
}

export default TableShow