var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.ObjectId, ref: "PageModel", required: true},
    type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT', 'TEXT'], required: true},
    index: {type: Number, required: true},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "page"});

module.exports = widgetSchema;