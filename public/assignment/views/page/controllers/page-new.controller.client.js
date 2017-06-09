(function() {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, pageService) {
        var model = this;
        model.createPage = createPage;
        init();

        function init() {
            model.userId = $routeParams["uid"];
            model.webId = $routeParams["wid"];
        }

        function createPage() {
            console.log("create page");
            console.log(model.page.name);
            console.log(model.page.description);
            model.page = pageService.createPage(model.webId, model.page);
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page");
        }
    }

})();