var app = require("../../express");
var auctionModel = require("../model/offer/offer.model.server");

app.get("/api/auction", findAuctionsByItem);

function findAuctionsByItem(req, res) {
    var type = req.query["type"];
    var completed = req.query["completed"];
    var category = req.query["category"];
    var itemName = req.query["text"];
    if (completed) {
        auctionModel.findAuctionsByItem(type, itemName)
            .then(function (auctionData) {
                res.json(auctionData);
            });
    } else {
        auctionModel.findActiveAuctionsByItem(type, itemName)
            .then(function (auctionData) {
                res.json(auctionData);
            });
    }
}