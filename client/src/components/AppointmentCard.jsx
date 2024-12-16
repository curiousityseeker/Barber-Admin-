import React, { useEffect } from "react";
import { Card, CardContent, Typography, Avatar, Chip, Box, Select, MenuItem,FormControl,InputLabel } from "@mui/material";
import { useState } from "react";
import { fetchBarber, updateAppointmentStatus } from "../services/api.js";

const AppointmentCard = ({ appointment }) => {
    const { barber_id, appointment_time
        , status, client_name, client_id } = appointment;
    const date = new Date(appointment_time).toLocaleDateString();
    const time = new Date(appointment_time).toLocaleTimeString();
    const [barber, setBarber] = useState("");
    const callBarber = async () => {
        const data = await fetchBarber(barber_id);
        setBarber(data);
    }
    useEffect(() => {
        callBarber();
    }, []);
    const colors = {
        Done: "success",
        Upcoming: "warning",
        Cancelled: "default",
    };
    const handleChange = (e) => {
        const value = e.target.value;
        console.log(value);
        updateAppointmentStatus(client_id, value);
        window.location.reload();

    }

    return (
        <Card
            variant="outlined"
            sx={{
                mb: 2,
                backgroundColor: "#2d2d2d",
                color: "#fff",
                maxWidth: 500,
                border: "1px solid #444",
            }}
        >
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "#1976d2" }}>
                    {client_name.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ color: "#fff" }}>
                        {client_name}
                    </Typography>
                    <Typography variant="body2" color="gray">
                        Barber: {barber}
                    </Typography>
                    <Typography variant="body2" color="gray">
                        Date: {date} | Time: {time}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2 ,flexDirection:"column"}}>
                    <FormControl sx={{ width: 100 }}>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Status"
                            onChange={handleChange}
                        >
                            <MenuItem value={"Upcoming"}>Upcoming</MenuItem>
                            <MenuItem value={"Done"}>Done</MenuItem>
                            <MenuItem value={"Cancelled"}>Cancel</MenuItem>
                        </Select>
                    </FormControl>
                    <Chip label={status} color={colors[status] || "default"} size="small" />
                </Box>
            </CardContent>
        </Card>
    );
};

export default AppointmentCard;
