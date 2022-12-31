import { Button } from "@mui/material"
import Alert from '@mui/material/Alert';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fecthPedidos } from "../features/pedidos/pedidoshowSlice";
import {connect} from 'react-redux'

const Imprimir = () => {
    const pedido = useSelector(state=>state.pedido)
    const [alert, setAlert] = useState(false)
    const [warning, setWarning] = useState(false)

    const data = {
        cliente:pedido.cliente,
        orderproduct:pedido.orderproduct,
    }
    const addPedido = () => {
        console.log(data)
        axios.post('/api/pedidos/', data)
        .then(res=>{
            setAlert(true)
            setTimeout(()=>(setAlert(false)), 4000)
            console.log(res)
        })
        .catch(res=>{
            setWarning(true)
            setTimeout(()=>(setWarning(false)), 4000)
            console.log(res)
        })

    }
    return(
        <>
            {alert ? <Alert severity='success' sx={{mt:2, mb:2}}>Pedido Añadido</Alert> : <></>}
            {warning ? <Alert severity='warning' sx={{mt:2, mb:2}}>Ocurrio un problema</Alert> : <></>}
            <Button variant="contained" onClick={addPedido}>Imprimir</Button>
        </>
    )
}
const mapStateToProps = (state) => ({
    // Asigna una propiedad al componente con un dato del estado de la aplicación.
    pedido: state.pedido
  });
  
  const mapDispatchToProps = (dispatch) => ({
    // Asigna una propiedad al componente con una acción de la aplicación.
    fecthPedidos: () => dispatch(fecthPedidos())
  });
export default connect(mapStateToProps, mapDispatchToProps)(Imprimir);
