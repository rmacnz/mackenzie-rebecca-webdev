(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location, widgetService) {
        var model = this;
        init();

        function init() {
            model.userId = $routeParams["uid"];
            model.webId = $routeParams["wid"];
            model.pageId = $routeParams["pid"];
            model.widgetId = $routeParams["wgid"];
            model.widget = widgetService.findWidgetById(model.widgetId);

            model.urlPrev = "#!/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId + "/widget";
            model.headerTitle = "Edit " + model.widget.widgetType.toLowerCase() + " widget";

            model.getWidgetEditUrl = getWidgetEditUrl;
            model.clickOk = updateWidget;
            model.deleteWidget = deleteWidget;
        }

        function getWidgetEditUrl() {
            return "views/widget/templates/widget-edit/widget-edit-" + model.widget.widgetType.toLowerCase() + ".view.client.html";
        }

        function updateWidget() {
            var invalidMsg = validateWidgetParams();
            if (invalidMsg != "") {
                model.errormsg = invalidMsg;
            } else {
                model.widget = widgetService.updateWidget(model.widgetId, model.widget);
                $location.url("/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId + "/widget");
            }
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId + "/widget");
        }

        function validateWidgetParams() {
            switch(model.widget.widgetType) {
                case "HEADING":
                    if (model.widget.size > 7 || model.widget.size < 1 || model.widget.size % 1 != 0) {
                        return "Please enter an integer between 1 and 6 for the heading size.";
                    } else if (model.widget.text === "") {
                        return "Please enter some text for the heading.";
                    } else {
                        return "";
                    }
                case "IMAGE":
                    var width = model.widget.width;
                    if (!width.endsWith("%") || parseInt(width.substring(0, width.length - 1)) === NaN) {
                        return "Please enter a percentage between 0% and 100% for the image width (you must use the % sign).";
                    } else if (model.widget.url === "") {
                        return "Please enter a URL for the image (we do not currently support file upload).";
                    } else {
                        return "";
                    }
                case "YOUTUBE":
                    var width = model.widget.width;
                    if (!width.endsWith("%") || parseInt(width.substring(0, width.length - 1)) === NaN) {
                        return "Please enter a percentage between 0% and 100% for the image width.";
                    } else if (model.widget.url === "") {
                        return "Please enter a URL for the YouTube video.";
                    } else {
                        return "";
                    }
                case "HTML":
                    if (model.widget.text === "") {
                        return "Please enter some HTML in the textbox.";
                    }
                default:
                    return "";
            }
        }
    }

})();