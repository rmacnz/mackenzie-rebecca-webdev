var app = require("../../express");
var widgetModel = require("../model/widget/widget.model.server");

var multer = require('multer');
var upload = multer({ dest: __dirname + "/../../public/assignment/uploads"});

// standard CRUD operations + finding
app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);

// upload images
app.post ("/api/upload", upload.single("myFile"), uploadImage);

// sort widgets
app.put("/api/page/:pageId/widget", sortWidgets);

// create a new widget
function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params["pageId"];
    widgetModel.findAllWidgetsForPage(pageId)
        .then(function (results) {
            widget.index = results.length;
            widgetModel.createWidget(pageId, widget)
                .then(function(createdWidget) {
                    res.json(createdWidget);
                });
        });
}

// find all the widgets for the page with this ID
function findAllWidgetsForPage(req, res) {
    var pageId = req.params["pageId"];
    widgetModel.findAllWidgetsForPage(pageId)
        .then(function (results) {
            res.json(results);
        });
}

// find the widget with this ID
function findWidgetById(req, res) {
    var widgetId = req.params["widgetId"];
    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        });
}

// update the widget with the given ID
function updateWidget(req, res) {
    var widgetId = req.params["widgetId"];
    var widget = req.body;
    widgetModel.updateWidget(widgetId, widget)
        .then(function (status) {
            res.sendStatus(200);
        });
}

// delete the widget with the given ID
function deleteWidget(req, res) {
    var widgetId = req.params["widgetId"];
    widgetModel.deleteWidget(widgetId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.webId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    if (widget == null) {
        widget = {};
    }
    widget.url = "/assignment/uploads/" +filename;

    var callbackUrl   = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

    if (widget._id == null) {
        callbackUrl   = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/new/image"
        + "?url=" + widget.url;
    }

    res.redirect(callbackUrl);
}

function sortWidgets(req, res) {
    var pageId = req.params["pageId"];
    var initialIndex = req.query["initial"];
    var finalIndex = req.query["final"];
    widgetModel.reorderWidget(pageId, initialIndex, finalIndex)
        .then(function() {
            res.sendStatus(200);
        })
}

