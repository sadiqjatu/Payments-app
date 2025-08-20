//requiring all the modules
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const rootRouter = require("./routes/index.js");
const cors = require("cors");

const dbUrl = process.env.MONGODB_URI;
async function main(){
    await mongoose.connect(dbUrl);
}

//connecting to mongoDB paytm database
main().then(()=>{
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

app.use(cors({
    origin: "http://localhost:3000/",
    credentials: true
}));
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(8080, () => {
    console.log("App is listening on port: 8080");
});