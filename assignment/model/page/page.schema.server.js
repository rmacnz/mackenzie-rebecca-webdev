var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.ObjectId, ref: "WebsiteModel", required: true},
    name: {type: String, required: true},
    description: String,
    widgets: [
        {type: mongoose.Schema.Types.ObjectId, ref:"WidgetModel"}
    ],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "page"});

module.exports = pageSchema;