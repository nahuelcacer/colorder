import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import Logo from '../../static/logocolegio.jpg'



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
    console.log(data)
    return (
        <Document>
            <Page size={{width:294.8, heigth: 566.92}}>
                <View style={{alignItems:'center', flexGrow:1}}>
                    <Image source={Logo} style={{textAlign:'center', width:'100px', height:'100px', margin:'5px'}} />
                </View>
               
                <Text style={{
                    marginTop:'10px',
                    fontSize: '10px',
                    textAlign: 'center'
                }}>
                    Av. Italia 123, Resistencia
                </Text>
                <Text style={texts}>
                    Cuit: 30-56214518-0
                </Text>
               
                <Text style={{
                    marginTop:'10px',
                    fontSize: '14px',
                    textAlign: 'center'
                }}>
                   Cliente
                </Text>
                
                <Text style={texts}>
                    {data.cliente.nombre}
                </Text>
                <Text style={texts}>
                    {data.cliente.dni}
                </Text>
                <Text style={{
                    marginTop:'10px',
                    fontSize: '14px',
                    textAlign: 'center'
                }}>
                    Pedido
                </Text>
        
                <Text style={{marginTop:'4px',                             
                                    fontSize: '15px',
                                    textAlign: 'center'}}>
                   {data.orden}
                </Text>
                <Text style={texts}>
                    Fecha: {data.fecha}
                </Text> 
                <Text style={texts}>
                    Hora: {data.tiempo}
                </Text>
                {
                    data.orderproduct.map(i=>{
                        return(
                            <>
                            <View>

                                <Text style={{
                                    marginTop:'4px',                             
                                    fontSize: '10px',
                                    textAlign: 'center'}}
                                    >x{i.cantidad}.  {i.producto.nombre}
                                </Text>
                                <Text style={texts}>
                                    Precio: {i.producto.precio}
                                </Text>
                                <Text style={texts}>
                                    Total: {i.cantidad*i.producto.precio}
                                </Text>
                                    </View>
                            
                            </>
                        )
                    })
                }
                
                

            </Page>
        </Document>
    )
}

export default CrearPdf