var app = require("../../express");
var itemModel = require("../model/item/item.model.server");

app.get("/api/item/:itemid", findItemById);
app.get("/rsapi/item/:itemid", findItemByIdAPI)
app.post("/api/item", createItem);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

var http = require('http');

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
    var numId = Number(item._id);
    item._id = numId;
    itemModel.createItem(item)
        .then(function(itemCreated) {
            res.json(itemCreated);
        }, function (error) {
            console.log(error);
        });
}

function findItemByIdAPI(req, res) {
    var itemId = req.params["itemid"];
    return http.get({
        host: "services.runescape.com",
        path: "/m=itemdb_rs/api/catalogue/detail.json?item=" + itemId
    }, function (response) {
        res.json(response);
    });
}