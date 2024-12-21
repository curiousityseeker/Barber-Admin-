import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AppointmentList from './pages/Appointment/appointment-list.jsx';
import Login from './pages/login.jsx';
import Dashboard from './pages/dashboard.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Box, CssBaseline, Toolbar } from '@mui/material';

function App() {
  const [open, setOpen] = useState(true); // Sidebar open state

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar toggleDrawer={toggleDrawer} />
        <Sidebar open={open} setOpen={setOpen} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: '100vh',
            p: 3,
            transition: 'margin 0.3s ease-in-out',
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/appointment-list" element={<AppointmentList />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
