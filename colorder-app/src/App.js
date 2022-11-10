import axios from "axios"
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
function App() {
  const [data,setData] = useState([])
  useEffect(()=>{
    refreshlist()
  
  },[])

  const refreshlist = () => {
    axios
    .get('api/productos')
    .then((r)=>{
      setData(r.data)
    })

  }
  return(
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={data.map((e)=>{
        return {label:e.nombre,id:e.id}
      })}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Seleccionar Producto" />}
    />
  )
}

export default App;
