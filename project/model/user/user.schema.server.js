var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var projectUserSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    email: String,
    gold: {type: Number, require: true, default: 1000},
    roles: [{type: String, enum: ["ADMIN", "USER", "MEMBER"], default: "USER"}],
    dateCreated: {type: Date, default: Date.now},
    buys: [
        {type: mongoose.Schema.Types.ObjectId, ref:"OfferModel"}
    ],
    sells: [
        {type: mongoose.Schema.Types.ObjectId, ref:"OfferModel"}
    ],
    items: [
        {num: Number, item: {type: mongoose.Schema.Types.ObjectId, ref: "ItemModel"}}
    ],
    memberInfo: {
        totalSkill: Number,
        totalXP: Number,
        combat: Number,
        skills: [{
            id: Number,
            level: Number
        }]
    }
}, {collection: "projectuser"});

module.exports = projectUserSchema;