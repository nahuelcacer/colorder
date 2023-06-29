import { Box, Container, IconButton, Tooltip } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { localhost } from '../../services/service.pedidos'
import { DataGrid } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check'
import ClienteAccion from './clienteActions';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { copyToClipboard } from '../../tools/copyClipboard';
import EditarCliente from './editarCliente';
const MostrarClientes = () => {
    const [data, setData] = useState(null)
    const getClientes = () => {
        axios.get(`${localhost}api/clientes`)
            .then(res => {
                setData(res.data)
            })
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
            field: 'dni',
            headerName: 'Dni',
            width: 150
        },
        {
            field: 'escribano',
            headerName: 'Escribano',
            width: 150,
            type: 'boolean',
            renderCell: (params) => {
                return (
                    <Box>
                        {
                            params.value
                                ?
                                <CheckIcon
                                    sx={{ color: 'green' }}

                                />
                                :
                                <>
                                </>
                        }
                    </Box>
                )
            }
        },
        {
            field: 'telefono',
            headerName: 'Telefono',
            width: 150,
            renderCell: (params) => {
                return (
                    <Box>
                        {params.value}
                        <Tooltip title="Copiar al portapapeles">
                            <IconButton sx={{ ml: 1 }} onClick={() => { copyToClipboard(params.value) }}>
                                <ContentCopyIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )
            }
        },
        {
            field: 'action',
            headerName: 'Acciones',
            width: 150,
            renderCell: (params) => {
                return (
                    <ClienteAccion setOpen={setEdit} params={params} />

                );
            }
        }
    ]
    useEffect(() => {
        getClientes()
    }, [])
    const [edit, setEdit] = useState({on:false, id:""})

    return (
        <Container>
            {
                data != null ?
                    <DataGrid
                        sx={{ marginTop: '4rem', backgroundColor: '#ffffff' }}
                        columns={columns}
                        rows={data}
                    >
                    </DataGrid>
                    : <>
                        No existen datos
                    </>
            }
            <EditarCliente idCliente={edit.id} open={edit.on} setOpen={setEdit} ></EditarCliente>

        </Container>
    )
}

export default MostrarClientes

