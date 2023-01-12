import { Container } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TableShow from '../tables/TableShow'

const Facturacion = () => {
  const [data,setData] = useState([])
  const [pendientes, setPendientes] = useState(0)
  const [checked,setChecked] = useState(false) //
  // const [searchParams, setSearchParams] = useSearchParams();
  const [search,setSearch] = useState('')
  const [fecha,setFecha] = useState(new Date())
  useEffect(()=>{
      const searchParams = new URLSearchParams({
        factura:checked?1:0,
        cliente:search,
        fecha:fecha.toISOString().slice(0,10)
      })
  

    const fetchData = async () => {
      axios.get(`/api/pedidos?completado=0&${searchParams}`)
      .then(res=>{
          setData(res.data)
          const arr_pendientes = data.filter(i => i.completado == false)
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
  },[checked, search, fecha])
  
  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  return (
    <Container>

      <TableShow  fecha={fecha}setFecha={setFecha} handleChange={handleChange} setChecked={setChecked} datos={data} titulo="Pedidos" nombreSwitch="Facturado"> </TableShow>
    </Container>
  )
}

export default Facturacion