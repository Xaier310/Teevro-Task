const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const transactionRoute = require("./routes/transaction");
const cors = require('cors');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

mongoose.connect(
    process.env.MONGO_DB_LINK,
    //  'mongodb://localhost:27017/Teevro', 
    (err) => {
      if (err) throw err;
      console.log("DB Connected Successfully...");
    }
  );

  app.use("/db/transaction-record", transactionRoute);

app.listen(PORT || 3001,()=>{
  console.log("Server is running on 3001");
});

app.get("/",(req,res)=>{
  res.end("Server up and running");
})