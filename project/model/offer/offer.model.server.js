var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var offerSchema = require("./offer.schema.server");

var offerModel = mongoose.model("OfferModel", offerSchema);

offerModel.createOffer = createOffer;
offerModel.findAllOffers = findAllOffers;
offerModel.findOfferById = findOfferById;
offerModel.findOffersByItem = findOffersByItem;
offerModel.findActiveOffersByItem = findActiveOffersByItem;
offerModel.updateOffer = updateOffer;
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

// find the offer with this ID#
function findOfferById(offerId) {
    return offerModel.findById(offerId)
        .populate("item")
        .exec();
}

// find the offers with this type, and a similar item name
function findOffersByItem(type, itemId) {
    return offerModel.find({type: type, item:itemId})
        .populate("item")
        .exec();
}

// find the active offers with this type and a similar item name
function findActiveOffersByItem(type, itemId) {
    return offerModel.find({type: type, completed: false, item:itemId})
        .populate("item")
        .exec();
}

// update the offer with this unique ID# to have the updated data
function updateOffer(offerId, offerData) {
    return offerModel.update({_id: offerId}, {
        $set: {
            responder: offerData.responder,
            completed: offerData.completed
        }
    });
}

// remove the offer with this unique ID# from the database
function deleteOffer(offerId) {
    return offerModel.remove({_id: offerId});
}