//import express, body-parser
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const accountRoutes = require("./routes/account");
const bankRoutes = require("./routes/bank");

//Create express server instance
const server = express();
//Middlewares[body-parser]
server.use(bodyParser.json());

server.use(accountRoutes);
server.use(bankRoutes);

//start server
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://cokerolufemigbolahan:gbossey1234@cluster0.lqes6k1.mongodb.net/bankservice_db?retryWrites=true&w=majority"
  )
  .then((result) => {
    server.listen(3000, () => console.log("server is ready!"));
    console.log("Connected to the Mongoose DB!");
  })
  .catch((err) => console.log(err));
