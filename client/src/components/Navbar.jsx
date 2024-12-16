import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ toggleDrawer }) => {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: "#1e1e1e", zIndex: 1201 }}>
            <Toolbar>
                <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Barber Shop Management
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
