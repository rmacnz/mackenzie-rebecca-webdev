var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var purchaseSchema = mongoose.Schema({
    date: {type: Date, required: true, default: Date.now},
    item: {type: mongoose.Schema.Types.ObjectId, ref:"ItemModel"},
    num: {type: Number, required: true, default: 1},
    pricePer: {type: Number, required: true},
    buyer: {type: mongoose.Schema.Types.ObjectId, ref:"ProjectUserModel", required: true},
    seller: {type: mongoose.Schema.Types.ObjectId, ref:"ProjectUserModel", required: true}
}, {collection: "purchase"});