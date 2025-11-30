const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const UsersModel = require("../models/users")
const routes = express.Router()

routes.post("/user/signup", (req, res) => {
    const userData = req.body;

    // validate if all info is filled out
    if (!userData.username || !userData.email || !userData.password) {
        return res.status(400).send({
            status: false,
            message: "All fields are required.",
        })
    }

    // check if user already exists
    UsersModel.findOne({email: userData.email}).then((existingUser) => {
        if (existingUser) {
            return res.status(400).send({
                status: false,
                message: "User with this email already exists"
            })
        }

        // hash password
        bcrypt.hash(userData.password, 10).then((hashedPassword) => {
            userData.password = hashedPassword;

            const newUser = new UsersModel(userData);
            // save user to the database
            newUser.save().then((user) => {
                res.status(201).send({
                    status: true,
                    message: "User created successfully",
                    user: user
                })
            }).catch((err) => {
                res.status(500).send({
                    status: false,
                    message: "Error saving user",
                    error: err.message
                })
            })
        }).catch((err) => {
            res.status(500).send({
                status: false,
                message: "Error hashing password",
                error: err.message
            })
        })
    }).catch((err) => {
        res.status(500).send({
            status: false,
            message: "Error checking if user with this email already exists",
            error: err.message
        })
    })
})

routes.post("/user/login", (req, res) => {
    const signInData = req.body;

    // validate if all info is filled out
    if (!signInData.email || !signInData.password) {
        return res.status(400).send({
            status: false,
            message: "All fields are required"
        })
    }

    // check if user exists
    UsersModel.findOne({email: signInData.email}).then((user) => {
        if (!user) {
            return res.status(404).send({
                status: false,
                message: "User with this email does not exist"
            })
        }

        // check if password matches
        bcrypt.compare(signInData.password, user.password,).then((isMatch) => {
            if (isMatch) {
                // Create JWT token
                const token = jwt.sign(
                    {id: user._id, email: user.email},
                    process.env.JWT_SECRET,
                    {expiresIn: "1d"}
                );

                // Set cookie
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    maxAge: 24 * 60 * 60 * 1000
                });

                res.status(200).send({
                    status: true,
                    message: "User logged in successfully",
                    user: {
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                res.status(400).send({
                    status: false,
                    message: "User login failed, incorrect password!",
                })
            }
        }).catch((err) => {
            res.status(500).send({
                status: false,
                message: "Error verifying password",
                error: err.message
            })
        })
    }).catch((err) => {
        res.status(500).send({
            status: false,
            message: "Error finding user",
            error: err.message
        })
    })
})

routes.get("/user/checkAuth", (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({status: false, message: "Not authenticated"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).send({status: true, message: "Authenticated", user: decoded});
    } catch (err) {
        res.status(401).send({status: false, message: "Invalid token"});
    }
});


module.exports = routes