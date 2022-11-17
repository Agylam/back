const express = require("express");
const fs = require("fs");
const jwt = require('jsonwebtoken');

const app = express();

const config = require("./config.json");

app.use(express.json())

app.get("/auth", function(request, response) {
    fs.readFile(__dirname + "/users.json", function read(err, content) {
        if (err) {
            throw err;
        }
        var users = JSON.parse(content);
        var userid = users.findIndex(obj => obj.user === request.query.email && obj.pass === request.query.password)
        if (userid !== -1) {
            var token = jwt.sign({ data: { id: userid, name: users[userid].user } }, config.jwtcode, { expiresIn: config.time_session });
            response.send(JSON.stringify({ 'status': 'success', 'jwt': token }));
        } else {
            response.status(404);
            response.send({ 'status': 'error', 'message': 'Wrong email or password!' });
        }
    });
});
app.get("/schedule", function(request, response) {
    fs.readFile(__dirname + "/times.json", function read(err, content) {
        if (err) {
            throw err;
        }
        response.send(content);
    });
});
app.put("/schedule", function(request, response) {
    var token = request.headers.authorization.split(' ')[1];
    jwt.verify(token, config.jwtcode, function(err, decoded) {
        if (err === null) {
            var user = decoded.data;
            if (request.body.length === 7) {
                fs.writeFile(__dirname + "/times.json", JSON.stringify(request.body), function(err) {
                    if (err) {
                        response.status(500);
                        response.send({ 'status': 'error', 'message': err });
                    } else {
                        response.send(JSON.stringify({ 'status': 'success' }));
                    }
                });
            } else {
                response.status(400);
                response.send({ 'status': 'error', 'message': 'Bad JSON' });
            }
        } else {
            response.status(401);
            response.send({ 'status': 'error', 'message': 'JWT: ' + JSON.stringify(err) });
        }
    });
});

app.listen(3000);