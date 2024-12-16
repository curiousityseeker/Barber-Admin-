import express, { Router } from 'express';
import { addClient,fetchClients, updateAppointmentStatus} from "../controllers/clientController.js";
import { fetchBarber } from "../controllers/barberController.js";
const router = express.Router();

router.get('/allClients',fetchClients);
router.get("/allBarber/:id?",fetchBarber);
router.post("/addClient", addClient);
router.put("/updateStatus", updateAppointmentStatus);
export default router;