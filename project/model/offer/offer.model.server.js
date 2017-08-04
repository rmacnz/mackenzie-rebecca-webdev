var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var offerSchema = require("./offer.schema.server");

var offerModel = mongoose.model("OfferModel", offerSchema);

offerModel.createOffer = createOffer;
offerModel.findAllOffers = findAllOffers;
offerModel.findOffersByItem = findOffersByItem;
offerModel.deleteOffer = deleteOffer;

module.exports = offerModel;

// create a new offer
function createOffer(offer) {
    return offerModel.create(offer);
}

// find all the offers in the database
function findAllOffers() {
    return offerModel.find();
}

// find the offers with this type, and a similar item name
function findOffersByItem(type, itemName) {
    return offerModel.find({type: type, 'item.name':new RegExp('^'+itemName+'$', "i")});
}

// find the active offers with this type and a similar item name
function findActiveOffersByItem(type, itemName) {
    return offerModel.find({type: type, completed: false, 'item.name':new RegExp('^'+itemName+'$', "i")});
}

// remove the offer with this unique ID# from the database
function deleteOffer(offerId) {
    return offerModel.remove({_id: offerId});
}