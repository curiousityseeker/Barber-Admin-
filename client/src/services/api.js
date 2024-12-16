import axios from 'axios';

const url = 'http://localhost:3000';

export const fetchAppointments = async () => {
    try {
        const { data } = await axios.get(`${url}/allClients`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchBarber = async (id) => {
    try {
        const { data } = await axios.get(`${url}/allBarber?id=${id}`);
        return data[0].barber_name;
    } catch (error) {
        console.log(error);
    }
}
export const updateAppointmentStatus = async (id, status) => {
    try {
        const { data } = await axios.put(`${url}/updateStatus`, { id, status });
        return data;
    } catch (error) {
        console.log(error);
    }
}