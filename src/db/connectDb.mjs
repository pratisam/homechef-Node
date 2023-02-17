import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
    user : "homecheftrial_admin",
    password :"homechef",
    host : "localhost",
    port : 5432,
    database: "homecheftrial"

})