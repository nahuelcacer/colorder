import { Card } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

const MostrarProductos = ({busqueda}) => {
    const [productos, setProductos] = useState([])
    useEffect(()=>{
        axios
        .get(`api/productos?nombre=${busqueda}`)
        .then(res=>{
            setProductos(res.data)
        })
    },[busqueda])
  return (
    <div>
        <Card>
            {productos.map((i) => {
                return <li>{i.nombre}</li>
            })}
        </Card>
    </div>
  )
}

export default MostrarProductos