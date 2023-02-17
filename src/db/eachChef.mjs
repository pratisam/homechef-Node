import { pool } from "../db/connectDb.mjs";
export const eachChef = async(req, res) => {
    const cuisineType = (req.params.id)
    console.log(cuisineType)
    
    try {
        const eachChef = await pool.query(
        `SELECT * FROM "chefTable" 
        INNER JOIN "userTable" 
        ON "chefTable".id = "userTable"."chefTable_id"
        WHERE "cuisineType" = ${cuisineType};` ) 
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


// `SELECT * FROM "chefTable"
//  INNER JOIN "menuDetails" ON "chefTable".id = "chefTable_id";`
// /*******getting userTable,Login */
// SELECT * FROM "Login"
// INNER JOIN "userTable" ON "Login".id = "login_id";
// /**********getting three tables login, usertable, cheftable*/
// SELECT * FROM "Login"
//  INNER JOIN "userTable" ON "Login".id = "login_id"
//  INNER JOIN "chefTable" ON "chefTable_id" = "chefTable".id;
/***fields */
// id , email , password, id, name , pre-nom, address, postCode, phone, chefTable_id, login_id, userOrders_id, id,  aboutMe , cuisineType, rating, postCode, chefPhoto
// client.query(`WITH ins1 AS (
//     INSERT INTO "Login"(id,email, password)
//     VALUES ('3','home2@app.com', 'shaggk')
//     -- ON     CONFLICT DO NOTHING 
//     RETURNING id AS login_id
//     )

//     INSERT INTO "userTable" (id, name, "pre-nom", address, "postCode",phone,login_id,"userOrders_id")
//     SELECT login_id ,'3','testdb','psql','123','1000','042442444', '1'
//      FROM ins1;`)
    
//  INSERT INTO "chefTable" (user_id, value)
//  SELECT user_id, 'ss2' FROM ins2;
/***********working code for chefRegistration */
// WITH ins AS (
//     INSERT INTO "Login" (id, email, password)
//     VALUES ('6', 'user3@app.com', 'villageman')
//     RETURNING id
//     ), ins2 AS (
//     INSERT INTO "chefTable" (id, "aboutMe", "cuisineType", rating, "postCode", "chefPhoto")
//     VALUES ('7', 'I am chef from France.', '2', '4', '1200', 'photourl')
//     RETURNING id
//     )
//     INSERT INTO "userTable" (id, name, "pre-nom", address, "postCode", phone, "chefTable_id", login_id, "userOrders_id")
//     SELECT '6', 'test data', 'test3', '111', '1000', '04325', ins2.id, ins.id, '1'
//     FROM ins, ins2;