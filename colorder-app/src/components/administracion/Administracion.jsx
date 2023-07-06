import { Box, List, ListItem, ListItemButton } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../styles/Administracion.css';
const Administracion = () => {
   
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <Box sx={{ display: 'flex'}}>
            <Box sx={{border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '5rem', marginLeft: '4rem', borderRadius: 2, backgroundColor:'#ffffff', height:'fit-content' }}>
                <List>
                    <ListItem>
                        <Link to='/administracion/productos' id="productos">
                            <ListItemButton
                            className="my-listButton"
                                selected={
                                    selectedIndex === 0
                                }
                                onClick={(event) => handleListItemClick(event, 0)}
                            >Productos</ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem >
                        <Link to='/administracion/cliente' id="productos">
                            <ListItemButton
                            className="my-listButton"
                                selected={
                                    selectedIndex === 1
                                }
                                onClick={(event) => handleListItemClick(event, 1)}
                            >Clientes</ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to='/administracion/sectores' id="productos">
                            <ListItemButton
                            className="my-listButton"
                                selected={
                                    selectedIndex === 2
                                }
                                onClick={(event) => handleListItemClick(event, 2)}
                            >Sectores</ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to='/administracion/tracking' id="productos">
                            <ListItemButton
                            className="my-listButton"
                                selected={
                                    selectedIndex === 3
                                }
                                onClick={(event) => handleListItemClick(event, 3)}
                            >Tracking</ListItemButton>
                        </Link>
                    </ListItem>
                </List>
            </Box>
            <Container>
                <Outlet></Outlet>
            </Container>
        </Box>
    )
}

export default Administracion
