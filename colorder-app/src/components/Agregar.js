import { useState } from "react"
import axios from 'axios'

function Agregar(){
    const [cliente, setCliente] = useState({})


    const hanledChange = (e) =>{
        setCliente({
            ...cliente,
            [e.target.name] : e.target.value
          })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // this.toggle()
        let status = axios.get('api/clientes/'+cliente.identificacion).then(r => r.status)
        axios.put('api/clientes/'+cliente.identificacion+'/', cliente)
        // status.then(exito,fallo)
      };    


    return(
        <div className="col-4">
            <form onSubmit={(e)=>{handleSubmit(e)}} className="form-group">
                <input onChange={(e)=>{hanledChange(e)}} className="form-control m-2" name="identificacion" placeholder="DNI/CUIT"></input>
                <input onChange={(e)=>{hanledChange(e)}} className="form-control m-2" name="nombre" placeholder="NOMBRE"></input>
                <button className="btn btn-primary m-2" type="submit">Agregar</button>
            </form>
        </div>
    )
}

export default Agregar