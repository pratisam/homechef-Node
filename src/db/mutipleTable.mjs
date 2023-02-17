import express from "express"
import cors from "cors"
import { pool } from "./connectDb.mjs"
// import { dbConnect } from "../db/connectTodb.mjs"

const app = express()
app.use(express.json())
// dbConnect()
export const inputLogin = async(req,res)=>{
    const {id,email,password, name, id2,firstname, address, postCode,phone,userOrder} = req.body
    try {
        const registerChef = `
                WITH ins AS (
                    INSERT INTO "Login"
                    (id, email, password)
                    VALUES
                    ($1, $2)
                    RETURNING id)
                ins2 AS (
                    INSERT INTO "chefTable" 
                    ("aboutMe", "cuisineType", rating, "postCode", "chefPhoto")
                    ($3, $4, $5, $6, $7)
                    RETURNING id
                    )
                INSERT INTO "userTable"
                (name, "pre-nom", address, "postCode",phone,"chefTable_id","login_id")
                SELECT $8, $9, $10, $11, $12, ins2.id, ins.id
                FROM ins, ins2;`;
        const values = [id, email, password, id2, name, firstname, address, postCode, phone, userOrder];
//try to change userOrderLink to null
        await pool.query(register, values, (err, res) => {
            console.log(err ? err.stack : res.rows[0])
        });
        return  res.json({info:"menu added"})
    } catch (error) {
        console.error(error)
        return res.status(500).send({error:"internal server error"})
    }
}


