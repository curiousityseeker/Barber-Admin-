import express, { Router } from 'express';
import { fetchClients, addClient } from "../controllers/clientController.js";
import { fetchBarber } from "../controllers/barberController.js";
const router = express.Router();

router.get('/allClients',fetchClients);
router.get("/allBarber",fetchBarber);
router.post("/addClients", addClient);
export default router;