var app = require("../../express");
var userModel = require("../model/user/user.model.server");

app.post("/api/user", createUser);
app.get("/api/user/:userId", findUserById);
app.get("/api/username", findUserByUsername);
app.get("/api/user", findUserByCredentials);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonder.com"},
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@marley.com"},
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "cherrygarcia@gmail.com"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@ccs.neu.edu"}
];

function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user)
        .then(function(userCreated) {
            res.json(userCreated);
        });
}

function findUserById(req, res) {
    var userId = req.params["userId"];
    userModel.findUserById(userId)
        .then(function(userFound) {
            res.json(userFound);
        });
}

function findUserByUsername(req, res) {
    var username = req.query["username"];
    userModel.findUserByUsername(username)
        .then(function(user) {
            res.json(user);
        }, function(err) {
            res.sendStatus(404);
        });
}

function findUserByCredentials(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    userModel.findUserByCredentials(username, password)
        .then(function(user) {
            if (user != null) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function(err) {
            res.send(err);
        });
}

function updateUser(req, res) {
    var userId = req.params["userId"];
    var user = req.body;
    userModel.updateUser(userId, user)
        .then(function(status) {
            res.sendStatus(200);
        });
}

function deleteUser(req, res) {
    var userId = req.params["userId"];
    userModel.deleteUser(userId)
        .then(function(status) {
            res.sendStatus(200);
        });
}