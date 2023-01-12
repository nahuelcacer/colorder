import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TableShow from '../tables/TableShow'

const Facturacion = () => {
  const [data,setData] = useState([])
  const [pendientes, setPendientes] = useState(0)
  const [checked,setChecked] = useState(false) //
  // const [searchParams, setSearchParams] = useSearchParams();

  useEffect(()=>{
      const searchParams = new URLSearchParams({
        factura:checked?1:0
        
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
  },[checked])
  
  return (
    <TableShow  setChecked={setChecked} datos={data} titulo="Pedidos" subtitulo="" > </TableShow>
  )
}

export default Facturacion