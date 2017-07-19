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

            model.urlPrev = "#!/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId + "/widget";

            model.clickOk = updateWidget;
            model.deleteWidget = deleteWidget;

            widgetService
                .findWidgetById(model.widgetId)
                .then(initializeWidget);
        }

        function initializeWidget(widget) {
            model.widget = widget;
            model.headerTitle = "Edit " + model.widget.type.toLowerCase() + " widget";
            model.widgetEditUrl = "views/widget/templates/widget-edit/widget-edit-" + model.widget.type.toLowerCase() + ".view.client.html";
        }

        function updateWidget() {
            var invalidMsg = validateWidgetParams();
            if (invalidMsg != "") {
                model.errormsg = invalidMsg;
            } else {
                widgetService
                    .updateWidget(model.widgetId, model.widget)
                    .then(updateSuccess);
            }
        }

        function updateSuccess(widget) {
            model.widget = widget;
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId + "/widget");
        }

        function deleteWidget() {
            widgetService
                .deleteWidget(model.widgetId)
                .then(deleteSuccess);
        }

        function deleteSuccess() {
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId + "/widget");
        }

        function validateWidgetParams() {
            switch(model.widget.type) {
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
                    if (width != null && (!width.endsWith("%") || parseInt(width.substring(0, width.length - 1)) === NaN)) {
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
                        return "Please enter a URL for the image, search for an image, or upload an image from your computer.";
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
                    if (model.widget.rows > 1 && (model.widget.text == null || model.widget.text === "")) {
                        return "Please enter some text for this widget.";
                    }
                    if (model.widget.rows === 1 && (model.widget.placeholder == null || model.widget.placeholder === "")) {
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