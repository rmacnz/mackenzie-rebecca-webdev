var app = require("../../express");
var userModel = require("../model/user/user.model.server");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

app.post("/api/user", createUser);
app.get("/api/user", authenticateFindAllUsers, findAllUsers);
app.get("/api/user/:userId", findUserById);
app.get("/api/username", findUserByUsername);
app.get("/api/user/credentials", findUserByCredentials);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", isAdmin, deleteUser);
app.delete("/api/user", unregister);

app.post("/api/login", passport.authenticate("local"), login);
app.get("/api/checkLoggedIn", checkLoggedIn);
app.get("/api/checkAdmin", checkAdminLoggedIn);
app.get("/auth/google", passport.authenticate("google", { scope : ["profile", "email"] }));
app.get("/auth/google/callback",
    passport.authenticate('google', {
        successRedirect: '/#/profile',
        failureRedirect: '/#/login'
    }));

app.post("/api/logout", logout);
app.post("/api/register", register);

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonder.com"},
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@marley.com"},
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "cherrygarcia@gmail.com"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@ccs.neu.edu"}
];

function createUser(req, res) {
    var user = req.body;
    user.roles = ["USER"];
    userModel.createUser(user)
        .then(function(userCreated) {
            res.json(userCreated);
        });
}

function findAllUsers(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    if (username && password) {
        return findUserByCredentials(req, res);
    } else {
        userModel.findAllUsers()
            .then(function (userList) {
                res.json(userList);
            });
    }
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

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if(user.username === username && user.password === password) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function checkLoggedIn(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send("0");
    }
}

function checkAdminLoggedIn(req, res) {
    if (req.isAuthenticated() && req.user.roles.indexOf("ADMIN") > -1) {
        res.json(req.user);
    } else {
        res.send("0");
    }
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function register(req, res) {
    var user = req.body;
    user.roles = ["USER"];
    userModel.createUser(user)
        .then(function(userCreated) {
            req.login(userCreated, function (status) {
                res.json(userCreated);
            });
        });
}

function authenticateFindAllUsers(req, res, next) {
    var username = req.query["username"];
    var password = req.query["password"];
    if (req.isAuthenticated() && req.user.roles.indexOf("ADMIN") > -1) {
        next();
    } else if (username && password) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.roles.indexOf("ADMIN") > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function unregister(req, res) {
    var user = req.user;
    userModel.deleteUser(user._id)
        .then(function(status) {
            res.sendStatus(200);
        });
}