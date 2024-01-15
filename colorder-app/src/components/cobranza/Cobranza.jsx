import { Container } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import { obtenerPedidosPendientes } from "../../services/apiObtenerFunctions"
import { localhost } from "../../services/service.pedidos"
import TableShowRecibo from "../tables/TableShowRecibo"

const Cobranza = () => {

    const [data, setData] = useState([])
    const [pendientes, setPendientes] = useState(0)
    const [search, setSearch] = useState('')
    const [fecha, setFecha] = useState(new Date())
    const [alignment, setAlignment ] = useState('sin')
    
    const [buttonClicked, setButtonClicked] = useState(false);

    
    
    const searchParams = new URLSearchParams({
        recibo: alignment === 'sin' ? 0 : (alignment === 'con' ? 1 : undefined),
        cliente: search,
        fecha: fecha.toISOString().slice(0, 10),
        
    })
    
    
    const fetchData = async () => {
        try {
            const {data, cantidad, pendientes} = await obtenerPedidosPendientes(searchParams)
            setPendientes(pendientes)
            setData(data)
        } catch (error) {
            console.error('Error checking pedido state:', error.message);
        }
    };
    useEffect(() => {
        if (buttonClicked) {
            setButtonClicked(false);
          }
        fetchData()
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [alignment, search, fecha, buttonClicked])
    useEffect(() => {
        if (pendientes !== 0) {

            document.title = `(${pendientes}) Pendientes`;
        } else {
            document.title = 'No hay pedidos pendientes';
        }
    }, [pendientes]);
    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    return (
        <Container>

            <TableShowRecibo
                setButtonClicked={setButtonClicked}
                fecha={fecha}
                setFecha={setFecha}
                handleChange={handleChange}
                datos={data}
                titulo="Pedidos"
                subtitulo='Recibos'
                nombreSwitch="Recibidos"
                alignment={alignment}
                setAlignment={setAlignment}
            ></TableShowRecibo>
        </Container>
    )
}

export default Cobranza