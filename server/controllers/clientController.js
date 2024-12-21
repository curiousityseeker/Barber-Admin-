import client from '../database/db.js';

const fetchAppointment = async (req, res) => {
  try {
    await client.query("set search_path to 'admin'");
    const result = await client.query("SELECT * FROM appointments where status = 'Upcoming' ORDER BY appointment_time ASC");
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const fetchAllAppointment = async (req, res) => {
  try {
    await client.query("set search_path to 'admin'");
    const result = await client.query("SELECT * FROM appointments  ORDER BY appointment_time ASC");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const fetchUser = async (req, res) => {
    try {
        let { id } = req.query;
        id = parseInt(id);
        await client.query("set search_path to 'admin'");
        const result = await client.query(
          "SELECT user_id, user_name, email FROM users WHERE user_id = $1",
          [id]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const updateAppointmentStatus = async (req, res) => {
    try {
        await client.query("set search_path to 'admin'");
        const { id, status,user_id } = req.body;
        const result = await client.query(
            "UPDATE appointments SET status = $1 WHERE user_id = $2 AND id = $3 RETURNING *",
            [status, user_id, id]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export { fetchAppointment ,updateAppointmentStatus,fetchUser ,fetchAllAppointment};