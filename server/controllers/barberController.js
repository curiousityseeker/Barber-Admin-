import client from "../database/db.js";
const addBarber = async (req, res) => {
  try {
    await client.query("set search_path to 'admin'");
    let { barber_name, status } = req.body;
    const result = await client.query(
      "INSERT INTO barbers (barber_name, status) VALUES ($1, $2) RETURNING *",
      [barber_name, status]
    );
    res.status(201).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const fetchBarber = async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid barber_id" });
    }
    await client.query("set search_path to 'admin'");
    const result = await client.query(
      "SELECT * FROM barbers where barber_id = $1",
      [id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const BarberList = async (req, res) => {
  try {
    await client.query("set search_path to 'admin'");
    const result = await client.query("SELECT * FROM barbers");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updateBarberStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    await client.query("set search_path to 'admin'");
    const result = await client.query(
      "UPDATE barbers SET status = $1 WHERE barber_id = $2 RETURNING *",
      [status, id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export { fetchBarber, BarberList, addBarber, updateBarberStatus };
