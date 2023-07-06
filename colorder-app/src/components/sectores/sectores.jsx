import axios from "axios"
import { useEffect, useState } from "react"
import { localhost } from "../../services/service.pedidos"
import { Button, Container } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"

const Sectores = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        axios.get(`${localhost}api/sectors/`)
            .then(res => {
                setData(res.data)
                console.log(res.data)
            })
    }, [])
    const deleteSector = (params) => {
        console.log(params)
        return (
            <Button>prueba</Button>
        )
    }
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90
        },
        {
            field: 'name',
            headerName: 'NOMBRE',
            width: 150
        },
        {
            field: 'step_id',
            headerName: 'STEP',
            width: 150,
            valueFormatter: ({value}) => value.name
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell:(params) => {
                return (
                  <Button onClick={() => deleteSector(params)}>
                    Eliminar
                  </Button>
                );
              }
        },
        
    ]
    return (
        <Container>
            {data != null ?
                <DataGrid
                    sx={{ marginTop: '5rem', backgroundColor: '#ffffff' }}
                    columns={columns}
                    rows={data}
                >
                </DataGrid>
                : <>
                    No existen datos
                </>}
        </Container>
    )
}

export default Sectores