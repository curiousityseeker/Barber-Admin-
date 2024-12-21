import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";   
import { ExpandLess, ExpandMore, Dashboard, Person} from '@mui/icons-material';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

const Sidebar = ({ open, toggleDrawer }) => {
    const [openCardMenu, setOpenCardMenu] = React.useState(false);
    const [openBarberMenu, setOpenBarberMenu] = React.useState(false);

    const handleCardMenuClick = () => setOpenCardMenu(!openCardMenu);

    const handleBarberMenuClick = () => setOpenBarberMenu(!openBarberMenu);
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' } }}
        >
            <IconButton onClick={toggleDrawer} sx={{ display: { xs: 'block', sm: 'none' } }}>
                <CloseIcon />
            </IconButton>
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <img src="../assets/media/logos/logo-light.png" alt="Logo" style={{ height: 30 }} />
            </Box>

            <List>
                {/* Dashboard */}
                <ListItem disablePadding>
                    <ListItemButton href="/">
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>

                {/* Appointment Menu */}
                <ListItemButton onClick={handleCardMenuClick}>
                    <ListItemIcon>
                        <Person />
                    </ListItemIcon>
                    <ListItemText primary="Appointment" />
                    {openCardMenu ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openCardMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }} href="../card/add-card.php">
                            <ListItemText primary="Add Appointment" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} href="/appointment-list">
                            <ListItemText primary="All Appointment" />
                        </ListItemButton>
                    </List>
                </Collapse>
                
                {/* Barber Menu */}
                <ListItemButton onClick={handleBarberMenuClick}>
                    <ListItemIcon>
                        <BookOnlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Barber" />
                    {openCardMenu ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openBarberMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }} href="../barber/add-barber.php">
                            <ListItemText primary="Add Barber" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} href="../barber/barber-list.php">
                            <ListItemText primary="All Barber" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    );
};

export default Sidebar;
