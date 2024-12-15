import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import router from './routes/routes.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/',router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))