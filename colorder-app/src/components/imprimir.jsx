import { Button } from "@mui/material"
import Alert from '@mui/material/Alert';
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Imprimir = () => {
    const pedido = useSelector(state=>state.pedido)
    const [alert, setAlert] = useState(false)
    const addPedido = () => {
        axios({
            method:'POST',
            url:'/api/pedidos/',
            data:{
                cliente:pedido.cliente.identificacion,
                factura:pedido.facturado,
                recibo:pedido.cobrado
            }
        }).then((res)=>{
            // SI SE CREO
            
            if(res.status == 201){
                setAlert(true)
                setTimeout(()=>(setAlert(false)), 3000)
            }
            pedido.carrito.map((item)=>{
                axios({
                    method:'POST',
                    url:'/api/orderproducts/',
                    data:{
                        pedido:res.data.id,
                        producto:item.producto.id,
                        cantidad:item.cantidad
                    }
                }).then((res)=>{console.log(res)}).catch((res)=>{console.log(res)})
            })
        }).catch((err)=>{console.log(err)})
    }
    return(
        <>
            {alert ? <Alert severity='success'>Pedido Añadido</Alert> : <></> }
            <Button variant="contained" onClick={addPedido}>Imprimir</Button>
        </>
    )
}
export default Imprimir;
