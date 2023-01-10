import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Facturacion = () => {
  const [data,setData] = useState([])
  const [pendientes, setPendientes] = useState(0)


  useEffect(()=>{
      const fetchData = async () => {
          axios.get('/api/pedidos?completado=0&factura=0')
          .then(res=>{
              setData(res.data)
              const arr_pendientes = data.filter(i => i.completado == false)
              setPendientes(arr_pendientes.length)
          })            
        };
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
      },[data])
      
  return (
    <div>
      
    </div>
  )
}

export default Facturacion