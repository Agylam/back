"use strict";
exports.__esModule = true;
var routing_controllers_1 = require("routing-controllers");
var UserController_1 = require("./Controllers/UserController");
var app = (0, routing_controllers_1.createExpressServer)({
    controllers: [UserController_1.UserController]
});
app.listen(3000);
