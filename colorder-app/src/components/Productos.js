import { useState } from "react";
import axios from "axios";

function AgregarProducto(){
    const [product,setProduct] = useState({nombre:"",precio:"",tramite:""})
    const hanledChange = (e) =>{
        setProduct({
            ...product,
            [e.target.name] : e.target.value
          })
    }
    const hanledSubmit = (e) => {
        e.preventDefault();
        
        axios.post('api/productos/', product).then(r=>console.log(r))
    }
   return(
    <div className="container col-6">
        <form onSubmit= {(e)=>{hanledSubmit(e)}} className="form-group">
            <input onChange={(e)=>{hanledChange(e)}} name="nombre" placeholder="Nombre" className="form-control"></input>
            <input onChange={(e)=>{hanledChange(e)}} name="precio" placeholder="Precio" className="form-control"></input>
            <input onChange={(e)=>{hanledChange(e)}} name="tramite" placeholder="Tiempo de tramite" className="form-control"></input>
            <button type="submit" className="btn btn-primary">Agregar</button>
        </form>
    </div>

   )
}

export default AgregarProducto