import { Container } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import TableShowRecibo from "../tables/TableShowRecibo"

const Cobranza = () => {

    const [data, setData] = useState([])
    const [pendientes, setPendientes] = useState(0)
    const [checked, setChecked] = useState(false)
    const [search, setSearch] = useState('')
    const [fecha, setFecha] = useState(new Date())
    const [recibir, setRecibir] = useState({
        on: false,
        pedido: ''
    })

    useEffect(() => {

        const searchParams = new URLSearchParams({
            recibo: checked ? 1 : 0,
            cliente: search,
            fecha: fecha.toISOString().slice(0, 10),

        })


        const fetchData = async () => {
            axios.get(`/api/pedidos?completado=0&${searchParams}`)
                .then(res => {
                    setData(res.data)
                    const arr_pendientes = res.data.filter(i => i.recibo == false)
                    setPendientes(arr_pendientes.length)
                })
        };


        axios.get(`/api/pedidos?completado=0&${searchParams}`)
            .then(
                response => {
                    console.log(response)
                    setData(response.data)

                }
            )
            .catch(error => console.log(error));
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [checked, search, fecha, recibir])
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
        // <PedidosCobranza pedidos={pedidos}/>
        <Container>

            <TableShowRecibo
                setRecibir={setRecibir}
                fecha={fecha}
                setFecha={setFecha}
                handleChange={handleChange}
                setChecked={setChecked}
                datos={data}
                titulo="Pedidos"
                subtitulo='Recibos'
                nombreSwitch="Recibidos"
            ></TableShowRecibo>
        </Container>
    )
}

export default Cobranza