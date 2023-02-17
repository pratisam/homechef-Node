import express from "express"
import cors from "cors"
import { pool } from "../db/connectDb.mjs"
// import { dbConnect } from "../db/connectTodb.mjs"

const app = express()
app.use(express.json())
// dbConnect()
export const inputMenu = async(req,res)=>{
    try {
        const {id,description,name,date,price,userOrder_rating,chefTable_id,photoUrl}=req.body
        console.log(req.body)
        const menuQuerry =`INSERT INTO  "menuDetails"(id, description, name, date, price, "userOrder_rating", "chefTable_id", "photoUrl")
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`
        await pool.query(menuQuerry, [id,description,name,date,price,userOrder_rating,chefTable_id,photoUrl])
        return  res.json({info:"menu added"})
    } catch (error) {
        console.error(error)
        return res.status(500).send({error:"internal server error"})
    }
}