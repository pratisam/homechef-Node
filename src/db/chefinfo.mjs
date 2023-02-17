import { pool } from "../db/connectDb.mjs";

export const chefInfoById = async(req, res) => {
    const id = (req.params.id)
    console.log(id)
    //do the params here
    try {
        const eachChef = await pool.query(
        `SELECT * FROM "chefTable" 
        INNER JOIN "menuDetails"
        ON "chefTable".id = "menuDetails"."chefTable_id"
        INNER JOIN "userTable" 
        ON "chefTable".id = "userTable"."chefTable_id"
        WHERE "chefTable".id = ${id};` ) 
            res.json(eachChef.rows);
    } catch (err) {
        console.error(err)
        return err.status(500).send({error:"internal server error"})
    }
  
}
//INNER JOIN "menuDetails"
// ON "chefTable".id = "menuDetails"."chefTable_id"
// SELECT * FROM "chefTable"
// INNER JOIN "menuDetails"
// ON "chefTable".id = "menuDetails"."chefTable_id"
// INNER JOIN "userTable" 
// ON "chefTable".id = "userTable"."chefTable_id"
// WHERE "cuisineType" = $1;


