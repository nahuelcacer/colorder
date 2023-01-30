import { Document, Page, Text } from "@react-pdf/renderer";


const titles = {
    fontSize:'14px', 
    textAlign: 'center',
    marginTop:'2px',

}
const texts = {
    marginTop:'2px',
    fontSize: '10px',
    textAlign: 'center'
}
const CrearPdf = ({data}) => { 
    return (
        <Document>
            <Page size={{width:294.8, heigth: 566.92}}>
                <Text style={titles}>
                    COLEGIO DE ESCRIBANOS DE LA PROVINCIA DEL CHACO 
                </Text>            
                <Text style={texts}>
                    Av. Italia 123
                </Text>
                <Text style={texts}>
                    Fecha y hora: 
                </Text>
                <Text style={texts}>
                    Cuit: 30-56214518-0
                </Text>
                <Text style={texts}>
                   ----------------------------------------------------------------
                </Text>
                <Text style={titles}>
                   Cliente
                </Text>
                {
                    data.cliente != null ? <div><Text style={texts}>{data.cliente.nombre}</Text><Text style={texts}>{data.cliente.dni}</Text></div> : <></>
                }
                {
                    data.orderproduct.map(i=>{
                        return (
                            <>
                                <Text style={{textAlign:'center', fontSize:'10px', margin:'5px', width:'100%' }}>
                                    <Text style={{margin:'10px'}}>x{i.cantidad} </Text>
                                    <Text style={{margin:'10px'}}> {i.producto.nombre}</Text>
                                    <Text style={{margin:'10px'}}> {i.producto.precio} </Text>
                                    <Text style={{margin:'10px'}}> ${i.total} </Text>

                                </Text>
                            </>
                        )
                    })
                }
                {/* <div>
                    {data.orderproduct.map(i=>{
                        return (
                            <Text>{i.total}</Text>
                        )
                    })}
                </div> */}

            </Page>
        </Document>
    )
}

export default CrearPdf