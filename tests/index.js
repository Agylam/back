"use strict";
var _a, _b, _c;
exports.__esModule = true;
require("reflect-metadata");
var node_path_1 = require("node:path");
var node_url_1 = require("node:url");
var node_1 = require("@stenodb/node");
var entities_js_1 = require("./entities.js");
var path = (0, node_path_1.resolve)((0, node_path_1.dirname)((0, node_url_1.fileURLToPath)(import.meta.url)), '..', 'db');
var initialData = new entities_js_1.Users(new entities_js_1.User('John Doe'));
var adapter = new node_1.AsyncAdapter('users', entities_js_1.Users, initialData);
var provider = new node_1.NodeProvider({ path: path });
var database = await provider.create(adapter);
await database.read();
var post = new entities_js_1.Post('Hello world');
(_b = (_a = database.data) === null || _a === void 0 ? void 0 : _a.users[0]) === null || _b === void 0 ? void 0 : _b.addPost(post);
await database.write();
console.log((_c = database.data) === null || _c === void 0 ? void 0 : _c.users[0].posts);
