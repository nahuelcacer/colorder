import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

const MostrarProductos = ({busqueda}) => {
    const [productos, setProductos] = useState([])
    useEffect(()=>{
        axios
        .get(`api/productos/${busqueda}/`)
        .then(res=>{
            setProductos(res.data)
        })
    },[])
  return (
    <div>{productos.map(i=>{
        return(
            <li>{i.nombre}</li>
        )
    })}</div>
  )
}

export default MostrarProductos