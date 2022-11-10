import axios from "axios"
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
function Buscar(props) {
  const [data,setData] = useState([])
  const [value, setValue] = useState(data);
  useEffect(()=>{
    refreshlist()
  },[])

  const refreshlist = () => {
    axios
    .get('api/'+props.search)
    .then((r)=>{
      setData(r.data)
    })

  }
  const filterOptions = createFilterOptions({
    stringify: ({ nombre, id }) => `${nombre} ${id}`
  });
  return(
    <div className="container m-2">

      <Autocomplete
        disablePortal
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        id="combo-box-demo"
        options={data.map((e)=>{
          return {label:e.nombre,id:e.identificacion}
        })}
        filterOptions={filterOptions}
        sx={{ width: 500 }}
        renderInput={(params) => <TextField {...params} label={props.label} />}
        />
      </div>
  )
}

export default Buscar;