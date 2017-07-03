(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, $sce, widgetService) {
        var model = this;
        init();


        function init() {
            model.userId = $routeParams["uid"];
            model.webId = $routeParams["wid"];
            model.pageId = $routeParams["pid"];

            model.urlPrev = "#!/user/" + model.userId + "/website/" + model.webId + "/page";
            model.urlNew = "#!/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId + "/widget/new";
            model.headerTitle = "Widgets";

            model.trustHtml = trustHtml;
            model.getEmbeddedYouTubeUrl = getEmbeddedYouTubeUrl;
            model.getWidgetViewUrl = getWidgetViewUrl;

            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(initializeWidgetList);
        }

        function initializeWidgetList(widgetList) {
            model.widgetList = widgetList;
        }

        function trustHtml(html) {
            // scrub any unsafe content
            return $sce.trustAsHtml(html);
        }

        function getEmbeddedYouTubeUrl(url) {
            // sample URL: https://youtu.be/AM2Ivdi9c4E
            var splitUrl = url.split("/");
            var videoId = splitUrl[splitUrl.length - 1];
            var embeddedUrl = "https://www.youtube.com/embed/" + videoId;
            console.log(embeddedUrl);
            return $sce.trustAsResourceUrl(embeddedUrl);
        }

        function getWidgetViewUrl(widgetType) {
            return "views/widget/templates/widget-list/widget-" + widgetType.toLowerCase() + ".view.client.html";
        }
    }

})();