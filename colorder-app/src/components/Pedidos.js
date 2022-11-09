import axios from "axios"
import React, { useState, useEffect } from 'react';

function Pedidos(){
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
  
    return (
    <div className="App">
       <div className="container">
        <table className="table">
          <tr>
            <th>Id</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Factura</th>
            <th>Recibo</th>
            <th>Completado</th>
          </tr>
          
            {listPedidos.map(e=>{
              return(
                <tr>
                  
                    <td>{e.id}</td>
                    <td>{e.fecha}</td>
                    <td>{e.tiempo}</td>
                    <td>{e.factura}</td>
                    <td>{e.recibo}</td>
                    <td>{e.completado}</td>
                  
                </tr>
                
                )
              })}
          </table> 
       </div>
    </div>
  );
}

export default Pedidos;