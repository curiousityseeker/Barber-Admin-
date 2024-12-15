
import client from "../database/db.js";

const fetchBarber = async (req, res) => {
  try {
    await client.query("set search_path to 'admin'");
    const result = await client.query("SELECT * FROM barbers");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export { fetchBarber };
