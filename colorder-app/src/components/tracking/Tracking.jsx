import { Box, Button, Chip, Container, Grid, IconButton, InputAdornment, List, ListItem, ListItemText, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { localhost } from "../../services/service.pedidos"
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Fingerprint from '@mui/icons-material/Fingerprint';
import { formatDate } from "../../tools/formatedDate";
import getTotalCost from "../../tools/getTotalCost";
import { formatTime } from "../../tools/formatTime";

const Tracking = () => {
    const [searchTracking, setSearchTracking] = useState(null)
    const [steps, setSteps] = useState([])
    const [activeStep, setActiveStep] = useState({ activeStep: null, sector: null })
    const [pedido, setPedido] = useState(null)
    const [tracking, setTracking] = useState(null)
    useEffect(() => {
        axios.get(`${localhost}api/steps`)
            .then(res => {
                console.log(res.data)
                setSteps(res.data)
            })
    }, [])
    const searchOrder = (id) => {
        if (id === "") {
            setPedido(null)
        }
        axios.get(`${localhost}api/pedidopost/${id}`)
            .then(res => {
                console.log(res.data)
                setPedido(res.data)
            })
        axios.get(`${localhost}api/tracking?pedido_id=${id}`)
            .then(res => {
                let last = res.data.length - 1 
                setTracking(res.data[last])
                let data = res.data[last]
                axios.get(`${localhost}api/sectors/${res.data[last].sector_id}`)
                    .then(res => {
                        console.log(res.data)
                        setActiveStep({ activeStep: res.data.step_id.id - 1, sector: res.data.name, data: data })
                    })
            })
    }
    return (
        <Container >
            <Box sx={{ mt: 2 }}>
                <h2>Seguimiento</h2>
                <Box sx={{ color: 'text.secondary' }}>Para realizare una busqueda ingresa el tracking id</Box>
                <TextField
                    placeholder="Id del pedido"
                    onChange={(e) => { setSearchTracking(e.target.value) }}
                    sx={{ width: "100%" }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            searchOrder(searchTracking)
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton >
                                    <SearchIcon onClick={() => { searchOrder(searchTracking) }} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                >
                </TextField>
            </Box>

            {/* <Button variant="contained" onClick={() => { searchOrder(searchTracking) }}>Buscar</Button> */}
            <Box sx={{ width: '100%', mt: 10 }}>
                <h2>Estado</h2>
                <Stepper activeStep={activeStep.activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={label.name}>
                            <StepLabel>
                                {label.name}
                                <br></br>
                                {
                                    activeStep.activeStep === index
                                        ?
                                        <>
                                            <Typography variant="body2" gutterBottom>
                                                {activeStep.sector}
                                            </Typography>
                                            <Typography variant="caption" display="block" gutterBottom>
                                                {formatDate(activeStep.data.created_at)}
                                            </Typography>
                                            <Typography variant="caption" display="block" gutterBottom>
                                                {formatTime(tracking.tiempo)}

                                            </Typography>
                                        </>
                                        :
                                        <></>
                                }
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <Box sx={{ width: "100%", mt: 10 }}>
                <h2>Pedido</h2>
                {
                    pedido != null
                        ?
                        <Grid container spacing={2} sx={{ borderRadius: 2, boxShadow: 1, p: 2, maxHeight: "300px", overflow: 'auto' }}>
                            <Grid item xs={12} md={6}>

                                <Box>
                                    <Box sx={{ color: 'text.secondary', mt: 2 }}>Cliente</Box>

                                    <Typography><PersonOutlineOutlinedIcon sx={{ mr: 1 }} />{pedido.cliente.nombre}</Typography>
                                    <Typography><Fingerprint sx={{ mr: 1 }} />{pedido.cliente.dni}</Typography>
                                    {
                                        pedido.cliente.escribano
                                            ?
                                            <Chip variant="outlined" label="Escribano/a" color="success" size="small" />
                                            :
                                            <></>
                                    }
                                    <Box sx={{ color: 'text.secondary', mt: 2 }}>Items</Box>
                                    <Box >
                                        <List sx={{
                                            width: '100%',
                                            maxWidth: 360,
                                            bgcolor: 'background.paper',
                                            position: 'relative',
                                            '& ul': { padding: 0 },
                                        }}>
                                            {pedido.orderproduct.map((item) => (
                                                <ListItem key={item.id}>
                                                    <ListItemText
                                                        primary={item.producto.nombre}
                                                        secondary={
                                                            <>
                                                                <Typography
                                                                    sx={{ display: 'inline' }}
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="text.primary"
                                                                >
                                                                    Precio: {item.producto.precio}
                                                                </Typography>
                                                                . - Cantidad: {item.cantidad}
                                                            </>
                                                        }
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ color: 'text.secondary', mt: 2 }}>Total</Box>
                                $ {getTotalCost(pedido.orderproduct)}
                                <Box sx={{ color: 'text.secondary', mt: 2 }}>Fecha</Box>
                                {formatDate(pedido.fecha)} - {formatTime(pedido.tiempo)}
                                <Box sx={{ color: 'text.secondary', mt: 2 }}>Estado</Box>
                                {pedido.factura ? <Chip label='Facturado' size="small" color='success' /> : <></>}
                                {pedido.recibo ? <Chip label='Recibido' size="small" color='success' /> : <></>}



                            </Grid>
                        </Grid>
                        :
                        <Box sx={{ color: 'text.secondary' }}>No se realizo una busqueda</Box>

                }
            </Box>
        </Container >
    )
}


export default Tracking