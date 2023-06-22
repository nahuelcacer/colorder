import MenuIcon from '@mui/icons-material/Menu';
import { Button, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useRef, useState } from 'react';
import AuthContext from '../../../context/AuthContext';
import PagesItem from './pages/PagesItem';



const Sidebar = () => {
    const [open, setOpen] = useState(false)
    const drawerRef = useRef(null);
    const handleOpen = () => {
        setOpen(true);
    };
    let { user, logoutUser } = useContext(AuthContext)


    const handleClose = () => {
        setOpen(false);
    };
    // const handleClickOutside = (event) => {
    //     if (drawerRef.current && !drawerRef.current.contains(event.target)) {
    //         setOpen(false);
    //     }
    // };
    // useEffect(() => {
    //     if (open) {
    //         document.addEventListener('click', handleClickOutside);
    //     }

    //     // Eliminar el evento click al documento cuando se cierra el Drawer
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside);
    //     };
    // }, [open]);
    if (!open) {
        return (
            <Box sx={{
                position: 'fixed',
                top: '0.5rem',
                left: '1rem',
              }}>
                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                  <Grid item>
                    <IconButton
                      onClick={() => { handleOpen() }}
                      onClose={handleClose}
                      sx={{
                        backgroundColor: '#ffffff',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                      {
                        user ? 
                        <ListItemText primary={user.username} secondary={user.email} />
                        : <>
                        </>
                      }
                  </Grid>
                </Grid>
              </Box>
              
        )
    }
    else {
        return (
            <>
                <Drawer open={open} sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: '#F5F5F5    ',
                        width: '300px',
                        height: '500px',
                        marginTop: '100px',
                        marginLeft: '5px',
                        borderRadius: '10px',
                    }
                }} >

                    <List>
                        <ListItem>
                            <ListItemText primary={user.username} secondary={user.email}>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <ListItemText>Dashboard</ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <PagesItem user={user}></PagesItem>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={logoutUser}>
                                <ListItemText>Cerrar Sesion</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
            </>
        )
    }
}

export default Sidebar
