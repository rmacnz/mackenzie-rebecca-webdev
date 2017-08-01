(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, $location, widgetService) {
        var model = this;
        init();

        function init() {
            initializeWidget();

            model.userId = $routeParams["uid"];
            model.webId = $routeParams["wid"];
            model.pageId = $routeParams["pid"];
            model.widgetType = $routeParams["wgtype"];
            model.widgetId = "newimage";

            model.widgetTypeList = ["Heading", "Image", "YouTube", "Html", "Text"];

            model.urlPrev = "#!/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId + "/widget/new";
            model.headerTitle = "New " + model.widgetType + " widget";

            model.getWidgetNewUrl = getWidgetNewUrl;
            model.getWidgetNewView = getWidgetNewView;
            model.clickOk = createWidget;
        }

        function initializeWidget() {
            model.widget = {};
            var imageName = $routeParams["name"];
            if (imageName != null && imageName != "") {
                model.widget.name = imageName;
            }
            var imageText = $routeParams["text"];
            if (imageText != null && imageText != "") {
                model.widget.text = imageText;
            }
            var imageWidth = $routeParams["width"];
            if (imageWidth != null && imageWidth != "") {
                model.widget.width = imageWidth;
            }
            var imageUrl = $routeParams["url"];
            if (imageUrl != null && imageUrl != "") {
                model.widget.url = imageUrl;
            }
        }

        function getWidgetNewUrl(widgetType) {
            return "#!/user/" + model.userId + "/website/" + model.webId + "/page/"
            + model.pageId + "/widget/new/" + widgetType.toLowerCase();
        }

        function getWidgetNewView() {
            return "views/widget/templates/widget-edit/widget-edit-" + model.widgetType.toLowerCase() + ".view.client.html";
        }

        function createWidget() {
            if (model.widget != null && model.widget.name != null && model.widget.name != "") {
                var invalidMsg = validateWidgetParams();
                if (invalidMsg != "") {
                    console.log(invalidMsg);
                    model.errormsg = invalidMsg;
                } else {
                    model.widget.type = model.widgetType.toUpperCase();
                    widgetService
                        .createWidget(model.pageId, model.widget)
                        .then(createSuccess);
                }
            } else {
                model.errormsg = "Please enter a name for your widget."
            }
        }

        function createSuccess(widget) {
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId + "/widget");
        }

        function validateWidgetParams() {
            switch(model.widget.type) {
                case "HEADING":
                    if (model.widget.size != null && model.widget.size > 6 || model.widget.size < 1 || model.widget.size % 1 != 0) {
                        return "Please enter an integer between 1 and 6 for the heading size.";
                    } else if (model.widget.text == null || model.widget.text === "") {
                        return "Please enter some text for the heading.";
                    } else {
                        return "";
                    }
                case "IMAGE":
                    var width = model.widget.width;
                    if (width != null && (!width.endsWith("%") || parseInt(width.substring(0, width.length - 1)) === NaN)) {
                        return "Please enter a percentage between 0% and 100% for the image width (you must use the % sign).";
                    } else if (model.widget.url === "") {
                        return "Please enter a URL for the image, search for an image, or upload an image from your computer.";
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
                case "TEXT":
                    if (model.widget.rows == null) {
                        model.widget.rows = 1;
                    }
                    if (model.widget.rows > 1 && model.widget.text === "") {
                        return "Please enter some text for this widget.";
                    }
                    if (model.widget.rows === 1 && model.widget.placeholder === "") {
                        return "Please enter some placeholder text for this widget.";
                    }
                    if (model.widget.formatted == null) {
                        model.widget.formatted = false;
                    }
                    return "";
                default:
                    return "";
            }
        }

    }

})();