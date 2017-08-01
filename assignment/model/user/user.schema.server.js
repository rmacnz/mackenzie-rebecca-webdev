var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    google: {
        id: String,
        token: String
    },
    facebook: {
        id: String,
        token: String
    },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    roles: [{type: String, enum: ["ADMIN", "USER"], default: "USER"}],
    websites: [
        {type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"}
    ],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;