var app = require("../../express");
var q = require('q');
var http = require('http');
var itemModel = require("../model/item/item.model.server");

app.get("/api/item/:itemid", findItemById);
app.post("/api/item", createItem);

app.get("/api/rs/item/:itemid", findItemByIdAPI);
app.get("/api/rs/item/:category/:searchTerm", findItemByNameAPI);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

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
    runescapeFindItemById(itemId)
        .then(function (response) {
            res.json(response);
            },
        function (error) {
            console.log(error);
        });
}

function runescapeFindItemById(itemId) {
    var deferred = q.defer();
    http.get({
        host: "services.runescape.com",
        path: "/m=itemdb_rs/api/catalogue/detail.json?item=" + itemId
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch(e) {
                deferred.reject({error: e});
            }
        });
    });
    return deferred.promise;
}

function findItemByNameAPI(req, res) {
    var category = req.params["category"];
    var searchTerm = req.params["searchTerm"];
    runescapeFindItemByName(category, searchTerm)
        .then(function (response) {
                res.json(response);
            },
            function (error) {
                console.log(error);
            });
}

function runescapeFindItemByName(category, searchTerm) {
    var deferred = q.defer();
    http.get({
        host: "services.runescape.com",
        path: "/m=itemdb_rs/api/catalogue/items.json?category=" + category + "&alpha=" + searchTerm
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch(e) {
                deferred.reject({error: e});
            }
        });
    });
    return deferred.promise;
}