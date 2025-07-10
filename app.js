const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const connectDB = require("./config/database");
const homeRoute = require("./routes/main");

// Connect Database
connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", homeRoute);

app.listen(PORT, () => {
  console.log("App listening on ", PORT);
});
