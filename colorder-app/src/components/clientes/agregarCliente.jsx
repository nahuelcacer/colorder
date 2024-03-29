import { Alert, Box, Button, Checkbox, FormControlLabel, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { localhost } from "../../services/service.pedidos";
import { StyleModal } from "../../tools/styleModals";


const AgregarCliente = ({ open, setOpen, getClientes}) => {
    const handleClose = () => setOpen(false);
    const [cliente, setCliente] = useState({})
    const dispatch = useDispatch()
    const [alert, setAlert] = useState({ on: false, tipo: "", texto: "" })
    const [isTelefonoInvalid, setIsTelefonoInvalid] = useState(false)
    const [isNotNumber, setIsNotNumber] = useState(false)
    const [isDniInvalid, setIsInvalidDni] = useState(false)
    const [isNotNumberDni, setIsNotNumberDni] = useState(false)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        if (name === 'telefono' && value !== "" && !/^\d+$/.test(value)) {
            setIsNotNumber(true)
            return cliente.telefono
        }
        setIsNotNumber(false)
        if (name === 'telefono' && value.length >= 15) {
            setIsTelefonoInvalid(true)
            return cliente.telefono;
        }
        setIsTelefonoInvalid(false)



        if (name === 'dni' && value !== "" && !/^\d+$/.test(value)) {
            setIsNotNumberDni(true)
            return cliente.dni
        }
        setIsNotNumberDni(false)


        if (name === 'dni' && value.length >= 12) {
            setIsInvalidDni(true)
            return cliente.dni;
        }
        setIsInvalidDni(false)
        const clValue = type === 'checkbox' ? checked : value
        setCliente({
            ...cliente,
            [name]: clValue
        })
    }
    const addCliente = () => {
        axios.post(`${localhost}api/clientes/`, cliente)
            .then(res => {
                setCliente({})
                setAlert({ on: true, tipo: "success", texto: "Cliente agregado!" })

                setTimeout(() => (
                    setAlert({ on: false, tipo: "", texto: "" })
                ), 1000)
                setTimeout(() => (

                    setOpen(false)
                ), 1000)
                getClientes()
            })
            .catch(res => {
                console.log(res)
                if (res.response) {
                    // Error de respuesta del servidor (código de estado no 2xx)
                    const errorMessage = res.response.data.message;
                    setAlert({ on: true, tipo: "warning", texto: errorMessage });
                    setTimeout(() => (
                        setAlert({ on: false, tipo: "", texto: "" })
                    ), 4000)
                } else if (res.request) {
                    // Error de solicitud (sin respuesta del servidor)
                    setAlert({ on: true, tipo: "warning", texto: "Error de conexión. Inténtalo de nuevo más tarde." });
                    setTimeout(() => (
                        setAlert({ on: false, tipo: "", texto: "" })
                    ), 4000)
                } else {
                    // Otro tipo de error
                    setAlert({ on: true, tipo: "warning", texto: "Error al agregar el cliente. Inténtalo de nuevo más tarde." });
                    setTimeout(() => (
                        setAlert({ on: false, tipo: "", texto: "" })
                    ), 4000)
                }
            });
    }
    return (

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={StyleModal}>
                <Typography sx={{ mb: 2 }} id="modal-modal-title" variant="h6" component="h2">
                    AGREGAR CLIENTE
                </Typography>

                <TextField sx={{ mb: 2 }}
                    name="nombre"
                    onChange={(e) => { handleChange(e) }}
                    fullWidth
                    label="Nombre"
                    id="fullWidth" />
                <TextField sx={{ mb: 2 }}
                    name="dni"
                    onChange={(e) => { handleChange(e) }}
                    fullWidth
                    label="Dni/Cuit"
                    value={cliente.dni || ''}
                    id="fullWidth"
                    error={isDniInvalid || isNotNumberDni}
                    helperText={isDniInvalid ? <Typography variant="string" sx={{ color: 'red' }}>Maximo 11 caracteres</Typography> : (isNotNumberDni ? <Typography variant="string" sx={{ color: 'red' }}>Solo se permiten numeros</Typography> : "")}
                />
                <TextField sx={{ mb: 2 }}
                    name="telefono"
                    value={cliente.telefono || ''}
                    onChange={(e) => { handleChange(e) }}
                    fullWidth
                    label="Telefono"
                    id="fullWidth"
                    error={isTelefonoInvalid || isNotNumber}
                    helperText={
                        isTelefonoInvalid
                            ?
                            <Typography variant="string" sx={{ color: 'red' }}>Maximo 15 caracteres</Typography>
                            :
                            (isNotNumber ? <Typography variant="string" sx={{ color: 'red' }}>Solo se permiten numeros</Typography>
                                :
                                ""
                            )
                    }
                />

                <div><FormControlLabel
                    value={true}
                    control={<Checkbox name="escribano" onChange={(e) => { handleChange(e) }} />}
                    label="Es escribano?"
                >

                </FormControlLabel></div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addCliente}
                    sx={{ mb: 2, mt: 2 }}
                >
                    Agregar
                </Button>
                {alert.on ? <Alert severity={alert.tipo}>{alert.texto}</Alert> : <></>}
            </Box>
        </Modal>
    )

}

export default AgregarCliente