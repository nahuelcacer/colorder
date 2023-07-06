import { Alert, Box, Button, Checkbox, FormControlLabel, Modal, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { localhost } from "../../services/service.pedidos"
import { StyleModal } from "../../tools/styleModals"


const EditarCliente = ({ open, setOpen, idCliente, getClientes }) => {
    const [cliente, setCliente] = useState({ nombre: "", dni: "", escribano: false, telefono: "" })
    const handleClose = () => setOpen(false);
    const [alert, setAlert] = useState({ on: false, tipo: "", texto: "" })
    const [invalidTelefono, setInvalidTelefono] = useState({
        isNotNumber: false,
        isNotLarge: false
    })
    const [invalidDni, setInvalidDni] = useState({
        isNotNumber: false,
        isNotLarge: false
    })
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get(`${localhost}api/clientes/${idCliente}`)
            .then(res => {
                setCliente(res.data)
            })
    }, [open])

    const hanledChange = (e) => {
        const { name, value, type, checked } = e.target
        if (name === 'telefono' && value !== "" && !/^\d+$/.test(value)) {
            setInvalidTelefono({ isNotNumber: true })
            return cliente.telefono
        }
        setInvalidTelefono({ isNotNumber: false })
        if (name === "telefono" && value.length >= 15) {
            setInvalidTelefono({ isNotLarge: true })
            return cliente.telefono
        }
        setInvalidTelefono({ isNotLarge: false })

        if (name === 'dni' && value !== "" && !/^\d+$/.test(value)) {
            setInvalidDni({ isNotNumber: true })
            return cliente.dni
        }
        setInvalidDni({ isNotNumber: false })
        if (name === "dni" && value.length >= 12) {
            setInvalidDni({ isNotLarge: true })
            return cliente.dni
        }
        setInvalidDni({ isNotLarge: false })


        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }
    const handleChangeCheckBox = (event) => {
        setCliente({
            ...cliente,
            ['escribano']: event.target.checked
        });
    };

    const editarCliente = () => {
        axios.put(`${localhost}api/clientes/${idCliente}/`, cliente)
            .then(res => {
                setAlert({ on: true, tipo: "success", texto: "Cliente editado!" })
                setTimeout(() => (
                    setAlert({ on: false, tipo: "", texto: "" })

                ), 1000)
                // getClientes()
                setTimeout(() => (

                    setOpen(false)
                ), 1000)
            })
            .catch(res => {
                setAlert({ on: true, tipo: "warning", texto: "Ocurrio un error" })
                setTimeout(() => (setAlert({ on: false, tipo: "", texto: "" })), 4000)
                console.log(res)

            })
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
                    EDITAR CLIENTE
                </Typography>
                <TextField
                    sx={{ mb: 2 }}
                    value={cliente.nombre}
                    name="nombre"
                    onChange={(e) => { hanledChange(e) }}
                    fullWidth
                    label="Nombre"
                    id="fullWidth" />
                <TextField
                    sx={{ mb: 2 }}
                    value={cliente.dni}
                    name="dni"
                    onChange={(e) => { hanledChange(e) }}
                    fullWidth
                    label="Dni"
                    id="fullWidth"
                    error={invalidDni.isNotNumber || invalidDni.isNotLarge}
                    helperText={
                        invalidDni.isNotNumber ?
                            <Typography variant="string" sx={{ color: 'red' }}>Solo se permiten numeros</Typography>
                            :
                            (
                                invalidDni.isNotLarge
                                    ?
                                    <Typography variant="string" sx={{ color: 'red' }}>Maximo 11 caracteres</Typography>
                                    :
                                    ""
                            )

                    }
                />
                <TextField
                    sx={{ mb: 2 }}
                    value={cliente.telefono}
                    name="telefono"
                    onChange={(e) => { hanledChange(e) }}
                    fullWidth
                    label="Telefono"
                    id="fullWidth"
                    error={invalidTelefono.isNotNumber || invalidTelefono.isNotLarge}
                    helperText={
                        invalidTelefono.isNotNumber ?
                            <Typography variant="string" sx={{ color: 'red' }}>Solo se permiten numeros</Typography>
                            :
                            (
                                invalidTelefono.isNotLarge
                                    ?
                                    <Typography variant="string" sx={{ color: 'red' }}>Maximo 15 caracteres</Typography>
                                    :
                                    ""
                            )

                    }
                />
                <div><FormControlLabel
                    value={true}
                    control={<Checkbox name="escribano" checked={cliente.escribano} onChange={handleChangeCheckBox} />}
                    label="Es escribano?"
                >

                </FormControlLabel></div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={editarCliente}
                    sx={{ mb: 2, mt: 2 }}
                >
                    Editar
                </Button>
                {alert.on ? <Alert severity={alert.tipo}>{alert.texto}</Alert> : <></>}

            </Box>
        </Modal>
    )

}

export default EditarCliente