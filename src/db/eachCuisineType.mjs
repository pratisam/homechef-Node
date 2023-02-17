import { pool } from "../db/connectDb.mjs";

export const eachCuisineType = async(req, res) => {
    const id = (req.params.id)
    console.log(id)
    //do the params here
    try {
        const eachChef = await pool.query(
        `SELECT "cuisineType" FROM "cuisineType" 
        WHERE id = ${id};` ) 
            res.send(eachChef.rows);
    } catch (err) {
        console.error(err)
        return err.status(500).send({error:"internal server error"})
    }
  
}