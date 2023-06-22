import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, ListItemButton, ListItemText, Typography } from '@mui/material';
import React from 'react';
import '../../../../styles/Acordion.css';
const PagesItem = ({ user }) => {
    return (
        <Accordion className="my-accordion">
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                //   aria-controls="panel1a-content"
                //   id="panel1a-header"
                classes={{
                    expanded: 'accordion-summary-expanded', // Clase personalizada para el Accordion abierto
                }}
            >
                <Typography >Paginas</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {/* {user.groups.map(item => {
                    if (item.nombre == "/") {
                        return (
                            <ListItemButton
                                component="a"
                                href={item.url}
                            >
                                <ListItemText primary="Inicio"></ListItemText>
                            </ListItemButton>



                        )
                    }
                    return (
                        <ListItemButton
                            component="a"
                            href={item.url}
                        >
                            <ListItemText primary={item.nombre}></ListItemText>
                        </ListItemButton>



                    )
                })} */}

            </AccordionDetails>
        </Accordion>
    )
}

export default PagesItem
