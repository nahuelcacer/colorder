import { useState } from "react"
import BuscarProducto from "./buscarProducto"
import MostrarProductos from "./MostrarProductos"

const Productos = () => {
    const [search, setSearch] = useState("")
  
    const handleChange = (e) => {
      setSearch(e.target.value)
    }
  
    return (
      <div>
        <BuscarProducto search={search} handleChange={handleChange} />
        <MostrarProductos busqueda={search} />
      </div>
    )
  }

export default Productos
