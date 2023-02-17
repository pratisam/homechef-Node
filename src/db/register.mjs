import  bcrypt  from "bcrypt"
import jwt from "jsonwebtoken";
import { pool } from "./connectDb.mjs";

const register = async(req,res) => {
    const {id, email , password} = req.body
        try {
            const  data  =  await pool.query(`SELECT * FROM "Login" WHERE email = $1;`, [email]); 
            //Checking if user already exists
            const  arr  =  data.rows;
            if (arr.length  !=  0) {
                return  res.status(400).json({
                error: "Email already there, No need to register again.",
                });
            }
            else {
                bcrypt.hash(password, 10, (err, hash) => {
            if (err)
                res.status(err).json({
                    error: "Server error",
                });
            const  user  = {
                id: id,
                email,
                 hash
            };
    
            let flag  =  1; 
            //Declaring a flag
    
            //Inserting data into the database
    
            pool
            .query(`INSERT INTO "Login" ( id,email, password) VALUES ($1,$2,$3) RETURNING id as "login_id";`, [ user.id, user.email, user.password], (err) => {
    
                if (err) {
                    flag  =  0; 
                    //If user is not inserted is not inserted to database assigning flag as 0/false.
                    console.error(err);
                    return  res.status(500).json({
                    error: "Database error"
                    })
                }
                else {
                    flag  =  1;
                    res.status(200).send({ message: 'User added to database, not verified' });
                    pool
                    .query(`INSERT INTO "userTable" (id, name, "pre-nom", address, "postCode",phone,login_id,"userOrders_id")`, [ '3','testdb','psql','123','1000','042442444', '1'])
                }
            })
    
            //jwt token
            if (flag) {
                const  token  = jwt.sign( //Signing a jwt token
                    {
                    user
                    },
                    `${process.env.SECRET_KEY}`
                    );
                };
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
        error: "Database error while registring user!", //Database connection error
    });
    }
}

export default register

