import axios from "axios"



export const updatePedidoFactura = (pedido) => {
    if(pedido.recibo){
        pedido.completado = true
        pedido.factura = true
        pedido.enPreparacion = true
        return (
            axios
            .put(`api/pedidos/${pedido.id}/`, pedido )
            
        )
    }
    else{
        pedido.factura = true
        pedido.enPreparacion = true
        return (
            axios
            .put(`api/pedidos/${pedido.id}/`, pedido )
            
            
            
        )
    }
}

