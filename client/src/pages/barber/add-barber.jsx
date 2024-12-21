import React from 'react'
import { Box, Paper, Typography, TextField, MenuItem, Button, Grid } from '@mui/material'
import { addBarber } from '../../services/api';
const AddBarber = () => {
  const [formData, setFormData] = React.useState({
    barber_name: "",
    status: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
          e.preventDefault();
          await addBarber(formData).then((data) => {
            window.location.href = "/barber-list";
          }).catch((err) => {
              console.log(err);
          });
      };
  return (
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
        Add Barber
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          {/* Customer Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="barber_name"
              label="Barber Name"
              type="text"
              value={formData.barber_name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              name="status"
              label="Barber Status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <MenuItem value="Working">Working </MenuItem>
              <MenuItem value="Available">Available</MenuItem>
            </TextField>
          </Grid>
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
  )
}

export default AddBarber