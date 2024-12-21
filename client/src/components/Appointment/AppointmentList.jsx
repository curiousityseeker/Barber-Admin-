import React from "react";
import { Box, Typography, CircularProgress ,Grid} from "@mui/material";
import AppointmentCard from "./AppointmentCard.jsx";
import { useState, useEffect } from "react";
import { fetchAppointments } from "../../services/api.js";


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
        console.log(appointments);
    }, []);
    if (loading) {
        return <CircularProgress />;
    }
    return (
        // <Box>  
        //     <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
        //         Upcoming Appointments
        //     </Typography>
        //     {appointments.map((appointment, index) => (
        //         <Box key={index}>
        //             <AppointmentCard appointment={appointment} />
        //         </Box>
        //     ))}
        // </Box>
        <Box>
            <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
                Upcoming Appointments
            </Typography>
            <Box sx={{ mb: 4 }}>
                <Grid container spacing={2}>
                    {appointments.map((appointment) => (
                        <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                            <AppointmentCard appointment={appointment} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};



export default AppointmentList;
