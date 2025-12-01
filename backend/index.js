const express = require("express");
const usersRoutes = require("./routes/users");
const employeesRoutes = require("./routes/employees");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

app.use(cookieParser());
app.use(cors({
    origin: "https://101312826-comp3123-assignment2.vercel.app",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1", usersRoutes);
app.use("/api/v1", employeesRoutes);

app.get("/", (req, res) => {
    res.send("<h1>COMP3123 Assignment 1</h1>");
});

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected!")
    app.listen(SERVER_PORT, () => {
        console.log(`Server running at http://localhost:${SERVER_PORT}/`)
    })
}).catch(err => {
    console.log(err)
})