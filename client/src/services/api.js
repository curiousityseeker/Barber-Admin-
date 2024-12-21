import axios from "axios";

const url = "http://localhost:3000/admin";

export const fetchAppointments = async () => {
  try {
    const { data } = await axios.get(`${url}/allClients`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const AllAppointment = async () => {
  try {
    const { data } = await axios.get(`${url}/allAppointments`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const login = async (email, password) => {
  try {
    const { data } = await axios.post(`http://localhost:3000/login`, {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchUser = async (id) => {
  try {
    const { data } = await axios.get(`${url}/user?id=${id}`);
    return data[0].user_name;
  } catch (error) {
    console.log(error);
  }
};
export const verifyToken = async (token) => {
  if (!token) return "No token provided";
  try {
    const { data } = await axios.get(`http://localhost:3000/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
export const fetchBarber = async (id) => {
  try {
    const { data } = await axios.get(`${url}/barber?id=${id}`);
    return data[0].barber_name;
  } catch (error) {
    console.log(error);
  }
};


export const addAppointment = async (formData) => {
  try {
    const { data } = await axios.post(`${url}/addAppointment`, formData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const barberList = async () => {
  try {
    const { data } = await axios.get(`${url}/allBarbers`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateAppointmentStatus = async (user_id, status, id) => {
  try {
    const { data } = await axios.put(`${url}/updateStatus`, {
      user_id,
      status,
      id,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const addBarber = async (formData) => {
  try {
    const { data } = await axios.post(`${url}/addBarber`, formData);
    return data;
  } catch (error) {
    console.log(error);
  }
}
export const updateBarberStatus = async (id, status) => {
  try {
    console.log(id, status);
    const { data } = await axios.put(`${url}/updateBarberStatus`, {
      id,
      status,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}