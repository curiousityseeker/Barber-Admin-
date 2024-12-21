import express from 'express';
import { fetchAppointment, fetchUser, updateAppointmentStatus,fetchAllAppointment, addAppointment} from "../controllers/clientController.js";
import { BarberList, fetchBarber } from "../controllers/barberController.js";
const router = express.Router();

router.get('/allClients',fetchAppointment);
router.post('/addAppointment',addAppointment);
router.get('/allBarbers',BarberList);
router.get('/allAppointments',fetchAllAppointment);
router.get('/user/:id?',fetchUser);
router.get("/barber/:id?",fetchBarber);
router.put("/updateStatus", updateAppointmentStatus);
export default router;