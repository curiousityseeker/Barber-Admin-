import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    Divider,
} from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { AllAppointment } from "../../services/api.js";
import AppointmentCard from "../../components/Appointment/AppointmentCard.jsx";


const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [groupedAppointments, setGroupedAppointments] = useState({});
    // Fetch appointments
    const fetchAllAppointments = async () => {
        const data = await AllAppointment(); // Fetch appointments from your API
        setAppointments(data);
        groupAppointmentsByDate(data);
    };
    // Group appointments by date
    const groupAppointmentsByDate = (appointments) => {
        const grouped = appointments.reduce((acc, appointment) => {
            const date = new Date(appointment.appointment_time).toLocaleDateString();
            acc[date] = acc[date] ? [...acc[date], appointment] : [appointment];
            return acc;
        }, {});
        setGroupedAppointments(grouped);
    };
    useEffect(() => {
        fetchAllAppointments();
    }, []);

    return (
        <Box sx={{ p: 4, backgroundColor: "#121212", minHeight: "100vh" }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 4 }}>
                <CalendarToday sx={{ mr: 1, verticalAlign: "middle" }} />
                Appointment List
            </Typography>
            {Object.keys(groupedAppointments).map((date) => (
                <Box key={date} sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ color: "#1976d2", mb: 2 }}>
                        {date}
                    </Typography>
                    <Divider sx={{ mb: 2, borderColor: "#444" }} />
                    <Grid container spacing={2}>
                        {groupedAppointments[date].map((appointment) => (
                            <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                                <AppointmentCard appointment={appointment} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Box>
    );
};

export default AppointmentList;
