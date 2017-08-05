var app = require("../../express");
var offerModel = require("../model/offer/offer.model.server");

app.post("/api/offer", createOffer)
app.get("/api/offer/:offerId", findOfferById);
app.get("/api/offer", findOffersByItem);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

function createOffer(req, res) {
    var offer = req.body;
    offerModel.createOffer(offer)
        .then(function (createdOffer) {
            res.json(createdOffer);
        })
}

function findOfferById(req, res) {
    var offerId = req.params["offerId"];
    offerModel.findOfferById(offerId)
        .then(function (offerFound) {
            res.json(offerFound);
        }, function (error) {
            res.sendStatus(404);
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