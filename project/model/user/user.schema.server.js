var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    email: String,
    runescapeName: String,
    roles: [{type: String, enum: ["ADMIN", "USER", "MEMBER"], default: "USER"}],
    dateCreated: {type: Date, default: Date.now},
    buys: [
        {type: mongoose.Schema.Types.ObjectId, ref:"AuctionModel"}
    ],
    sells: [
        {type: mongoose.Schema.Types.ObjectId, ref:"AuctionModel"}
    ]
}, {collection: "user"});

module.exports = userSchema;