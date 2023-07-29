const express = require("express");
const mongoose = require("mongoose");

const authRouter = require('./routes/auth');
const DB = "mongodb://localhost:27017/Amazon"

const app = express();
mongoose.connect(DB).then(() =>{
    console.log("Connection To Mongoose Successfull")
}).catch((e) =>{
    console.log(e)
})

const PORT = 3000;

//Creating API

//middleware
app.use(express.json());
app.use(authRouter);

app.get("/", (req, res) => {
  res.json({hello :"Hello From Server"});
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is connected at ${PORT}`);
});
