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
        let result = []
        e.preventDefault();
        // this.toggle()
        axios
            .get(`/api/clientes/${cliente.identificacion}`)
            .then(res=>{console.log(res.status)})
            .catch((err)=>{console.log(err)})
       
      };    




    return(
        <div className="col-4">
            <form onSubmit={(e)=>{handleSubmit(e)}} className="form-group">
                <input onChange={(e)=>{hanledChange(e)}} className="form-control m-2" name="identificacion" placeholder="DNI/CUIT"></input>
                <input onChange={(e)=>{hanledChange(e)}} className="form-control m-2" name="nombre" placeholder="NOMBRE"></input>
                <button className="btn btn-primary" type="submit">Agregar</button>
            </form>
        </div>
    )
}

export default Agregar