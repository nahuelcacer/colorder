import { Container } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import CrearProducto from "./CrearProducto"
import EditarProducto from "./EditarProducto"
import MostrarProductos from "./MostrarProductos"

const Productos = () => {
    const [search, setSearch] = useState("")
    const [open,setOpen] = useState(false)
    const [edit, setEdit] = useState({on:false,id:''})
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
          <MostrarProductos search={search} handleChange={handleChange} open={open} setOpen={setOpen} productos={productos} setEdit={setEdit}/>
          <CrearProducto open={open} setOpen={setOpen} updateProductos={updateProductos}></CrearProducto>
          <EditarProducto edit={edit.on} setEdit={setEdit} id={edit.id}></EditarProducto>
        </Container>
      </div>
    )
  }

export default Productos
