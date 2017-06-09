(function() {
    angular
        .module("WebAppMaker")
        .service("widgetService", widgetService);

    function widgetService() {
        this.createWidget = createWidget;
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        var widgets = [
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];

        function createWidget(pageId, widget){
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId;
            widgets.push(widget);
        }

        function findWidgetsByPageId(pageId) {
            var results = [];

            for (var v in widgets) {
                if (widgets[v].pageId === pageId) {
                    widgets[v].created = new Date();
                    widgets[v].accessed = new Date();
                    results.push(widgets[v]);
                }
            }

            return results;
        }

        function findWidgetById(widgetId) {
            return widgets.find(function (widget) {
                return widget._id === widgetId;
            });
        }

        function updateWidget(widgetId, widget) {
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
                }
            }
        }

        function deleteWidget(widgetId) {
            var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);
            widgets.splice(index, 1);
        }
    }
})();