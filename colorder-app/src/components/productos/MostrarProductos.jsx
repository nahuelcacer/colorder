import { Button, Card, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { fontSize } from '@mui/system';
const MostrarProductos = ({productos,search, handleChange,setOpen, setEdit }) => {

  return (
    <div>
      
        <Card sx={{mt:4, borderRadius:4}}>

        <Table>
          
          <TableHead>
            <TableRow>
              <TableCell colSpan={4}>

              <Typography variant='h6'>
               Productos
              </Typography>
              <Typography color={'grey'}>
                Modificar
              </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>

            <TextField id="standard-basic" placeholder='Buscar producto' variant="standard" 
            onChange={handleChange}
            value={search}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              
            }}
            />
            </TableCell>
          
            <TableCell colSpan={4} align={'center'}>
            <Button onClick={()=>{setOpen(true)}}>Agregar Producto</Button>

            </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {
              
              productos.map((i) => {
                return (
                  <TableRow key={i.id}>
                    <TableCell>
                      <div>

                      <Typography>{i.nombre}</Typography>
                      </div>
                      <div>
                        {i.notarial ? <Typography color={'green'}>Notarial</Typography> :<></>}
                      </div>
                    </TableCell>
                    <TableCell>
                      $ {i.precio}
                    </TableCell>
                    <TableCell>
                        {i.tramite}
                    </TableCell>
                    <TableCell>
                      <Button onClick={()=>{setEdit({on:true, id:i.id})}}>Editar</Button>
                    </TableCell>
                  </TableRow>
                  )
                })
                
              }
            </TableBody>
        
          </Table>
          </Card>
    </div>
  )
}

export default MostrarProductos