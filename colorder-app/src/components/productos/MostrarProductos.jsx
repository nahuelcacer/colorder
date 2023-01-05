import { Card } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

const MostrarProductos = ({productos}) => {
   
  return (
    <div>
        
            {productos.map((i) => {
                return <li>{i.nombre}</li>
            })}
        
    </div>
  )
}

export default MostrarProductos