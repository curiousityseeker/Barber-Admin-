import React, { useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Chip,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
} from "@mui/material";
import { useState } from "react";
import { fetchBarber, updateAppointmentStatus, fetchUser } from "../../services/api.js";

const AppointmentCard = ({ appointment }) => {
    const { id, barber_id, appointment_time, status, user_id } = appointment;
    const date = new Date(appointment_time).toLocaleDateString();
    const time = new Date(appointment_time).toLocaleTimeString();
    const [barber, setBarber] = useState("");
    const [client_name, setClient] = useState("");

    const callBarber = async () => {
        const data = await fetchBarber(barber_id);
        setBarber(data);
    };

    const callUser = async () => {
        const data = await fetchUser(user_id);
        setClient(data);
    };

    useEffect(() => {
        callBarber();
        callUser();
    }, []);

    const colors = {
        Done: "#4caf50", // Green
        Upcoming: "#ff9800", // Orange
        Cancelled: "#f44336", // Red
    };

    const handleChange = (e) => {
        const value = e.target.value;
        updateAppointmentStatus(user_id, value, id);
        window.location.reload();
    };

    return (
        <Card
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#1e1e1e",
                color: "#fff",
                border: "1px solid #444",
                borderRadius: 2,
                p: 2,
                mb: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
            }}
        >
            {/* Left Section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "#1976d2" }}>
                    {client_name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                    <Typography variant="h6" sx={{ color: "#fff" }}>
                        {client_name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#fff" }}>
                        Barber: {barber}
                    </Typography>
                    <Typography variant="body2" color="gray">
                        {date} | {time}
                    </Typography>
                </Box>
            </Box>

            {/* Right Section */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <Select
                        value={status}
                        onChange={handleChange}
                        sx={{
                            color: "#fff",
                            ".MuiOutlinedInput-notchedOutline": {
                                borderColor: "#fff",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#1976d2",
                            },
                            ".MuiSvgIcon-root": {
                                color: "#fff",
                            },
                        }}
                    >
                        <MenuItem value={"Upcoming"}>Upcoming</MenuItem>
                        <MenuItem value={"Done"}>Done</MenuItem>
                        <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
                    </Select>
                </FormControl>
                <Chip
                    label={status}
                    sx={{
                        backgroundColor: colors[status],
                        color: "#fff",
                        fontWeight: "bold",
                    }}
                />
            </Box>
        </Card>
    );
};

export default AppointmentCard;
