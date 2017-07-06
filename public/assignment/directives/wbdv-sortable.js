(function(){
    angular
        .module("WebAppMaker")
        .directive("wbdvSortable", wbdvSortable);

    function wbdvSortable($routeParams, widgetService) {
        return {
            link: linkFunction
        }

        function linkFunction(scope, element) {
            var pageId = $routeParams["pid"];
            $(element).
            sortable({
                stop: function (event, ui) {
                    widgetService
                        .sortWidgets(pageId, ui.item.initialIndex, ui.item.index());
                },
                start: function (event, ui) {
                    ui.item.initialIndex = ui.item.index();
                }
            });
        }
    }
})();