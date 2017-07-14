var app = require("../../express");
var pageModel = require("../model/page/page.model.server");
app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

// create a new page
function createPage(req, res) {
    var websiteId = req.params["websiteId"];
    var page = req.body;
    pageModel.createPage(websiteId, page)
        .then(function(createdPage) {
            res.json(createdPage);
        });
}

// find all the pages for the website with the given ID
function findAllPagesForWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    pageModel.findAllPagesForWebsite(websiteId)
        .then(function (results) {
            res.json(results);
        });
}

// find the page with the given ID
function findPageById(req, res) {
    var pageId = req.params["pageId"];
    pageModel.findPageById(pageId)
        .then(function (page) {
            res.json(page);
        });
}

// update the given page
function updatePage(req, res) {
    var pageId = req.params["pageId"];
    var page = req.body;
    pageModel.updatePage(pageId, page)
        .then(function(status) {
            res.sendStatus(200);
        });
}

// delete the page with this ID
function deletePage(req, res) {
    var pageId = req.params["pageId"];
    pageModel.deletePage(pageId)
        .then(function(status) {
            res.sendStatus(200);
        });
}