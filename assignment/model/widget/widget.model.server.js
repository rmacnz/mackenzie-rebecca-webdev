var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var widgetSchema = require("./widget.schema.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel.create(widget);
}

function findAllWidgetsForPage(pageId) {
    return widgetModel.find({_page: pageId})
        .populate("_page")
        .sort({index: "ascending"})
        .exec();
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    switch(widget.type) {
        case "HEADING":
            return widgetModel.update({_id: widgetId}, {
                $set: {
                    name: widget.name,
                    text: widget.text,
                    size: widget.size
                }
            });
        case "IMAGE":
            return widgetModel.update({_id: widgetId}, {
                $set: {
                    name: widget.name,
                    url: widget.url,
                    width: widget.width
                }
            });
        case "HTML":
            return widgetModel.update({_id: widgetId}, {
                $set: {
                    name: widget.name,
                    text: widget.text
                }
            });
        case "YOUTUBE":
            if (widget.name == null) {
                widget.name = "YOUTUBE WIDGET "+widget._id;
            }
            return widgetModel.update({_id: widgetId}, {
                $set: {
                    name: widget.name,
                    url: widget.url,
                    width: widget.width,
                    height: widget.height
                }
            });
        case "TEXT":
            return widgetModel.update({_id: widgetId}, {
                $set: {
                    text: widget.text,
                    placeholder: widget.placeholder,
                    rows: widget.rows,
                    formatted: widget.formatted
                }
            });
    }
}

function deleteWidget(widgetId) {
    return widgetModel.remove({_id: widgetId});
}

function reorderWidget(pageId, start, end) {
    return widgetModel
        .find({_page: pageId}, function (error, widgets) {
            widgets.forEach(function (widget) {
                if (widget.index == start) {
                    widget.index = end;
                    widget.save();
                }
                else if ( end > start){
                    if ( widget.index <= end && widget.index > start ){
                        widget.index = widget.index - 1;
                        widget.save();
                    }
                }
                else{ // end < start
                    if ( widget.index >= end && widget.index < start){
                        widget.index = widget.index + 1;
                        widget.save();
                    }
                }
            });
        }).sort({order: 1});
}