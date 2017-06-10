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
                model.widget.widgetType = model.widgetType.toUpperCase();
                widgetService.createWidget(model.pageId, model.widget);
                $location.url("/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId + "/widget");
            } else {
                model.errormsg = "Please enter some attributes of your new widget."
            }
        }
    }

})();