import { Button, Card, Grid, Paper, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import MostrarProductos from './MostrarProductos'

const BuscarProducto = () => {
    const [search,setSearch] = useState("")

    const hanledChange = (e) => {
        setSearch(e.target.value)
    }
   return (
        <Paper>

        <Card sx={{padding:6}}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <TextField id="outlined-basic" label="Buscar" onChange={(e)=>{hanledChange(e)}} variant="outlined" />
                </Grid>
                <Grid item xs={2}>
                    <Button>ADD</Button>
                </Grid>
                
            </Grid>
        </Card>
        <Card>
            <MostrarProductos busqueda={search}></MostrarProductos>
        </Card>
        </Paper>
  )
}

export default BuscarProducto