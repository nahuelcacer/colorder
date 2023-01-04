import { Button, Card, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material"
import { Box, Container } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"

const ProductosMostrar = () => {
    const [productos,setProductos] = useState([])
    useEffect(()=>{
        axios.get('api/productos/')
        .then(res=>{
            setProductos(res.data)
        })
    },[])
    return(
        <Container>
            <Card sx={{  mt:4, boxShadow:1, borderRadius:2, padding:4}}>
            
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TextField id="standard-basic" label="Buscar producto" variant="standard" ></TextField>
                        
                    </Grid>
                    <Grid item xs={4}>
                        <Button>ADD</Button>
                    </Grid>
                </Grid>
            </Card>
            
            <Card sx={{mt:4}}>
            <Table >
                <TableHead>
                    
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Precio</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productos.map(item=>{
                        return(
                            <TableRow>
                                <TableCell>{item.nombre}<div>{item.notarial ? <>notarial</>: <></>}</div></TableCell>
                                <TableCell>{item.precio}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

            </Card>
        </Container>
    )
}


export default ProductosMostrar    