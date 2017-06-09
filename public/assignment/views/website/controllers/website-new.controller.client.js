(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, websiteService) {
        var model = this;
        model.createSite = createSite;

        init();

        function init() {
            model.userId = $routeParams["uid"];
            model.websiteList = websiteService.findWebsitesByUser(model.userId);
        }

        function createSite() {
            website = websiteService.createWebsite(model.userId, model.website);
            model.websiteList = websiteService.findWebsitesByUser(model.userId);
            $location.url("/user/" + model.userId + "/website")
        }
    }

})();