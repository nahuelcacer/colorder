import { useSelector } from 'react-redux';

export const useTodosLosProductos = () => {
    const productos = useSelector(state => state.productos.productos);
    return productos
}



export const useClienteSeleccionado = () => {
    const cliente = useSelector(state=>state.pedido.cliente)
    return cliente
}