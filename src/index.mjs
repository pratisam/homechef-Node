import cookieParser from "cookie-parser";
import cors from 'cors';
import Express from "express";
import bodyParser from "body-parser";
import register from './db/register.mjs'
import { getUser } from "./db/getUsers.mjs";
import { dbConnect } from "./db/connectTodb.mjs";
import { eachChef } from "./db/eachChef.mjs";
// import { inputLogin } from "./db/mutipleTable.mjs";
import logUser from "./db/login.mjs";
import { inputMenu } from "./db/menuPost.mjs";
import forgotPassword from "./db/forgotPassword.mjs";
import { chefInfoById } from "./db/chefinfo.mjs";
import {eachCuisineType } from "./db/eachCuisineType.mjs"
const app = Express();
dbConnect()
// connecting to db

//connecting to express
app.use(Express.json());
app.use(cookieParser())
app.use(cors({orgin:'http://localhost:3000'}))
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

app.get("/", (req, res) => {
        res.status(200).send("Engine Started, Ready to take off!");
})

app.patch('/forgotPassword',forgotPassword)
app.post('/home/LoginPage',logUser)
app.post('/inputMenu',inputMenu)
app.get('/getUser',getUser)
app.get('/:id/chef',eachChef)
app.get('/:id/eachChef',chefInfoById)
app.get('/home/:id/cuisineType',eachCuisineType )
app.post('/home/LoginPage',register)
const port = 4000
app.listen(port, () => {
    console.log(`Here we go, Engines started at ${port}.`);
})
//dotenv file
// require("./configs/dotenv");

//1.register a user

// app.post('/register', register)
//2.login a user
//3.logout a user
//4.setup a protected route
