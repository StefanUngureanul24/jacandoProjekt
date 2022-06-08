const http = require('http');
const express = require('express');
const app = express();

const hostname = 'localhost';
const port = 3001;

/*
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});
*/

app.post('/user', function(req, res) {
    console.log(req.body);
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});