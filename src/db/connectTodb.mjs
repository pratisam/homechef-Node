import { pool } from "./connectDb.mjs";

export const dbConnect = () => {
    pool.connect((err) => {
      if (err) {
        console.error("connection error", err.stack);
      } else {
        console.log("connected");
      }
    });
  };

  
