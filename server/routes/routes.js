import express, { Router } from 'express';
import { fetchClients, updateAppointmentStatus} from "../controllers/clientController.js";
import { fetchBarber } from "../controllers/barberController.js";
const router = express.Router();

router.get('/allClients',fetchClients);
router.get("/allBarber/:id?",fetchBarber);
router.put("/updateStatus", updateAppointmentStatus);
export default router;