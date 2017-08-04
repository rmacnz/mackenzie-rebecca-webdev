var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var itemSchema = require("./item.schema.server");

var itemModel = mongoose.model("ItemModel", itemSchema);

itemModel.createItem = createItem;
itemModel.findAllItems = findAllItems;
itemModel.findItemById = findItemById;
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

// find the item with this ID#
function findItemById(itemId) {
    return itemModel.findOne({_id: itemId});
}

// remove the item with this unique ID# from the database
function deleteItem(itemId) {
    return itemModel.remove({_id: itemId});
}