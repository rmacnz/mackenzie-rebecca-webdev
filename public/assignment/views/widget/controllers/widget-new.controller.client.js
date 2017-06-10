(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, $location, widgetService) {
        var model = this;
        init();

        function init() {
            model.userId = $routeParams["uid"];
            model.webId = $routeParams["wid"];
            model.pageId = $routeParams["pid"];
            model.widgetType = $routeParams["wgtype"];

            model.widgetTypeList = ["Heading", "Image", "YouTube", "Html"];

            model.urlPrev = "#!/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId + "/widget/new";
            model.headerTitle = "New " + model.widgetType + " widget";

            model.getWidgetNewUrl = getWidgetNewUrl;
            model.getWidgetNewView = getWidgetNewView;
            model.clickOk = createWidget;
        }

        function getWidgetNewUrl(widgetType) {
            return "#!/user/" + model.userId + "/website/" + model.webId + "/page/"
            + model.pageId + "/widget/new/" + widgetType.toLowerCase();
        }

        function getWidgetNewView() {
            return "views/widget/templates/widget-edit/widget-edit-" + model.widgetType.toLowerCase() + ".view.client.html";
        }

        function createWidget() {
            if (model.widget != null) {
                var invalidMsg = validateWidgetParams();
                if (invalidMsg != "") {
                    model.errormsg = invalidMsg;
                } else {
                    model.widget.widgetType = model.widgetType.toUpperCase();
                    widgetService.createWidget(model.pageId, model.widget);
                    $location.url("/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId + "/widget");
                }
            } else {
                model.errormsg = "Please enter some attributes of your new widget."
            }
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