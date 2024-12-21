import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
    Box,
    TextField,
    MenuItem,
    Button,
    Typography,
    Grid,
    Paper,
    CircularProgress,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { addAppointment, barberList } from "../../services/api";

const AddAppointment = () => {
    const [loading,setLoading] = useState(true);
    const [formData, setFormData] = useState({
        customer_name: "",
        barber_id: "",
        appointment_time: dayjs(), // Default to current time
        status: "Upcoming", // Default status
        payment_status: "Pending", // Default payment status
    });

    const [availableBarbers, setAvailableBarbers] = useState([]);

    const fetchAvailableBarbers = async () => {
        const barber = await barberList();
        setAvailableBarbers(barber);
        setLoading(false);
    };
    useEffect(() => {
        fetchAvailableBarbers();
    }, []);

    // console.log(availableBarbers);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDateChange = (newValue) => {
        setFormData((prevState) => ({
            ...prevState,
            appointment_time: newValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addAppointment(formData).then((data) => {
            console.log("Appointment added");
        }).catch((err) => {
            console.log(err);
        });
        
        // window.location.href = "/";

        // Submit the form data to your API
    };

    if(loading){
        return <CircularProgress />
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                component={Paper}
                elevation={3}
                sx={{
                    maxWidth: 600,
                    margin: "auto",
                    mt: 5,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Add Appointment
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        {/* Customer Name */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="customer_name"
                                label="Customer Name"
                                type="text"
                                value={formData.customer_name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        {/* Barber Selection */}
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                name="barber_id"
                                label="Select Barber"
                                value={formData.barber_id}
                                onChange={handleChange}
                                required
                            >
                                {availableBarbers.map((barber) => (
                                    <MenuItem key={barber.barber_id} value={barber.barber_id}>
                                        {barber.barber_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {/* Appointment Time */}
                        <Grid item xs={12}>
                            <DateTimePicker
                                label="Appointment Time"
                                value={formData.appointment_time}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                                required
                            />
                        </Grid>

                        {/* Status */}
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                name="status"
                                label="Appointment Status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="Upcoming">Upcoming (Waiting)</MenuItem>
                                <MenuItem value="Done">Done (Service Completed)</MenuItem>
                                <MenuItem value="Cancelled">Cancelled</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Payment Status */}
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                name="payment_status"
                                label="Payment Status"
                                value={formData.payment_status}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="Paid">Paid</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </LocalizationProvider>
    );
};

export default AddAppointment;
