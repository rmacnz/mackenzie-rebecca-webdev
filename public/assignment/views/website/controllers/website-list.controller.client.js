(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, websiteService) {
        var model = this;
        init();

        function init() {
            model.userId = $routeParams["uid"];
            model.urlPrev = "#!/user/" + model.userId;
            model.urlNew = "#!/user/" + model.userId + "/website/new";
            model.headerTitle = "Websites";

            //model.websites = websiteService.findAllWebsitesForUser(model.userId);
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(initializeWebsiteList);
        }

        function initializeWebsiteList(websites) {
            model.websites = websites;
        }


    }


})();