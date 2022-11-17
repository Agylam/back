const express = require("express");
const fs = require("fs");
const jwt = require('jsonwebtoken');

const app = express();

const config = require("./config.json");

app.use(express.static(__dirname));

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
            response.send("{'status':'error','message':'Wrong email or password!'}");
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
    jwt.verify(request.headers.authorization.split(' ')[1], config.jwtcode, function(err, decoded) {
        if (err !== null) {

        } else {
            response.status(404);
            response.send({ 'status': 'error', 'message': 'JWT: ' + });
        }
        response.send({ err, decoded })
            //console.log(decoded.foo) // bar
    });
    // fs.readFile(__dirname + "/times.json", function read(err, content) {
    //     if (err) {
    //         throw err;
    //     }
    //     response.send(content);
    // });
});

app.listen(3000);