var app = require("../../express");

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

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum h4"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum paragraph 1</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum h4"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum paragraph 2</p>"}
];

// create a new widget
function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params["pageId"];
    widget._id = (new Date()).getTime() + "";
    widget.pageId = pageId;
    widgets.push(widget);
    res.json(widget);
}

// find all the widgets for the page with this ID
function findAllWidgetsForPage(req, res) {
    var pageId = req.params["pageId"];
    var results = [];

    for (var v in widgets) {
        if (widgets[v].pageId === pageId) {
            widgets[v].accessed = new Date();
            results.push(widgets[v]);
        }
    }

    res.json(results);
}

// find the widget with this ID
function findWidgetById(req, res) {
    var widgetId = req.params["widgetId"];
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    res.json(widget);
}

// update the widget with the given ID
function updateWidget(req, res) {
    var widgetId = req.params["widgetId"];
    var widget = req.body;
    for (var v in widgets) {
        if (widgets[v]._id === widgetId) {
            if (widgets[v].widgetType === "HEADING") {
                widgets[v].size = widget.size;
                widgets[v].text = widget.text;
            } else if (widgets[v].widgetType === "IMAGE") {
                widgets[v].width = widget.width;
                widgets[v].url = widget.url;
            } else if (widgets[v].widgetType === "HTML") {
                widgets[v].text = widget.text;
            } else if (widgets[v].widgetType === "YOUTUBE") {
                widgets[v].width = widget.width;
                widgets[v].url = widget.url;
            } else {
                console.log("Found a widget of unknown type: " + widgets[v].widgetType);
            }
            res.json(widget);
            return;
        }
    }
    res.sendStatus(404);
}

// delete the widget with the given ID
function deleteWidget(req, res) {
    var widgetId = req.params["widgetId"];
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    var index = widgets.indexOf(widget);
    widgets.splice(index, 1);
    res.json(widget);
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
    widget.url = "/public/assignment/uploads/" +filename;

    var callbackUrl   = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

    if (widget._id == null) {
        callbackUrl   = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/new/image";
    }

    res.redirect(callbackUrl);
}

