import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import AppointmentList from './pages/Appointment/appointment-list.jsx';
import Login from './pages/login.jsx';
import Dashboard from './pages/dashboard.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import AddAppointment from './pages/Appointment/add-appointment.jsx';
import BarberList from './pages/barber/barber-list.jsx';
import AddBarber from './pages/barber/add-barber.jsx';
import BarberDetail from './pages/barber/barber_detail.jsx';
import { Box, CssBaseline, Toolbar } from '@mui/material';

function App() {
  const [open, setOpen] = useState(true); // Sidebar open state

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Custom layout component to conditionally render Navbar and Sidebar
  const Layout = ({ children }) => {
    const location = useLocation();

    // Exclude Navbar and Sidebar for the Login page
    const excludeNavAndSidebar = location.pathname === '/login';

    return (
      <Box>
        <CssBaseline />
        {!excludeNavAndSidebar && <Navbar toggleDrawer={toggleDrawer} />}
        {!excludeNavAndSidebar && <Sidebar open={open} setOpen={setOpen} />}
        <Box  
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: '100vh',
            p: 3,
            transition: 'margin 0.3s ease-in-out',
            marginLeft: !excludeNavAndSidebar && open ? '240px' : 0,
          }}
        >
          {!excludeNavAndSidebar && <Toolbar />}
          {children}
        </Box>
      </Box>
    );
  };

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/appointment-list" element={<AppointmentList />} />
          <Route path="/add-appointment" element={<AddAppointment />} />
          <Route path="/barber-list" element={<BarberList />} />
          <Route path="/add-barber" element={<AddBarber />} />
          {/* <Route path="/barber-detail/:id" element={<BarberDetail />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
