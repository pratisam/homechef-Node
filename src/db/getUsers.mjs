import { pool } from "./connectDb.mjs";

export const getUser = async(req, res) => {
    try {
        const allUser = await pool.query(`SELECT * FROM "Login"`) 
            res.json(allUser.rows);
    } catch (err) {
        console.error(err)
        return err.status(500).send({error:"internal server error"})
    }
  
}
