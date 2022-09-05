const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PrimeNumberRoutes = require("./routes/primeNumber.routes");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

//Connecting to Database
mongoose.connect("mongodb://localhost/Assignment_midas", (err, db) => {
  if (err) {
    console.log("error occured while connecting db");
  } else {
    console.log("Db connected");
  }
});

//Routes
app.use("/api/prime", PrimeNumberRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is started on port :${port}`);
});
