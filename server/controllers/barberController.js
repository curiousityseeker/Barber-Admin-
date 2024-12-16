
import client from "../database/db.js";

const fetchBarber = async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid barber_id" });
    }
    await client.query("set search_path to 'admin'");
    const result = await client.query("SELECT * FROM barbers where barber_id = $1", [id]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export { fetchBarber };
