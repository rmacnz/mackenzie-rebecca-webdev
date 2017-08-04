var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var categorySchema = mongoose.Schema({
    _id: {type: Number, required: true},
    name: {type: String, required: true}
}, {collection: "category"});
