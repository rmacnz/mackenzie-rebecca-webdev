var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    //websites: [Website], //TODO: Add websites.
    dateCreated: Date
}, {collection: "user"});

module.exports = userSchema;