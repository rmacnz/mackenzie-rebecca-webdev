var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var auctionSchema = mongoose.Schema({
    type: {type: String, enum:["BUY", "SELL"], required: true},
    dateStart: {type: Date, required: true, default: Date.now},
    dateEnd: {type: Date},
    item: {type: mongoose.Schema.Types.ObjectId, ref:"ItemModel"},
    num: {type: Number, required: true, default: 1},
    pricePer: {type: Number, required: true},
    poster: {type: mongoose.Schema.Types.ObjectId, ref:"ProjectUserModel", required: true},
    responders: [{type: mongoose.Schema.Types.ObjectId, ref:"PurchaseModel"}],
    completed: {type: Boolean, required: true, default: false}
}, {collection: "auction"});