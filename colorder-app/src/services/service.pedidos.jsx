import axios from "axios"

export const localhost = 'http://127.0.0.1:8000/'
// UPDATE FIELD RECIBO
export const updatePedidoRecibo = (pedido) => {
    if(pedido.factura){
        pedido.completado = true
        pedido.recibo = true
        return (
            axios
            .put(`${localhost}api/pedidos/${pedido.id}/`, pedido )
            
        )
    }else {
        pedido.recibo = true
        return (
            axios
            .put(`${localhost}api/pedidos/${pedido.id}/`, pedido )
            
            
            
        )
    }
}

// UPDATE FIELD FACTURA
export const updatePedidoFactura = (pedido) => {
    if(pedido.recibo){
        pedido.completado = true
        pedido.factura = true
        pedido.enPreparacion = true
        return (
            axios
            .put(`${localhost}api/pedidos/${pedido.id}/`, pedido )
            
        )
    }
    else{
        pedido.factura = true
        pedido.enPreparacion = true
        return (
            axios
            .put(`${localhost}api/pedidos/${pedido.id}/`, pedido )
            
            
            
        )
    }
}

