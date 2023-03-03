"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Post = exports.User = exports.Users = void 0;
var class_transformer_1 = require("class-transformer");
var Users = /** @class */ (function () {
    function Users() {
        var users = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            users[_i] = arguments[_i];
        }
        this.users = users;
    }
    __decorate([
        (0, class_transformer_1.Type)(function () { return User; })
    ], Users.prototype, "users");
    return Users;
}());
exports.Users = Users;
var User = /** @class */ (function () {
    function User(username) {
        var posts = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            posts[_i - 1] = arguments[_i];
        }
        this.username = username;
        this.posts = posts;
    }
    User.prototype.addPost = function (post) {
        this.posts.push(post);
    };
    __decorate([
        (0, class_transformer_1.Type)(function () { return Post; })
    ], User.prototype, "posts");
    return User;
}());
exports.User = User;
var Post = /** @class */ (function () {
    function Post(title) {
        this.title = title;
    }
    Post.prototype.changeTitle = function (title) {
        this.title = title;
    };
    return Post;
}());
exports.Post = Post;
