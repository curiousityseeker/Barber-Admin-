import React from 'react';
import { useState } from 'react';
import { Box, CssBaseline, Toolbar, Container } from '@mui/material';
import AppointmentList from '../components/Appointment/AppointmentList.jsx';
import { useEffect } from 'react';
import { verifyToken } from '../services/api.js';
function Dashboard() {
    useEffect(() => {
        const token = localStorage.getItem('token');
        verifyToken(token).then((data) => {
            if (data === "No token provided") {
                window.location.replace("/login");
            }
            else {
                if (data.isadmin === false) {
                    window.location.replace("/login");
                }
                else {
                    console.log("Logged in as admin");
                }
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    return (
        <Box component="main" >
            <AppointmentList />
        </Box>
    );
}

export default Dashboard;
