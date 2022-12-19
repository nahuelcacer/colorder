import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import PedidosCobranza from "./components/cobranza/mostrarPedidos"
import { fecthPedidos } from "./features/pedidos/pedidoshowSlice"

const Cobranza = ()=>{
    const pedidos = useSelector(state=>state.pedidosMostrar)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fecthPedidos())
    },[dispatch])
    return(
        <PedidosCobranza pedidos={pedidos}/>
    )
}

export default Cobranza