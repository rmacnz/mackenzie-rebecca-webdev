var app = require("../../express");

app.post("/api/user/:userId/website", createWebsite);
app.get("/api/user/:userId/website", findAllWebsitesForUser);
app.get("/api/website/:websiteId", findWebsiteById);
app.put("/api/website/:websiteId", updateWebsite);
app.delete("/api/website/:websiteId", deleteWebsite);

var websites = [
    {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
    {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
    {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
    {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
    {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
    {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
];

// create a new website
function createWebsite(req, res) {
    var userId = req.params["userId"];
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    website.developerId = userId;
    websites.push(website);
    res.json(website);
}

// find all the websites for the user with this ID
function findAllWebsitesForUser(req, res) {
    var userId = req.params["userId"];
    var results = [];

    for (var v in websites) {
        if (websites[v].developerId === userId) {
            websites[v].created = new Date();
            websites[v].accessed = new Date();
            results.push(websites[v]);
        }
    }

    res.json(results);
}

// find the website with this ID
function findWebsiteById(req, res) {
    var websiteId = req.params["websiteId"];
    var website = websites.find(function (website) {
        return website._id === websiteId;
    });
    res.json(website);
}

// update the given website
function updateWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    var website = req.body;
    for (var v in websites) {
        if (websites[v]._id === websiteId) {
            websites[v].name = website.name;
            websites[v].description = website.description;
            res.json(website);
            return;
        }
    }
    res.sendStatus(404);
}

// delete the website with this ID
function deleteWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    var website = websites.find(function (website) {
        return website._id === websiteId;
    });
    var index = websites.indexOf(website);
    websites.splice(index, 1);
    res.sendStatus(200);
}