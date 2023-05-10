import { Box, Button, Container, Step, StepLabel, Stepper, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { localhost } from "../../services/service.pedidos"

const Tracking = () => {
    const [searchTracking, setSearchTracking] = useState(null)
    const [steps, setSteps] = useState([])
    const [activeStep, setActiveStep] = useState({activeStep:null, sector:null})
    useEffect(()=>{
        axios.get(`${localhost}api/steps`)
        .then(res=>{
            console.log(res.data)
            setSteps(res.data)
        })
    },[])
    const searchOrder = (id) => {
        axios.get(`${localhost}api/tracking?pedido_id=${id}`)
            .then(res => {
                axios.get(`${localhost}api/sectors/${res.data[0].sector_id}`)
                    .then(res => {
                        console.log(res.data)
                        setActiveStep({activeStep:res.data.step_id.id-1, sector:res.data.name})
                    })
            })
    }
    return (
        <Container>
            <h1>Tracking</h1>
            <TextField placeholder="Id del pedido" onChange={(e) => { setSearchTracking(e.target.value) }}>

            </TextField>
            <Button variant="contained" onClick={() => { searchOrder(searchTracking) }}>Buscar</Button>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep.activeStep} alternativeLabel>
                    {steps.map((label,index) => (
                        <Step key={label.name}>
                            <StepLabel>{label.name} <br></br> {activeStep.activeStep === index  ? activeStep.sector: <></>}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </Container>
    )
}


export default Tracking