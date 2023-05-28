import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import connecttoDB from "./config/connecttoDB.js";
import Users from "./models/Users.js";
import dataroute from "./routes/dataroute.js";
const port = process.env.PORT || 5000;

const app = express();
// so that express can raed json
app.use(express.json());
//for url encoded
app.use(express.urlencoded({extended: false}))

app.use('/data', dataroute);

app.listen(port, ()=>console.log(`listening on ${port}`))




// const app = express();
// //so that express can raed json
// app.use(express.json());

// connecttoDB();

// app.get("/", (req, res)=>{
//     res.send("Hello World!");
// });

// app.post("/", async (req, res)=>{
//     const plan = req.body.plan;
//     const user = await Users.create(
//        {plans:plan,}
//     );
//     res.json({plan:plan});
// });

// app.listen(5000 || process.env.PORT);




















