//Import the dependencies
const express = require('express');
const mongoose = require('mongoose');
//Creating a Router
var router = express.Router();
const User = require('../models/user.model');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.welcome  = function (req, res) {
    res.status(200).send("Welcome 🙌 ");
    //res.json('test');
}

exports.addUser =  async function (req, res) {
    try {
        console.log('body==', req.body);
        const { first_name, last_name, email, password } = req.body;
        console.log(first_name, last_name, email, password);
        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
        console.log(oldUser);
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user =  await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
}

exports.login = async function (req,res) {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
}

//Creating a function to update updateUser
exports.updateUser= function(req, res) {
    User.findOneAndUpdate({ _id: req.params.id },req.body, {new: true},(err, doc) => {
        if (!err) { 
            res.status(200).json(doc); 
        }
        else {
            console.log('Error during updating the record: ' + err);
        }
    });
}




//Creating a function to list user 
exports.listUser = function (req, res) {
    User.find((err, docs) => {
        if (!err) {
            res.status(202).json(docs);            
        }
        else {
            console.log('Failed to retrieve the user List: ' + err);
        }
    });
}
//Creating a function to delete user 
exports.deleteUser = function (req, res) {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.status(202).json(doc);     
        }
        else { console.log('Failed to Delete user Details: ' + err); }
    });
}