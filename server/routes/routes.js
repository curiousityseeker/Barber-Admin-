import express from 'express';
import { fetchAppointment, fetchUser, updateAppointmentStatus,fetchAllAppointment} from "../controllers/clientController.js";
import { fetchBarber } from "../controllers/barberController.js";
const router = express.Router();

router.get('/allClients',fetchAppointment);
router.get('/allAppointments',fetchAllAppointment);
router.get('/user/:id?',fetchUser);
router.get("/barber/:id?",fetchBarber);
router.put("/updateStatus", updateAppointmentStatus);
export default router;