import React from 'react';
import { useState } from 'react';
import { Box, CssBaseline, Toolbar, Container } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import AppointmentList from './components/AppointmentList';
function App() {

  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box >
        <CssBaseline />
        <Navbar toggleDrawer={toggleDrawer} />
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <AppointmentList />
        </Container>
      </Box>
    </Box>
  );
}

export default App;
