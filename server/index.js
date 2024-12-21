import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import router from './routes/routes.js';
import client from "./database/db.js";
import { verifyToken , generateToken } from './utils/generateTokens.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.post('/login',async (req, res) => {
    let { email, password } = req.body;
    await client.query("set search_path to 'admin'"); 
    const result = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (result.rows.length === 0) {
      res.status(401).json({ error: "Invalid email" });
      return;
    }
    const user = result.rows[0];
    if (user.password !== password) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }
    else{
        if(user.isadmin !== true){
            res.status(401).json({ error: "Not authorized" });
            return;
        }
        else{
            res.json({
              token: generateToken(user.user_id),
            });
        }
    }

});

app.get('/verify', async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);
    res.json(decoded);
  });
app.use('/admin',router);



app.listen(port, () => console.log(`Example app listening on port ${port}!`))