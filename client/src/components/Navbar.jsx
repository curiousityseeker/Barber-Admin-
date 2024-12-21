import React from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Box, Avatar } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";

const Navbar = ({ toggleDrawer }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.replace("/login");
    }

    return (
        <AppBar position="fixed" sx={{ backgroundColor: "#1e1e1e", zIndex: 1201 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Menu Button (left) */}
                <IconButton color="inherit" onClick={toggleDrawer}>
                    <IconButton color="inherit">
                        <img src="https://img.icons8.com/material-rounded/24/ffffff/menu--v1.png" alt="menu" />
                        </IconButton>
                </IconButton>

                {/* Left Spacer */}
                <Box sx={{ width: '50px' }} /> {/* Spacer to balance the left side */}

                {/* Main Logo (centered) */}
                <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                    <Link to="#">
                        <Avatar
                            sx={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                            }}
                            alt="Logo"
                            src="https://marketplace.canva.com/EAFou6wmoMI/1/0/1600w/canva-modern-stylish-barber-shop-mascot-free-logo-Fa63ZgnLGh0.jpg"
                        />
                    </Link>
                </Box>

                {/* User Menu (right) */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton color="inherit" onClick={handleMenuOpen}>
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
                        {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
                        <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
