var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var itemSchema = require("./item.schema.server");

var itemModel = mongoose.model("ItemModel", itemSchema);

itemModel.createItem = createItem;
itemModel.findAllItems = findAllItems;
itemModel.findItemsByBuyerId = findItemsByBuyerId;
itemModel.findItemsBySellerId = findItemsBySellerId;
itemModel.findItemById = findItemById;
itemModel.updateItem = updateItem;
itemModel.deleteItem = deleteItem;

module.exports = itemModel;

// create a new item
function createItem(item) {
    return itemModel.create(item);
}

// find all the items in the database
function findAllItems() {
    return itemModel.find();
}

// find all items for which this person is a buyer
function findItemsByBuyerId(buyerId) {
    return itemModel.find({type: "BUY", poster: buyerId});
}

// find all items for which this person is a seller
function findItemsBySellerId(sellerId) {
    return itemModel.find({type: "SELL", poster: sellerId});
}

// find the item with this unique ID#
function findItemById(itemId) {
    return itemModel.findById(itemId);
}

// update the item's end date or responders if necessary
function updateItem(itemId, newInfo) {
    if (newInfo.dateEnd && newInfo.responders) {
        return itemModel.update({_id: itemId}, {
            $set: {
                dateEnd: newInfo.dateEnd,
                responders: newInfo.responders
            }
        });
    } else if (newInfo.dateEnd) {
        return itemModel.update({_id: itemId}, {
            $set: {
                dateEnd: newInfo.dateEnd
            }
        });
    } else if (newInfo.responders) {
        return itemModel.update({_id: itemId}, {
            $set: {
                responders: newInfo.responders
            }
        });
    } else {
        return;
    }
}

// remove the item with this unique ID# from the database
function deleteItem(itemId) {
    return itemModel.remove({_id: itemId});
}