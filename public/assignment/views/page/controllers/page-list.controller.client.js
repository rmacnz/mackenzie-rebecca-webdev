(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, pageService) {
        var model = this;
        init();

        function init() {
            model.userId = $routeParams["uid"];
            model.webId = $routeParams["wid"];
            model.pageList = pageService.findPageByWebsiteId(model.webId);

            model.urlPrev = "#!/user/" + model.userId + "/website";
            model.urlNew = "#!/user/" + model.userId + "/website/" + model.webId + "/page/new";
            model.headerTitle = "Pages";
        }
    }

})();
