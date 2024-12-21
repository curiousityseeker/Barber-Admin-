import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Divider,
  CircularProgress,
} from "@mui/material";
import { barberList, updateBarberStatus } from "../../services/api.js";

const BarberList = () => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchBarbers = async () => {
    const data = await barberList(); // Fetch barbers from your API
    setBarbers(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchBarbers();
  }, []);
  const toggleStatus = async (id) => {
    const barber = barbers.find((barber) => barber.barber_id === id);
    const newStatus = barber.status === "Available" ? "Working" : "Available";
    await updateBarberStatus(id, newStatus).then((data) => {
      fetchBarbers();
    }
    ).catch((err) => {
      console.log(err);
    });
  };
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Barber List
      </Typography>

      {/* Available Barbers */}
      <Typography variant="h5" sx={{ color: "green", mb: 2 }}>
        Available Barbers
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={4}>
        {(barbers || []).filter((barber) => barber.status === "Available").length > 0 ? (
          barbers
            .filter((barber) => barber.status === "Available")
            .map((barber) => (
              <Grid item xs={12} sm={6} md={4} key={barber.barber_id}>
                <Card sx={{ textAlign: "center" }}>
                  <CardContent>
                    <Avatar sx={{ width: 56, height: 56, margin: "0 auto", mb: 2 }}>
                      {barber.barber_name ? barber.barber_name[0] : "?"}
                    </Avatar>
                    <Typography variant="h6">{barber.barber_name}</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => toggleStatus(barber.barber_id)}
                    >
                      Mark as Working
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
            No available barbers at the moment.
          </Typography>
        )}
      </Grid>
      <Typography variant="h5" sx={{ color: "blue", mt: 4, mb: 2 }}>
        Working Barbers
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={4}>
        {(barbers || []).filter((barber) => barber.status === "Working").length > 0 ? (
          barbers
            .filter((barber) => barber.status === "Working")
            .map((barber) => (
              <Grid item xs={12} sm={6} md={4} key={barber.barber_id}>
                <Card sx={{ textAlign: "center" }}>
                  <CardContent>
                    <Avatar sx={{ width: 56, height: 56, margin: "0 auto", mb: 2 }}>
                      {barber.barber_name ? barber.barber_name[0] : "?"}
                    </Avatar>
                    <Typography variant="h6">{barber.barber_name}</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => toggleStatus(barber.barber_id)}
                    >
                      Mark as Available
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
            No Barbers are Working at the moment.
          </Typography>
        )}
      </Grid>
    </Box>
  )
}

export default BarberList