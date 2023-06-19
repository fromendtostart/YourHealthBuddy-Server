import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import connecttoDB from "./config/connecttoDB.js";
import dataroute from "./routes/dataroute.js";
import userroute from "./routes/userroute.js";
const port = process.env.PORT || 5000;

const app = express();
// so that express can raed json
app.use(express.json());
//for url encoded
app.use(express.urlencoded({extended: false}));
//for cors
app.use(cors(
    {origin: 'http://127.0.0.1:5173',
    credentials: true}));

    //additional cors options for credentials

const router = express.Router();

connecttoDB();

app.use('/data', dataroute);
app.use('/users', userroute);
app.post('/', (req, res) => {
    res.send("hello!")
})

app.listen(port, ()=>console.log(`listening on ${port}`))
























