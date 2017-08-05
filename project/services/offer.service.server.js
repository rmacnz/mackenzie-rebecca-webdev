var app = require("../../express");
var offerModel = require("../model/offer/offer.model.server");

app.post("/api/offer", createOffer)
app.get("/api/offer", findOffersByItem);

function createOffer(req, res) {
    var offer = req.body;
    offerModel.createOffer(offer)
        .then(function (createdOffer) {
            res.json(createdOffer);
        })
}

function findOffersByItem(req, res) {
    var type = req.query["type"];
    var completed = req.query["completed"];
    var category = req.query["category"];
    var itemName = req.query["text"];
    if (completed) {
        offerModel.findOffersByItem(type, itemName)
            .then(function (offerData) {
                res.json(offerData);
            });
    } else {
        offerModel.findActiveOffersByItem(type, itemName)
            .then(function (offerData) {
                res.json(offerData);
            });
    }
}