const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const User = require('./User.schema');

const hostname = 'localhost';
const port = 3001;

const dbUri = "mongodb://localhost/form";

const connectDB = async() => {
    try {
    await mongoose.connect(dbUri);
    console.log("Connected");
    } catch (error) {
    console.log("Something went wrong", error);
    }
};

connectDB();

// For data acces - CORS policy
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.post('/', function(req, res) {
    
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var gender = req.body.gender;
    
    var User1 = new User({ firstname: firstname, lastname: lastname, email: email, gender: gender });
    
    User1.save(function(err, data) {
        if (err) {
            res.send({status:0, result: err});
        } else {
            res.send({status:1, result: User1});
        }
    });

    console.log(req.body);
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});