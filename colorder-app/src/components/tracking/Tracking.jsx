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
import { Toaster, toast } from "react-hot-toast"
import { useParams } from "react-router-dom";
const Tracking = () => {
    const { id: trackinAnchorID } = useParams()
    const [searchTracking, setSearchTracking] = useState(null)
    const [steps, setSteps] = useState([])
    const [activeStep, setActiveStep] = useState({ activeStep: null, sector: null })
    const [pedido, setPedido] = useState(null)
    const [tracking, setTracking] = useState(null)


    const searchOrderfromAnchor = (id) => {
        axios.get(`${localhost}api/find/${id}`)
            .then(res => {
                setActiveStep({ activeStep: res.data.last_tracking.sector.step_id.id, sector: res.data.last_tracking.sector.name })
                setPedido(res.data)
                console.log(res.data)
            })
            .catch(err => {
                setPedido(null)
                setTracking(null)
                setActiveStep({ activeStep: null, sector: null, data: null })
                toast.error(`No se encontró el pedido ${id}`)
            })
    }
    const searchOrder = (id) => {
        const newId = id.trim()

        if (newId === "" || newId === "0") {
            setPedido(null)
            setTracking(null)
            setActiveStep({ activeStep: null, sector: null, data: null })
        }
        else {
            searchOrderfromAnchor(newId)

        }
    }
    const getSteps = async () => {
        try {
            const response = await fetch(`${localhost}api/steps/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSteps(data);
        } catch (error) {
            console.error('Error fetching steps:', error);
        }
    };

    useEffect(() => {
        getSteps()
        if (trackinAnchorID) { searchOrderfromAnchor(trackinAnchorID) }
    }, [])

    return (
        <Container >
            <Toaster
                position="top-right"
                reverseOrder={false}>
            </Toaster>
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

            <Box sx={{ width: '100%', mt: 10 }}>
                <h2>Estado</h2>
                <Stepper sx={{ width: '500px' }} activeStep={activeStep.activeStep - 1 ?? 0} alternativeLabel>
                    {steps.map((step, index) => (
                        <Step key={step.name}>
                            <StepLabel>
                                {step.name}
                                <br />
                                {activeStep.activeStep -1 === index && (
                                    <>
                                        <p style={{fontSize:'12px', padding:'0px'}}>
                                            {activeStep.sector}
                                        </p>
                                        <p style={{fontSize:'12px', padding:'0px'}}>
                                            {formatDate(pedido.last_tracking.created_at)}
                                        </p>
                                        <p style={{fontSize:'12px', padding:'0px'}}>
                                            {formatTime(pedido.last_tracking.tiempo)}
                                        </p>
                                    </>
                                )}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box>
                    <ul style={{color:'grey'}}>
                        {pedido ? pedido.history_tracking.map((track, index) => {
                            return (
                                <li style={{display:'flex', gap:'30px'}} key={index}>
                                    <span>{index}</span>
                                    <span>{track.sector.name}</span>
                                    <span>{track.created_at}</span>
                                    <span>{track.tiempo}</span>
                                </li>
                            )
                        }).reverse():<></>}
                    </ul>
                </Box>
            </Box>
            <Box sx={{ width: "100%", mt: 10 }}>
                <h2>Pedido</h2>
                {
                    pedido !== null
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