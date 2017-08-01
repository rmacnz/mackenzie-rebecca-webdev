var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var itemSchema = mongoose.Schema({
    rsId: {type: Number, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    iconUrl: {type: String, required: true}
}, {collection: "item"});