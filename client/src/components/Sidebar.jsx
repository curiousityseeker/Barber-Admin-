import React from "react";
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import TaskIcon from "@mui/icons-material/Assignment";
import CloseIcon from "@mui/icons-material/Close";

const drawerWidth = 240;

const Sidebar = ({ open, toggleDrawer }) => {
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    backgroundColor: "#1e1e1e",
                    color: "#fff",
                },
            }}
        >
            <IconButton onClick={toggleDrawer} sx={{ color: "#fff", margin: 1 }}>
                <CloseIcon />
            </IconButton>
            <List>
                <ListItem button>
                    <ListItemIcon sx={{ color: "#fff" }}>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon sx={{ color: "#fff" }}>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Clients" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon sx={{ color: "#fff" }}>
                        <TaskIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tasks" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
