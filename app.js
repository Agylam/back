const express = require("express");
const fs = require("fs");
var jwt = require('jsonwebtoken');
const app = express();

const filePath = "users.json";

app.use(express.static(__dirname));

app.get("/auth", function(request, response) {
    const content = fs.readFileSync(__dirname + "/" + filePath, "utf8");
    const users = JSON.parse(content);
    var userid = users.findIndex(obj => obj.user === request.query.email && obj.pass === request.query.password)
    if (userid !== -1) {
        var token = jwt.sign({ id: userid, name: users[userid].user }, 'shhhhh');
        response.send(JSON.stringify({ 'status': 'success', 'jwt': token }));
    } else {
        response.status(400);
        response.send("{'status':'error','message':'Wrong email or password!'}");
    }
});

app.listen(3000);