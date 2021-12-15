const express = require('express');
var app = express();
const mongoose = require('mongoose');
require('dotenv').config();
var bodyParser = require('body-parser')
const courseController = require('./controllers/userController');
const routes = require("./routes/routers");
const authroutes = require("./routes/authrouters")
mongoose.connect('mongodb://localhost:27017/jwtauth', { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('Successfully Established Connection with MongoDB')
    }
    else {
        console.log('Failed to Establish Connection with MongoDB with Error: ' + err)
    }
});

console.log("git demo ");
console.log("m1 ");
console.log("d1 ");
console.log("d2 ");
console.log("d3 ");
console.log("d4 ");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// route handling
console.log("m2 ");
app.use('/', routes);
app.use('/', authroutes);
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
console.log('port==',port);
//console.log(require('crypto').randomBytes(64).toString('hex'))
app.listen(port, () => console.log(`Listening on port ${port}..`));