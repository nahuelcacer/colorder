import { Container, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { localhost } from '../../services/service.pedidos'
import { formatDate } from '../../tools/formatedDate'
import EditarProducto from './EditarProducto'

const ProductosDataGrid = () => {
    const [edit, setEdit] = useState({ on: false, id: '' })
    const [data, setData] = useState(null)
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
            field: 'id',
            headerName: 'ID',
            width: 90
        },
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
            // renderCell: (params) => {
               
            //     return (
            //         formatDate(params.value)
            //     )
            // }
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <Button onClick={() => setEdit({ on: true, id: params.id })}>
                        Edit
                    </Button>
                );
            }
        }
    ]
    return (
        <Container>
            {data != null ?
                <DataGrid
                    sx={{ marginTop: '4rem', backgroundColor: '#ffffff' }}
                    columns={columns}
                    rows={data}
                >
                </DataGrid>
                : <>
                    No existen datos
                </>}
            {edit.on ? <EditarProducto edit={edit.on} setEdit={setEdit} id={edit.id} updateProductos={getProductos}></EditarProducto> : <></>}

        </Container>
    )
}

export default ProductosDataGrid
