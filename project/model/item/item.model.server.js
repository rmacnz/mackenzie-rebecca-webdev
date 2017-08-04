var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var itemSchema = require("./item.schema.server");

var itemModel = mongoose.model("ItemModel", itemSchema);

itemModel.createItem = createItem;
itemModel.findAllItems = findAllItems;
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

// remove the item with this unique ID# from the database
function deleteItem(itemId) {
    return itemModel.remove({_id: itemId});
}