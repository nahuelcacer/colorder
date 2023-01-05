import { Button, Card, Grid, Paper, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import CrearProducto from './CrearProducto'
import MostrarProductos from './MostrarProductos'

const BuscarProducto = ({ search, handleChange,setOpen }) => {
    return (
      <Paper>
        <Card sx={{ padding: 6, mt:4, boxShadow:4, borderRadius:2}}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                id="outlined-basic"
                label="Buscar producto"
                onChange={handleChange}
                value={search}
                variant="outlined"
                sx={{width:500}}
              />
            </Grid>
            <Grid item xs={2}>
              <Button onClick={()=>{setOpen(true)}}>Agregar Producto</Button>
            </Grid>
          </Grid>
        </Card>
      </Paper>
    )
  }

export default BuscarProducto