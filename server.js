import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import connecttoDB from "./config/connecttoDB.js";
import Users from "./models/Users.js";


const app = express();
//so that express can raed json
app.use(express.json());

connecttoDB();

app.get("/", (req, res)=>{
    res.send("Hello World!");
});

app.post("/", async (req, res)=>{
    const plan = req.body.plan;
    const user = await Users.create(
       {plans:plan,}
    );
    res.json({plan:plan});
});

app.listen(5000 || process.env.PORT);



// app.post("/", async (req, res)=>{
//     const plan = req.body.plan;
//     const user = await Users.create(
//        {plans:plan,}
//     );
//     res.json({plan:plan});
// });



















// const app = express();

// app.use(bodyParser.json({limit: "30mb", extended: true}));
// app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
// app.use(cors());

// const CONNECTION_URL = "mongodb+srv://chandramauligupta:VMrdR7ActjRzxw5C@yourhealthbuddy.qtxdyne.mongodb.net/?retryWrites=true&w=majority";
// const PORT = process.env.PORT || 5000;

// mongoose.connect(CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology: true})
//     .then(()=> app.listen(PORT, ()=>console.log("Hi!")))
//     .catch((error)=>console.log(error.message));

// app.get("/", (req, res) => {
//     console.log("Heya");
// });

// app.listen(3000);
