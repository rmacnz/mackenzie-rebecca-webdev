var app = require("../../express");
var offerModel = require("../model/offer/offer.model.server");

app.post("/api/offer", createOffer)
app.get("/api/offer/:offerId", findOfferById);
app.get("/api/offer", findOffersByItem);
app.put("/api/offer/:offerId", updateOffer);

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
        }, function (error) {
            console.log(error);
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
    var itemId = Number(req.query["item"]);
    if (completed != "false") {
        offerModel.findOffersByItem(type, itemId)
            .then(function (offerData) {
                res.json(offerData);
            });
    } else {
        offerModel.findActiveOffersByItem(type, itemId)
            .then(function (offerData) {
                res.json(offerData);
            });
    }
}

function updateOffer(req, res) {
    var offerId = req.params["offerId"];
    var offer = req.body;
    offerModel.updateOffer(offerId, offer)
        .then(function(status) {
            res.sendStatus(status);
        }, function (error) {
            console.log(error);
        });
}