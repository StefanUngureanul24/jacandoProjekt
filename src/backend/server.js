const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const hostname = 'localhost';
const port = 3001;

/*
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});
*/

// For data acces - CORS policy
app.use(cors());

mongoose.connect('mongodb://localhost/', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.post('/', function(req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var gender = req.body.gender;
    
    var UserSchema = mongoose.Schema({
        firstname: String,
        lastname: String,
        email: String,
        gender: String
    });
    
    var User = mongoose.model('User', UserSchema, 'users');
    
    var User1 = new User({ firstname: firstname, lastname: lastname, email: email, gender: gender });
    User1.save(function(data, err) {
        if (err) {
            res.send({status:0, result:err});
        } else {
            res.send({status:1, result:data});
        }
    });
    
    console.log(req.body);
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});