var app = require("../../express");
var itemModel = require("../model/item/item.model.server");

app.get("/api/item/:itemid", findItemById);
app.post("/api/item", createItem);

function findItemById(req, res) {
    var itemId = req.params["itemid"];
    itemModel.findItemById(itemId)
        .then(function (itemFound) {
            res.json(itemFound);
        }, function (error) {
            res.sendStatus(404);
        });
}

function createItem(req, res) {
    var item = req.body;
    itemModel.createItem(item)
        .then(function(itemCreated) {
            res.json(itemCreated);
        });
}