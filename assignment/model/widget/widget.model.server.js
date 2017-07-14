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
    }
}

function deleteWidget(widgetId) {
    return widgetModel.remove({_id: widgetId});
}

function reorderWidget(pageId, start, end) {
    if (start != end) {
        findAllWidgetsForPage(pageId)
            .then(function (results) {
                for (var index in results) {
                    var widget = results[index];
                    if (index === start) {
                        widgetModel.update({_id: widget._id}, {
                            $set: {
                                index: end
                            }
                        });
                    } else if (start < end && index > start && index <= end) {
                        widgetModel.update({_id: widget._id}, {
                            $set: {
                                index: index - 1
                            }
                        });
                    } else if (start > end && index >= end && index < start) {
                        widgetModel.update({_id: widget._id}, {
                            $set: {
                                index: index + 1
                            }
                        });
                    }
                }
                return;
            });
    } else {
        return;
    }
}