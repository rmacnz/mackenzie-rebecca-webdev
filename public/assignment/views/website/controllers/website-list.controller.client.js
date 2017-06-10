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

            model.urlPrev = "#!/user/" + model.userId;
            model.urlNew = "#!/user/" + model.userId + "/website/new";
            model.headerTitle = "Websites";
        }


    }


})();