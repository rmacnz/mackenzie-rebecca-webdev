(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, websiteService) {
        var model = this;
        init();

        function init() {
            model.userId = $routeParams["uid"];
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }


    }


})();