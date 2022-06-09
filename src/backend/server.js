const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const User = require('./User.schema');

const hostname = 'localhost';
const port = 3001;

/* 
    uri of the mongodb database
*/
const dbUri = "mongodb://localhost/form";

/* 
    Connection to the database
*/
const connectDB = async() => {
    try {
    await mongoose.connect(dbUri);
    console.log("Connected");
    } catch (error) {
    console.log("Something went wrong", error);
    }
};

connectDB();

/* 
    For data acces - CORS policy 
*/
app.use(cors());

/* 
    Function that transforms the URL-encoded requests
    into JS-accessible variables under req.body
    extended: false because only strings
    are contained in req.body
*/
app.use(bodyParser.urlencoded({ extended: false }))

/* 
    Function that checks the requests 
    and transforms the text-based json input
    into JS-accessible variables under req.body
*/
app.use(bodyParser.json())

/* 
    Function that routes the HTTP POST 
    on the same page (routing '/')
    with the specified callback functions

*/
app.post('/', function(req, res) {
    
    /* 
        Get all data from req.body
        and store them in the according variables
    */
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var gender = req.body.gender;
    
    /* 
        Create a data entry for the database
        Using the model imported from './User.schema'
    */
    var User1 = new User({ firstname: firstname, lastname: lastname, email: email, gender: gender });
    
    /* 
        Save the entry to the database
    */
    User1.save(function(err, data) {
        if (err) {
            res.send({status:0, result: err});
        } else {
            res.send({status:1, result: User1});
        }
    });

    /* 
        Print the content of req.body
        to test if the server receives it
    */
    console.log(req.body);
});

/* 
    Function that binds and listens to
    all the connection on the specified
    host and port
*/
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});