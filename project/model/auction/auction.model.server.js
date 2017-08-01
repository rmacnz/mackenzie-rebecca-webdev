var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var auctionSchema = require("./auction.schema.server");

var auctionModel = mongoose.model("AuctionModel", auctionSchema);

auctionModel.createAuction = createAuction;
auctionModel.findAllAuctions = findAllAuctions;
auctionModel.findAuctionsByBuyerId = findAuctionsByBuyerId;
auctionModel.findAuctionsBySellerId = findAuctionsBySellerId;
auctionModel.findAuctionsByItemId = findAuctionsByItemId;
auctionModel.findAuctionById = findAuctionById;
auctionModel.updateAuction = updateAuction;
auctionModel.deleteAuction = deleteAuction;

module.exports = auctionModel;

// create a new auction
function createAuction(auction) {
    return auctionModel.create(auction);
}

// find all the auctions in the database
function findAllAuctions() {
    return auctionModel.find();
}

// find all auctions for which this person is a buyer
function findAuctionsByBuyerId(buyerId) {
    return auctionModel.find({type: "BUY", poster: buyerId});
}

// find all auctions for which this person is a seller
function findAuctionsBySellerId(sellerId) {
    return auctionModel.find({type: "SELL", poster: sellerId});
}

// find all auctions which involve the item with this ID#
function findAuctionsByItemId(itemId) {
    return auctionmodel.find({item: itemId});
}

// find the auction with this unique ID#
function findAuctionById(auctionId) {
    return auctionModel.findById(auctionId);
}

// update the auction's end date or responders if necessary
function updateAuction(auctionId, newInfo) {
    if (newInfo.dateEnd && newInfo.responders) {
        return auctionModel.update({_id: auctionId}, {
            $set: {
                dateEnd: newInfo.dateEnd,
                responders: newInfo.responders
            }
        });
    } else if (newInfo.dateEnd) {
        return auctionModel.update({_id: auctionId}, {
            $set: {
                dateEnd: newInfo.dateEnd
            }
        });
    } else if (newInfo.responders) {
        return auctionModel.update({_id: auctionId}, {
            $set: {
                responders: newInfo.responders
            }
        });
    } else {
        return;
    }
}

// remove the auction with this unique ID# from the database
function deleteAuction(auctionId) {
    return auctionModel.remove({_id: auctionId});
}