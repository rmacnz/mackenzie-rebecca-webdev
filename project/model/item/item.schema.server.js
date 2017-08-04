var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var itemSchema = mongoose.Schema({
    _id: {type: Number, required: true},
    name: {type: String, required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref:"CategoryModel", required: true}
}, {collection: "item"});