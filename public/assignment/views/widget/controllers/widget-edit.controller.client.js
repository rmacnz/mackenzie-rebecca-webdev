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

            model.getWidgetEditUrl = getWidgetEditUrl;
            model.updateWidget = updateWidget;
            model.deleteWidget = deleteWidget;
        }

        function getWidgetEditUrl() {
            return "views/widget/templates/widget-edit/widget-edit-" + model.widget.widgetType.toLowerCase() + ".view.client.html";
        }

        function updateWidget() {
            model.widget = widgetService.updateWidget(model.widgetId, model.widget);
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId + "/widget");
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId + "/widget");
        }
    }

})();