var app = require("../../express");
var websiteModel = require("../model/website/website.model.server");

app.post("/api/user/:userId/website", createWebsite);
app.get("/api/user/:userId/website", findAllWebsitesForUser);
app.get("/api/website/:websiteId", findWebsiteById);
app.put("/api/website/:websiteId", updateWebsite);
app.delete("/api/website/:websiteId", deleteWebsite);

// create a new website
function createWebsite(req, res) {
    var userId = req.params["userId"];
    var website = req.body;
    websiteModel.createWebsiteForUser(userId, website)
        .then(function(websiteCreated) {
            res.json(websiteCreated);
        });
}

// find all the websites for the user with this ID
function findAllWebsitesForUser(req, res) {
    var userId = req.params["userId"];
    websiteModel.findAllWebsitesForUser(userId)
        .then(function(results) {
            res.json(results);
        });
}

// find the website with this ID
function findWebsiteById(req, res) {
    var websiteId = req.params["websiteId"];
    websiteModel.findWebsiteById(websiteId)
        .then(function(website) {
            res.json(website);
        });
}

// update the given website
function updateWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    var website = req.body;
    websiteModel.updateWebsite(websiteId, website)
        .then(function(status) {
            res.sendStatus(200);
        })
}

// delete the website with this ID
function deleteWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    websiteModel.deleteWebsite(websiteId)
        .then(function(status) {
            res.sendStatus(200);
        });
}