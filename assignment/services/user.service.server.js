var app = require("../../express");
var userModel = require("../model/user/user.model.server");

var passport = require('passport');
var LocalAssignmentStrategy = require('passport-local').Strategy;
var GoogleAssignmentStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookAssignmentStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

var facebookConfig = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
}

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
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
    }));

app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
    }));

app.post("/api/logout", logout);
app.post("/api/register", register);

passport.use(new LocalAssignmentStrategy(localAssignmentStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use(new GoogleAssignmentStrategy(googleConfig, googleStrategy));
passport.use(new FacebookAssignmentStrategy(facebookConfig, facebookStrategy));

function createUser(req, res) {
    var user = req.body;
    user.roles = ["USER"];
    user.password = bcrypt.hashSync(user.password);
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

function localAssignmentStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if(user != null && user.username === username && (user.password === password ||
                    bcrypt.compareSync(password, user.password))) {
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

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var newFacebookUser = {
                        username: profile.username,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        facebook: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
                }
            }, function (err) {
                if (err) {
                    return done(err);
                }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}