import { useSelector } from 'react-redux';

const useTodosLosProductos = () => {
    const productos = useSelector(state => state.productos.productos);
    return productos
}

export default useTodosLosProductos


