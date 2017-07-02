var app = require("../../express");

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
    page._id = (new Date()).getTime() + "";
    page.websiteId = websiteId;
    pages.push(page);
    res.json(page);
}

// find all the pages for the website with the given ID
function findAllPagesForWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    var results = [];

    for (var v in pages) {
        if (pages[v].websiteId === websiteId) {
            pages[v].created = new Date();
            pages[v].accessed = new Date();
            results.push(pages[v]);
        }
    }

    res.json(results);
}

// find the page with the given ID
function findPageById(req, res) {
    var pageId = req.params["pageId"];
    var page = pages.find(function (page) {
        return page._id === pageId;
    });
    res.json(page);
}

// update the given page
function updatePage(req, res) {
    var pageId = req.params["pageId"];
    var page = req.body;
    for (var v in pages) {
        if (pages[v]._id === pageId) {
            pages[v].name = page.name;
            pages[v].description = page.description;
            res.json(page);
            return;
        }
    }
    res.sendStatus(404);
}

// delete the page with this ID
function deletePage(req, res) {
    var pageId = req.params["pageId"];
    var page = pages.find(function (page) {
        return page._id === pageId;
    });
    var index = pages.indexOf(page);
    pages.splice(index, 1);
    res.sendStatus(200);
}