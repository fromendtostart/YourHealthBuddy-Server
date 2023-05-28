import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();


export default function connecttoDB(){
    mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology: true})
    .then(console.log("Hi!"))
    .catch((error)=>console.log(error.message));
}