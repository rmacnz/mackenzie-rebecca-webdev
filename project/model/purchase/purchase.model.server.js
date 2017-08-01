var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var purchaseSchema = require("./purchase.schema.server");

var purchaseModel = mongoose.model("PurchaseModel", purchaseSchema);

purchaseModel.createPurchase = createPurchase;
purchaseModel.findAllPurchases = findAllPurchases;
purchaseModel.findPurchasesByBuyerId = findPurchasesByBuyerId;
purchaseModel.findPurchasesBySellerId = findPurchasesBySellerId;
purchaseModel.findPurchasesByItemId = findPurchasesByItemId;
purchaseModel.findPurchaseById = findPurchaseById;
purchaseModel.updatePurchase = updatePurchase;
purchaseModel.deletePurchase = deletePurchase;

module.exports = purchaseModel;

// create a new purchase
function createPurchase(purchase) {
    return purchaseModel.create(purchase);
}

// find all the purchases in the database
function findAllPurchases() {
    return purchaseModel.find();
}

// find all purchases for which this person is a buyer
function findPurchasesByBuyerId(buyerId) {
    return purchaseModel.find({buyer: buyerId});
}

// find all purchases for which this person is a seller
function findPurchasesBySellerId(sellerId) {
    return purchaseModel.find({seller: sellerId});
}

// find all purchases which involve the item with this ID#
function findPurchasesByItemId(itemId) {
    return purchaseModel.find({item: itemId});
}

// find the purchase with this unique ID#
function findPurchaseById(purchaseId) {
    return purchaseModel.findById(purchaseId);
}

// update the purchase information (ADMIN ONLY)
function updatePurchase(purchaseId, newInfo) {
    return purchaseModel.update({_id: purchaseId}, {
        $set: {
            date: newInfo.date,
            item: newInfo.item,
            num: newInfo.num,
            pricePer: newInfo.pricePer,
            seller: newInfo.seller,
            buyer: newInfo.buyer
        }
    });
}

// remove the purchase with this unique ID# from the database
function deletePurchase(purchaseId) {
    return purchaseModel.remove({_id: purchaseId});
}