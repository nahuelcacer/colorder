import MenuIcon from '@mui/icons-material/Menu';
import { Button, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
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

            <Button onClick={() => { handleOpen() }} onClose={handleClose}  >
                <MenuIcon></MenuIcon>
            </Button>
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
