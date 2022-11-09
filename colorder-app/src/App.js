import axios from "axios"
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
function App() {
  useEffect(() => {

    
    
    refreshlist();
    
    
  }, []) 
const [listPedidos, setlistPedidos] = useState([])
const refreshlist = () =>{
axios
    .get('/api/pedidos')
    .then((res)=>{ setlistPedidos(res.data)})
    .catch((err)=>{console.log(err)})
}
  console.log(axios.get('/api/pedidos'))
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fecha', headerName: 'Fecha', width: 130 },
    { field: 'hora', headerName: 'Hora', width: 130 },
    { field: 'factura', headerName: 'Factura', width: 130 },
    { field: 'recibo', headerName: 'Recibo', width: 130 },
    { field: 'completado', headerName: 'Completado', width: 130 },
  ];
  
  return (
    <div style={{ display: 'flex', height: '100%' }}>
  <div style={{ flexGrow: 1 }}>
  <DataGrid
        rows={listPedidos}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
  </div>
</div>
  );
}

export default App;
