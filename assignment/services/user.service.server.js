var app = require("../../express");

app.get("/api/user/:userId", findUserById);
app.get("/api/user", findUserByUsername);
app.get("/api/username", findUserByCredentials);

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonder.com"},
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@marley.com"},
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "cherrygarcia@gmail.com"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@ccs.neu.edu"}
];

function findUserById(req, res) {
    var userId = req.params["userId"];
    console.log("Finding user with id " + userId);
    var user = users.find(function(user) {
        return user._id === userId;
    });
    res.send(user);
}

function findUserByUsername(req, res) {
    var username = req.query["username"];
    console.log("Finding user with username " + username);
    var user = users.find(function (user) {
        return user.username === username;
    });
    if(typeof user === 'undefined') {
        res.sendStatus(404);
    }
    res.json(user);
}

function findUserByCredentials(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    console.log("Finding user with username " + username + " and password " + password);
    for(var u in users) {
        var user = users[u];
        if( user.username === username &&
            user.password === password) {
            res.json(user);
            return;
        }
    }
    res.sendStatus(404);
}