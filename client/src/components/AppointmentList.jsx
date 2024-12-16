import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import AppointmentCard from "./AppointmentCard";
import { useState, useEffect } from "react";
import { fetchAppointments } from "../services/api.js";


// const fetchBarber = async () => {   
//     const data = await fetchBarber();
//     setAppointments(...data);
// };   

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchClients = async () => {
        const data = await fetchAppointments();
        setAppointments(data);
        setLoading(false);
    };
    useEffect(() => {
        fetchClients();
    }, []);
    if (loading) {
        return <CircularProgress />;
    }
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
                Upcoming Appointments
            </Typography>
            {appointments.map((appointment, index) => (
                <Box key={index}>
                    <AppointmentCard appointment={appointment} />
                </Box>
            ))}
        </Box>
    );
};



export default AppointmentList;
