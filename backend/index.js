const express = require("express");
const usersRoutes = require("./routes/users");
const employeesRoutes = require("./routes/employees");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", usersRoutes);
app.use("/api/v1", employeesRoutes);

app.get("/", (req, res) => {
    res.send("<h1>COMP3123 Assignment 1</h1>");
});

mongoose
    .connect(DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.error(err));

module.exports = app;