import { Button } from "@mui/material"
import axios from "axios"
import { useSelector } from "react-redux"
const Imprimir = () => {
    const pedido =  useSelector(state=>state.pedido)
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
            <Button variant="contained" onClick={addPedido}>Imprimir</Button>
        </>
    )
}
export default Imprimir;
