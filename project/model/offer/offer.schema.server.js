var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var offerSchema = mongoose.Schema({
    type: {type: String, enum:["BUY", "SELL"], required: true},
    date: {type: Date, required: true, default: Date.now},
    item: {type: mongoose.Schema.Types.ObjectId, ref:"ItemModel"},
    num: {type: Number, required: true, default: 1},
    pricePer: {type: Number, required: true},
    poster: {type: mongoose.Schema.Types.ObjectId, ref:"ProjectUserModel", required: true},
    responder: {type: mongoose.Schema.Types.ObjectId, ref:"ProjectUserModel"},
    completed: {type: Boolean, required: true, default: false}
}, {collection: "offer"});