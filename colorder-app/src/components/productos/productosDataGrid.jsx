import { Box, Button, Container } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { localhost } from '../../services/service.pedidos'
import CrearProducto from './CrearProducto'
import EditarProducto from './EditarProducto'
import ActionsProductos from './productoActions'

const ProductosDataGrid = () => {
    const [edit, setEdit] = useState({ on: false, id: '' })
    const [data, setData] = useState(null)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        getProductos()
    }, [])
    const getProductos = () => {
        axios.get(`${localhost}api/productos/`)
            .then(
                res => {
                    console.log(res.data)
                    setData(res.data)
                }
            )
    }

    const columns = [
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 150
        },
        {
            field: 'precio',
            headerName: 'Precio',
            width: 150
        },
        {
            field: 'tramite',
            headerName: 'Tiempo',
            width: 150,
        },
        {
            field: 'notarial',
            headerName: 'Producto Notarial',
            width: 90,
            type: 'boolean'
        },
        {
            field: 'modified_at',
            headerName: 'Ultima modif',
            width: 150,

        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <ActionsProductos setEdit={setEdit} params={params} getProductos={getProductos} />

                );
            }
        }
    ]
    const addBtn = () => {
        return (
            <Box sx={{ padding: '5px' }}>
                <Button onClick={() => { setOpen(true) }}>
                    Agregar
                </Button>
            </Box>
        )
    }
    return (
        <Container>
            {data != null ?
                <DataGrid
                    sx={{ marginTop: '4rem', backgroundColor: '#ffffff' }}
                    columns={columns}
                    rows={data}
                    slots={{ toolbar: addBtn }}
                >
                </DataGrid>
                : <>
                    No existen datos
                </>}
            {edit.on ? <EditarProducto edit={edit.on} setEdit={setEdit} id={edit.id} updateProductos={getProductos}></EditarProducto> : <></>}
            <CrearProducto open={open} setOpen={setOpen} updateProductos={getProductos}></CrearProducto>

        </Container>
    )
}

export default ProductosDataGrid
