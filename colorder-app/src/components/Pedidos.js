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
       <div>
            {listPedidos.map(e=>{
                return(
                    <div>
                        <p>{e.id}</p>
                        <p>{e.fecha}</p>
                        <p>{e.tiempo}</p>
                        <p>{e.recibo}</p>
                        <p>{e.completado}</p>
                    </div>
                )
            })}
       </div>
    </div>
  );
}

export default Pedidos;