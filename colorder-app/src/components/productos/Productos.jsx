import { Container } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import BuscarProducto from "./buscarProducto"
import CrearProducto from "./CrearProducto"
import MostrarProductos from "./MostrarProductos"

const Productos = () => {
    const [search, setSearch] = useState("")
    const [open,setOpen] = useState(false)
    const [productos, setProductos] = useState([])

    useEffect(()=>{
      axios
      .get(`api/productos?nombre=${search}`)
      .then(res=>{
          setProductos(res.data)
      })
    } ,[search])
    const handleChange = (e) => {
      setSearch(e.target.value)
    }
    const updateProductos = () => {
      axios
      .get(`api/productos?nombre=${search}`)
      .then((res) => {
        setProductos(res.data);
      });
    }
    return (
      <div>
        <Container>
          
          <BuscarProducto   search={search} handleChange={handleChange} open={open} setOpen={setOpen} />
          <MostrarProductos productos={productos}/>
          <CrearProducto open={open} setOpen={setOpen} updateProductos={updateProductos}></CrearProducto>

        </Container>
      </div>
    )
  }

export default Productos
