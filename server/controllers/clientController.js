import client from '../database/db.js';
const addClient = async (req, res) => {
    try {
      await client.query("set search_path to 'admin'");

      const { client_id, name, appointment_time, barber_id, status } = req.body;

      const c_id = parseInt(client_id);
      const b_id = parseInt(barber_id);

      if (isNaN(c_id) || isNaN(b_id)) {
        return res
          .status(400)
          .json({ error: "Invalid client_id or barber_id "  ,value: c_id });
      }

      const a_time = new Date(appointment_time);

      // Ensure the appointment_time is a valid date
      if (isNaN(a_time.getTime())) {
        return res.status(400).json({ error: "Invalid appointment_time" });
      }
      const result = await client.query(
        "INSERT INTO clients(client_id,client_name, appointment_time, barber_id, status) VALUES($1, $2, $3, $4,$5) RETURNING *",
        [c_id, name, a_time, b_id, status]
      );
      res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const fetchClients = async (req, res) => {
    try {
        await client.query("set search_path to 'admin'");
        const result = await client.query('SELECT * FROM clients');
        res.status(200).json(result.rows);  
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        await client.query("set search_path to 'admin'");
        const { id, status } = req.body;
        const result = await client.query(
            "UPDATE clients SET status = $1 WHERE client_id = $2 RETURNING *",
            [status, id]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export { addClient,fetchClients ,updateAppointmentStatus};