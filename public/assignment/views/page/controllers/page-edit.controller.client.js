(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($location, $routeParams, pageService) {
        var model = this;
        model.updatePage = updatePage;
        model.deletePage = deletePage;
        init();

        function init() {
            model.userId = $routeParams["uid"];
            model.webId = $routeParams["wid"];
            model.pageId = $routeParams["pid"];
            model.page = pageService.findPageById(model.pageId);
        }

        function updatePage() {
            pageService.updatePage(model.pageId, model.page);
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page");
        }

        function deletePage() {
            pageService.deletePage(model.pageId);
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page");
        }
    }

})();