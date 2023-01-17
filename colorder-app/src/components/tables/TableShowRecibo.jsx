import { Badge, Button, Chip, FormControlLabel, Switch, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import styleIdCliente from "../../tools/styleIdentificacion";
import getTotalCost from "../../tools/getTotalCost";
import axios from "axios";
import { updatePedidoRecibo } from "../../services/service.pedidos";

const TableShowRecibo = (
    {
        datos,
        titulo,
        subtitulo,
        search,
        handleChange,
        setChecked,
        nombreSwitch,
        setFecha,
        fecha,
        setRecibir }
    ) => {

    const hanledChange = (e) => {
        setChecked(e.target.checked)
    }
    const Recibir = (pedido) => {
        updatePedidoRecibo(pedido)
        .then(res=>{
            setRecibir({
                on:true,
                pedido:res.data
            })
        })
    }
    return (
        <Table >
            <TableHead>
                {/* TITULO Y SUBTITULO */}
                <TableRow>
                    <TableCell colSpan={5}>

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
                    <TableCell colSpan={2}>

                        <TextField sx={{
                            backgroundColor: '#f0f0f0',
                            width: '100%',
                            borderRadius: '8px'
                        }} id="standard-basic" placeholder='Buscar pedido' variant="standard"
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
                        <FormControlLabel control={<Switch onChange={(e) => { hanledChange(e) }} />} label={nombreSwitch} />
                    </TableCell>
                    <TableCell>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker
                                label="Seleccione una fecha"
                                value={fecha}
                                onChange={(newValue) => {
                                    setFecha(newValue)
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {datos.map(pedido => {
                    return (
                        <TableRow key={pedido.id}>
                            <TableCell align='center' sx={{ padding: 1 }}>
                                <Typography><strong>{pedido.orden}</strong></Typography>
                                <Typography variant='overline' color={'grey'}>{pedido.fecha}</Typography>
                                <div><Typography variant='caption' color={'grey'}> {pedido.tiempo.substr(0, 5)} hs</Typography></div>
                                {pedido.factura ? <Chip label='Facturado' size="small" color='success' />: <></>}
                            </TableCell>
                            <TableCell align='center' sx={{ padding: 0 }}>
                                <Typography><strong>{pedido.cliente.nombre}</strong></Typography>
                                <Typography>{styleIdCliente(pedido.cliente.dni)}</Typography>
                                {pedido.cliente.escribano ? <Chip label="Esc" size="small" color='primary' variant="outlined" /> : <></>}

                            </TableCell>
                            <TableCell align='center' sx={{ padding: 0 }}>
                                <Typography><strong>{getTotalCost(pedido.orderproduct).toLocaleString('es-ar', {
                                    style: 'currency',
                                    currency: 'ARS',
                                    minimumFractionDigits: 2
                                })}</strong></Typography>
                            </TableCell>
                            <TableCell align='center' sx={{ padding: 0 }}>
                                {pedido.recibo
                                    ?
                                    <>
                                    </>
                                    :
                                    <Button onClick={(e) => { Recibir(pedido) }} variant="contained" color="primary">Recibido</Button>
                                }
                            </TableCell>



                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )

}


export default TableShowRecibo